"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaTimes, FaFileAlt } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "News", id: "news" },
    { name: "Events", id: "events" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: FaFileAlt, href: content.socials.resume, label: "Resume" },
    { icon: FaLinkedin, href: content.socials.linkedin, label: "LinkedIn" },
    { icon: FaGithub, href: content.socials.github, label: "GitHub" },
    { icon: FaInstagram, href: content.socials.instagram, label: "Instagram" },
    { icon: FaEnvelope, href: content.socials.email, label: "Email" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "py-4 glass border-b" : "py-6 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
          {/* Logo - Left */}
          <div 
            className="cursor-pointer transition-transform hover:scale-105 z-20"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image 
              src="/ff.png" 
              alt="Logo" 
              width={120} 
              height={120} 
              className="object-contain mix-blend-screen scale-150 origin-left" 
              priority
            />
          </div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors relative group flex flex-col items-center gap-1 ${
                    isActive ? "text-[#ff4d4d]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* Dot indicator for active state like the reference image */}
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#ff4d4d] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}></span>
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Hamburger Menu */}
          <div className="z-20">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 bg-[#ff4d4d] rounded-full flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform group"
            >
              <span className="w-5 h-[2px] bg-white transform transition-transform group-hover:-translate-x-1"></span>
              <span className="w-5 h-[2px] bg-white"></span>
              <span className="w-5 h-[2px] bg-white transform transition-transform group-hover:translate-x-1"></span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0f0f15] border-l border-white/10 z-[70] flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-black text-white tracking-widest uppercase">Contact</h3>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-8">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-[#b39d82] uppercase mb-4">Direct Links</p>
                  <div className="flex flex-col gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a 
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 text-white/70 hover:text-white hover:translate-x-2 transition-all"
                        >
                          <span className="w-10 h-10 rounded-full glass flex items-center justify-center">
                            <Icon size={16} />
                          </span>
                          <span className="font-medium tracking-wider">{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full border border-white/20 bg-white/5 hover:bg-[#ff4d4d] hover:border-[#ff4d4d] py-3 px-6 rounded-full text-center mb-6 transition-all duration-300 cursor-pointer group/connect"
                  >
                    <span className="text-white font-bold tracking-widest text-xs uppercase group-hover/connect:scale-105 inline-block transition-transform">
                      (Let&apos;s Connect)
                    </span>
                  </button>
                  <p className="text-xs font-bold tracking-[0.2em] text-[#b39d82] uppercase mb-4">Location</p>
                  <p className="text-white/70 text-sm">New Delhi, India</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
