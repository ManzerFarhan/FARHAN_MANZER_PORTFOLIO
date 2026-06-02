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
      <div className="flex items-end justify-start md:justify-center gap-3 md:gap-5 px-6 md:px-0 min-w-max md:min-w-0 pb-3 relative">
        {/* The Shelf Line from the hand-drawn reference */}
        <div className="absolute bottom-2.5 left-4 right-4 h-[5px] bg-white/10 border-t border-white/20 rounded-full -z-10 shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
        
        {skills.map((skill, idx) => {
          const Icon = skill.icon;
          const isHovered = hoveredIdx === idx;
          const distance = hoveredIdx !== null ? Math.abs(hoveredIdx - idx) : null;
          
          // Calculate scale and Y translation based on distance from hovered item
          let scale = 1;
          let y = 0;
          if (distance !== null) {
            if (distance === 0) {
              scale = 1.5;
              y = -22;
            } else if (distance === 1) {
              scale = 1.25;
              y = -12;
            } else if (distance === 2) {
              scale = 1.1;
              y = -4;
            }
          }

          return (
            <motion.div
              key={skill.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ originY: 1 }}
              className="relative flex flex-col items-center cursor-pointer group z-10"
              animate={{ scale, y }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                mass: 0.8
              }}
            >
              {/* Tooltip Bubble */}
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

              {/* Glass Orb Bubble */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500/90 via-red-600 to-amber-500/80 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_20px_rgba(255,69,0,0.25)] flex items-center justify-center overflow-hidden">
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
    <div className="relative bg-gradient-to-b from-[#050505] via-[#150400] to-[#050505] w-full py-24 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Soft background ambient glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            Technical<span className="text-white/40"> Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto drop-shadow-[0_0_15px_rgba(255,69,0,0.8)]" />
        </div>

        {/* Large Rounded-Corner Box Container (macOS-style pane) */}
        <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#0c0c0c]/85 backdrop-blur-xl p-6 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05),0_0_80px_rgba(255,69,0,0.08)] flex flex-col gap-10 md:gap-14 relative">
          
          {/* Section 1: Technical Skills */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h3 className="text-base md:text-lg font-bold tracking-[0.25em] text-white/90 uppercase">
                1. Technical Skills
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/30 to-transparent" />
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
            <div className="flex items-center gap-3">
              <h3 className="text-base md:text-lg font-bold tracking-[0.25em] text-white/90 uppercase">
                2. Creative Skills
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/30 to-transparent" />
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
