"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import { FileText } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the single hero image
    const img = new Image();
    img.src = "/hero1.jpg";
    img.onload = () => {
      // Simulate slightly longer loading for a premium feel
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    };
    img.onerror = () => {
      // Fallback in case image is missing
      setIsLoaded(true);
    };
  }, []);

  const socialLinks = [
    { icon: FaLinkedin, href: content.socials.linkedin, label: "LinkedIn" },
    { icon: FaGithub, href: content.socials.github, label: "GitHub" },
    { icon: FaInstagram, href: content.socials.instagram, label: "Instagram" },
    { icon: FaEnvelope, href: content.socials.email, label: "Email" },
  ];

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-t-2 border-orange-500 rounded-full animate-spin" />
              <div className="text-white/50 text-sm font-mono tracking-widest uppercase animate-pulse">
                LOADING EXPERIENCE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Image with Fade-in and beautiful filters */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/hero1.jpg')` }}
      />

      {/* Dark Vignette Overlay for Premium Vignette & Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_95%)] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
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
