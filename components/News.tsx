"use client";

import { content } from "@/config/content";

export default function News() {
  return (
    <section id="news" className="py-20 px-6 md:px-12 relative bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505] text-white">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
            The World <span className="text-white/20">Noticed</span>
          </h2>
          <p className="text-xl text-white/60 italic">
            Recognition that reached beyond the classroom.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.news.map((item) => (
            <a 
              key={item.id} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col h-full bg-gradient-to-br from-[#0f0f15] via-[#3b1511] to-[#7a2113] rounded-xl p-8 border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-red-900/30 hover:-translate-y-1"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              {/* Paper Texture Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
              />
              
              {/* Large Faint Watermark */}
              <div className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/[0.03] leading-none pointer-events-none select-none z-0">
                {item.watermark}
              </div>

              <div className="relative z-10 flex flex-col h-full min-h-[300px]">
                <p className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase mb-4">
                  {item.source}
                </p>
                
                <hr className="border-white/10 mb-6" />
                
                <h3 className="text-2xl font-serif font-semibold leading-snug mb-4 text-white/90">
                  "{item.title}"
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>
                
                <p className="text-xs font-bold tracking-widest text-white/40 uppercase mt-auto group-hover:text-white transition-colors">
                  Read Article &rarr;
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-2xl md:text-3xl font-light italic text-white/40 tracking-wide">
            The beginning of a longer story
          </p>
        </div>
      </div>
    </section>
  );
}
