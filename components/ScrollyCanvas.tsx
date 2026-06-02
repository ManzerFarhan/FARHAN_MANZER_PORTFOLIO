"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 135;

const currentFrame = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/frame_${paddedIndex}_delay-0.066s.png`;
};

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const frameIndex = useSpring(rawFrameIndex, {
    stiffness: 300,
    damping: 50,
    mass: 1
  });

  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  useEffect(() => {
    if (hasAutoPlayed) return;

    const handleScroll = () => {
      if (window.scrollY > 10 && !hasAutoPlayed) {
        setHasAutoPlayed(true);
        const targetScroll = window.innerHeight * 8 * 0.35;
        
        if (window.scrollY < targetScroll - 100) {
          import("framer-motion").then(({ animate }) => {
            animate(window.scrollY, targetScroll, {
              duration: 2.5,
              ease: "easeInOut",
              onUpdate: (latest) => window.scrollTo(0, latest)
            });
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoPlayed]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    if (imagesLoaded < 10) return; // Wait until at least some images are loaded
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(frameIndex.get()))
      );

      const img = imagesRef.current[idx];
      if (img && img.complete) {
        // Handle object-fit: cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        // Clear canvas and draw with black background (for dark theme)
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Use global composite operation for smoother blending if needed
        // ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Start render loop
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[800vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Loading overlay */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: imagesLoaded > FRAME_COUNT * 0.5 ? 0 : 1 }}
          transition={{ duration: 1 }}
          style={{ pointerEvents: imagesLoaded > FRAME_COUNT * 0.5 ? 'none' : 'auto' }}
        >
          <div className="text-white/50 text-sm font-mono tracking-widest">
            LOADING EXPERIENCE [{Math.round((imagesLoaded / FRAME_COUNT) * 100)}%]
          </div>
        </motion.div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505] pointer-events-none" />
      </div>
    </div>
  );
}
