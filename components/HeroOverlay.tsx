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

  // Fade content in between 25% and 35% of the scroll (when face is close), and fade out near the end
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.8, 0.9], [0, 0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.35, 0.8, 0.9], ["30px", "0px", "0px", "-30px"]);
  
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
                  className="w-14 h-14 rounded-full glass flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors group relative hover:scale-110 duration-300"
                >
                  <Icon size={24} />
                  {/* Tooltip */}
                  <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
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
