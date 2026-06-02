"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/config/content";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-20 px-6 md:px-12 bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505] overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            About<span className="text-white/20"> Me</span>
          </h2>
          <p className="text-xl text-white/60 italic mb-4">
            Built from ambition, driven by curiosity.
          </p>
          <div className="w-24 h-1 bg-white" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y }} className="relative h-[55vh] lg:h-[70vh] w-full rounded-2xl overflow-hidden">
            <Image 
              src={content.about.image} 
              alt="About Me" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700" 
            />
          </motion.div>

          <div className="flex flex-col justify-center px-4 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">The Journey</h3>
              <p className="text-lg md:text-xl leading-[1.8] text-white/80 font-light tracking-wide text-justify">
                {content.about.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
