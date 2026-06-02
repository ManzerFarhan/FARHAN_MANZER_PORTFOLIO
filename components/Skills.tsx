"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import { 
  FaPython, FaDatabase, FaAws, FaGoogle, FaGithub, 
  FaCode, FaCamera, FaVideo, FaFilm, FaPaintBrush, 
  FaUsers, FaHandshake, FaUserTie, FaGitAlt
} from "react-icons/fa";
import { 
  Brain, Cpu, Eye, Layers, LineChart, Sparkles, Bot, 
  TrendingUp, Sliders, BarChart3, HeartPulse
} from "lucide-react";

// Vercel Custom Icon SVG
const VercelIcon = () => (
  <svg viewBox="0 0 75 65" fill="currentColor" className="w-5 h-5 md:w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
    <path d="M37.5 0L75 65H0L37.5 0Z" />
  </svg>
);

interface Skill {
  name: string;
  icon: any;
}

// Line 1: Artificial Intelligence, Machine Learning, Computer Vision, Deep Learning, Data Science, Python, SQL, Generative AI, AI Agents, Predictive Analytics
const technicalLine1: Skill[] = [
  { name: "Artificial Intelligence", icon: Brain },
  { name: "Machine Learning", icon: Cpu },
  { name: "Computer Vision", icon: Eye },
  { name: "Deep Learning", icon: Layers },
  { name: "Data Science", icon: LineChart },
  { name: "Python", icon: FaPython },
  { name: "SQL", icon: FaDatabase },
  { name: "Generative AI", icon: Sparkles },
  { name: "AI Agents", icon: Bot },
  { name: "Predictive Analytics", icon: TrendingUp }
];

// Line 2: Feature Engineering • Data Visualization • AWS • Google Cloud • Git • GitHub • Vercel • Jupyter Notebook • Power BI • Healthcare AI
const technicalLine2: Skill[] = [
  { name: "Feature Engineering", icon: Sliders },
  { name: "Data Visualization", icon: BarChart3 },
  { name: "AWS", icon: FaAws },
  { name: "Google Cloud", icon: FaGoogle },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
  { name: "Vercel", icon: VercelIcon },
  { name: "Jupyter Notebook", icon: FaCode },
  { name: "Power BI", icon: BarChart3 },
  { name: "Healthcare AI", icon: HeartPulse }
];

// Creative: Photography • Videography • Video Editing • Graphic Design • Leadership • Team Management • Project Management
const creativeSkills: Skill[] = [
  { name: "Photography", icon: FaCamera },
  { name: "Videography", icon: FaVideo },
  { name: "Video Editing", icon: FaFilm },
  { name: "Graphic Design", icon: FaPaintBrush },
  { name: "Leadership", icon: FaUsers },
  { name: "Team Management", icon: FaHandshake },
  { name: "Project Management", icon: FaUserTie }
];

interface DockRowProps {
  skills: Skill[];
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
}

function DockRow({ skills, hoveredIdx, setHoveredIdx }: DockRowProps) {
  return (
    <div className="relative w-full overflow-x-auto md:overflow-x-visible no-scrollbar pb-6 pt-2">
      <div className="flex items-end justify-start md:justify-center gap-4 md:gap-[1.6rem] px-8 md:px-4 min-w-max md:min-w-0 pb-12 pt-2 relative">
        
        {/* The Shelf Line from the hand-drawn reference, placed between bubble and text */}
        <div className="absolute bottom-[44px] left-4 right-4 h-[5px] bg-white/10 border-t border-white/20 rounded-full -z-10 shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
        
        {skills.map((skill, idx) => {
          const Icon = skill.icon;
          const isHovered = hoveredIdx === idx;
          const distance = hoveredIdx !== null ? Math.abs(hoveredIdx - idx) : null;
          
          // Calculate scale and Y translation for the bubble circle itself
          let scale = 1;
          let y = 0;
          if (distance !== null) {
            if (distance === 0) {
              scale = 1.45;
              y = -22;
            } else if (distance === 1) {
              scale = 1.22;
              y = -12;
            } else if (distance === 2) {
              scale = 1.08;
              y = -4;
            }
          }

          return (
            <div 
              key={skill.name}
              className="flex flex-col items-center justify-end h-[8.5rem] w-16 md:w-[5.2rem] relative z-10 group"
            >
              {/* Animated Bubble Wrapper */}
              <motion.div
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ originY: 1 }}
                className="relative flex flex-col items-center cursor-pointer"
                animate={{ scale, y }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                  mass: 0.8
                }}
              >
                {/* Tooltip Bubble (floating on hover) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.85 }}
                      transition={{ duration: 0.12 }}
                      className="absolute -top-14 z-50 px-3 py-1.5 bg-neutral-950/95 border border-white/15 backdrop-blur-md rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white text-[10px] md:text-[11px] font-black tracking-widest uppercase whitespace-nowrap"
                    >
                      {skill.name}
                      {/* Tooltip Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-950 border-r border-b border-white/15 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glass Orb Bubble (Now 4.5rem/72px on desktop for larger bubbles) */}
                <div className="relative w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-gradient-to-br from-orange-500/90 via-red-600 to-amber-500/80 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_20px_rgba(255,69,0,0.25)] flex items-center justify-center overflow-hidden">
                  {/* Glossy Sheen overlay */}
                  <div className="absolute top-0.5 left-2 right-2 h-1/3 bg-white/20 rounded-full blur-[0.5px]"></div>
                  
                  {/* Inner shadow/gradient for depth */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.2))] rounded-full"></div>
                  
                  {/* Icon wrapper */}
                  <div className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.65)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-5 h-5 md:w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              {/* Static Text Label Below the Shelf */}
              <div className="text-[8.5px] md:text-[9.5px] font-black text-white/35 tracking-wider uppercase text-center mt-3 h-8 flex items-start justify-center w-full max-w-[4.8rem] md:max-w-[5.2rem] leading-tight select-none pointer-events-none group-hover:text-white/70 transition-colors duration-300">
                {skill.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredIdxL1, setHoveredIdxL1] = useState<number | null>(null);
  const [hoveredIdxL2, setHoveredIdxL2] = useState<number | null>(null);
  const [hoveredIdxL3, setHoveredIdxL3] = useState<number | null>(null);

  return (
    <div className="relative bg-gradient-to-b from-[#050505] via-[#120300] to-[#050505] w-full py-24 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Soft background ambient glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            Technical<span className="text-white/40"> Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto drop-shadow-[0_0_15px_rgba(255,69,0,0.8)]" />
        </div>

        {/* Large Rounded-Corner Box Container (Custom Red-Gradient panel matching project section highlights) */}
        <div className="w-full max-w-[94vw] xl:max-w-6xl rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-[#09090c]/98 via-[#180907]/98 to-[#320f0a]/98 p-6 md:p-12 shadow-[0_25px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.08),0_0_80px_rgba(255,69,0,0.06)] flex flex-col gap-10 md:gap-14 relative">
          
          {/* Section 1: Technical Skills & Tools */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-xl md:text-2xl font-black tracking-[0.25em] text-white uppercase">
                TECHNICAL SKILLS & TOOLS
              </h3>
              <p className="text-xs md:text-sm text-white/50 italic mt-2.5 max-w-2xl leading-relaxed">
                Building intelligent solutions through AI, Machine Learning, Computer Vision, Data Science, and modern cloud technologies.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Line 1 */}
              <DockRow 
                skills={technicalLine1} 
                hoveredIdx={hoveredIdxL1} 
                setHoveredIdx={setHoveredIdxL1} 
              />
              
              {/* Line 2 */}
              <DockRow 
                skills={technicalLine2} 
                hoveredIdx={hoveredIdxL2} 
                setHoveredIdx={setHoveredIdxL2} 
              />
            </div>
          </div>

          {/* Section 2: Creative Skills */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-xl md:text-2xl font-black tracking-[0.25em] text-white uppercase">
                CREATIVE SKILLS
              </h3>
              <p className="text-xs md:text-sm text-white/50 italic mt-2.5 max-w-2xl leading-relaxed">
                Blending creativity, leadership, and strategic thinking to build meaningful and user-focused experiences.
              </p>
            </div>

            {/* Line 3 */}
            <DockRow 
              skills={creativeSkills} 
              hoveredIdx={hoveredIdxL3} 
              setHoveredIdx={setHoveredIdxL3} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}
