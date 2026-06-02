"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { content } from "@/config/content";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.link}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group block relative rounded-2xl overflow-hidden glass-card aspect-[4/3]"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <ArrowUpRight size={24} />
            </div>
          </div>
          
          <p className="text-white/80 mb-6 font-light">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono text-white bg-white/20 rounded-full backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={containerRef} className="relative py-32 px-6 md:px-12 bg-[#050505]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Selected<span className="text-white/20"> Works</span>
            </h2>
            <div className="w-24 h-1 bg-white" />
          </div>
          
          <p className="text-white/60 max-w-md text-lg">
            A curated selection of my recent projects, showcasing expertise in frontend development and interactive design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.projects.map((project, index) => (
            <div 
              key={project.id} 
              className={index % 2 === 1 ? "md:mt-16" : ""}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
