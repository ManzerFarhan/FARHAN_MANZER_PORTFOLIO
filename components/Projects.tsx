"use client";

import { content } from "@/config/content";
import { FaGithub, FaFileAlt, FaArrowDown } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 relative bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505] text-white">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 flex items-center gap-4">
            <span className="text-white">MY</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">PROJECTS</span>
          </h2>
          <p className="text-xl text-white/60 italic">
            Ideas that left the notebook.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.projects.map((project, index) => {
            const isFullWidth = index === 2; // 3rd project (Crypto) spans full width
            const gridClass = isFullWidth ? "md:col-span-2" : "md:col-span-1";
            const number = `0${index + 1}`;

            return (
              <div 
                key={project.id} 
                className={`relative bg-gradient-to-br from-[#0f0f15] via-[#3b1511] to-[#7a2113] rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden flex flex-col justify-between shadow-2xl shadow-red-900/10 ${gridClass}`}
              >

                {/* Large Watermark Number */}
                <div className="absolute -bottom-12 right-4 text-[180px] font-black text-white/[0.03] leading-none select-none pointer-events-none z-0 tracking-tighter">
                  {number}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:justify-between h-full">
                  
                  {/* Main Content */}
                  <div className={`flex flex-col ${isFullWidth ? 'md:w-3/5' : 'w-full'}`}>
                    {/* Category Subheading */}
                    <p className="text-xs font-bold tracking-[0.2em] text-[#b39d82] uppercase mb-3">
                      {project.category}
                    </p>
                    
                    {/* Title */}
                    <h3 className="text-3xl font-bold uppercase mb-4 text-white/90">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-4 py-1.5 border border-white/10 rounded-full text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Icons & Action */}
                    <div className="flex items-center gap-4 mt-auto">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white/30 transition-colors">
                        <FaGithub size={18} />
                      </a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white/30 transition-colors">
                        <FaFileAlt size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Stats Section (Only for Crypto Project) */}
                  {isFullWidth && project.stats && (
                    <div className="mt-8 md:mt-0 flex flex-col justify-center items-end gap-4 w-full md:w-1/3">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="border border-white/10 rounded-2xl p-6 text-center w-full max-w-[200px] bg-black/40">
                          <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">
                            {stat.label}
                          </p>
                          <p className="text-3xl font-black text-[#ffbd80]">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
                
                {/* Center Down Arrow for last item (visual touch from reference) */}
                {isFullWidth && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 p-3 bg-white/10 rounded-full border border-white/20 text-white z-20">
                    <FaArrowDown size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
