"use client";

import dynamic from "next/dynamic";

const Skills = dynamic(() => import("./Skills"), { 
  ssr: false,
  loading: () => (
    <div className="relative py-32 bg-[#050505] flex items-center justify-center min-h-[80vh]">
      <div className="text-white/50 text-sm font-mono animate-pulse">LOADING ARSENAL...</div>
    </div>
  )
});

export default function SkillsWrapper() {
  return (
    <section id="skills">
      <Skills />
    </section>
  );
}
