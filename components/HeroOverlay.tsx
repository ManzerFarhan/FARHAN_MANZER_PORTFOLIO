"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/config/content";
import { FileText } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Content is hidden at scroll 0, fades in between 0.20 and 0.28 (around frame 90 to 110), and fades out near the end
  const contentOpacity = useTransform(scrollYProgress, [0, 0.20, 0.28, 0.8, 0.9], [0, 0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.20, 0.28, 0.8, 0.9], ["40px", "0px", "0px", "-40px"]);
  
  // Scroll indicator is visible at the very start, then fades out as you start scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const socialLinks = [
    { icon: FaLinkedin, href: content.socials.linkedin, label: "LinkedIn" },
    { icon: FaGithub, href: content.socials.github, label: "GitHub" },
    { icon: FaInstagram, href: content.socials.instagram, label: "Instagram" },
    { icon: FaEnvelope, href: content.socials.email, label: "Email" },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="flex flex-col md:flex-row justify-between items-center w-full gap-12"
        >
          {/* Left Side: Name and Resume */}
          <div className="flex flex-col items-start text-left max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 text-white drop-shadow-2xl leading-none">
              {content.hero.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
            
            <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide mb-10 drop-shadow-lg max-w-xl">
              {content.hero.tagline}
            </p>
            
            <div className="pointer-events-auto flex gap-4">
              <a 
                href={content.socials.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
              >
                <FileText size={20} />
                Resume
              </a>
            </div>
          </div>

          {/* Right Side: Social Bubbles */}
          <div className="pointer-events-auto flex md:flex-col gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#ff4500] hover:border-[#ff4500] hover:scale-115 shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(255,69,0,0.55)] transition-all duration-300 group relative"
                >
                  <Icon className="w-5 h-5 md:w-6 h-6" />
                  {/* Tooltip */}
                  <span className="absolute right-full mr-4 px-3 py-1.5 bg-neutral-950/95 border border-white/15 backdrop-blur-md text-white text-[10px] md:text-[11px] font-black tracking-widest uppercase rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none whitespace-nowrap hidden md:block">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs tracking-[0.2em] text-white/50 mb-2 uppercase drop-shadow-md">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full h-1/2 bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
