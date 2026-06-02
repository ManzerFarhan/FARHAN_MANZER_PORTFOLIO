"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { content } from "@/config/content";
import * as THREE from "three";
import { motion, useScroll, useSpring } from "framer-motion";
import { IconType } from "react-icons";
import { 
  FaPython, FaDatabase, FaHtml5, FaGoogle, FaAws, 
  FaGithub, FaChartBar, FaFileExcel, FaFilePowerpoint, 
  FaVideo, FaFilm, FaImage, FaCamera, FaUsers, 
  FaHandshake, FaUserTie, FaCode, FaLaptopCode
} from "react-icons/fa";

const skillIcons: Record<string, IconType> = {
  "Python": FaPython,
  "SQL": FaDatabase,
  "HTML": FaHtml5,
  "Google": FaGoogle,
  "AWS": FaAws,
  "Kaggle": FaChartBar,
  "Vercel": FaLaptopCode,
  "Jupyter Notebook": FaCode,
  "GitHub": FaGithub,
  "Power BI": FaChartBar,
  "Excel": FaFileExcel,
  "PowerPoint": FaFilePowerpoint,
  "Editing": FaVideo,
  "VN": FaFilm,
  "CapCut": FaFilm,
  "Snapseed": FaImage,
  "Photography": FaCamera,
  "Videography": FaVideo,
  "Leadership": FaUsers,
  "Teamwork": FaHandshake,
  "Team Management": FaUserTie
};

function Bubble({ skill, position }: { skill: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const Icon = skillIcons[skill] || FaCode;

  return (
    <Float speed={1.5 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial 
          color="#ff4500"
          emissive="#ff4500"
          emissiveIntensity={0.2}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9} 
          ior={1.2}
          thickness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.8}
        />
        {/* distanceFactor ensures the HTML perfectly scales with the 3D perspective */}
        <Html center zIndexRange={[100, 0]} distanceFactor={15}>
          <div className="flex flex-col items-center justify-center text-center w-32 pointer-events-none">
            <Icon size={24} className="text-white mb-2 drop-shadow-[0_0_15px_rgba(255,69,0,1)]" />
            <span className="text-white font-bold text-xs tracking-widest uppercase bg-orange-950/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-orange-400/40 shadow-[0_0_15px_rgba(255,69,0,0.6)] whitespace-nowrap">
              {skill}
            </span>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

// We pass the scroll spring to the scene
function CloudScene({ scrollYProgress }: { scrollYProgress: any }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random positions in a spherical cluster
  const bubbles = useMemo(() => {
    return content.skills.map((skill: string) => {
      // Radius from center
      const r = 4 + Math.random() * 6; 
      const theta = Math.random() * 2 * Math.PI; 
      const phi = Math.acos(2 * Math.random() - 1); 

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      return { skill, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  useFrame((state) => {
    // Get current scroll value (0 to 1)
    const scrollVal = scrollYProgress.get();
    
    if (groupRef.current) {
      // Rotate the entire cluster based on scroll
      groupRef.current.rotation.y = scrollVal * Math.PI * 2 + state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = scrollVal * Math.PI + state.clock.elapsedTime * 0.05;
      
      // Slight zoom in on scroll
      groupRef.current.position.z = THREE.MathUtils.lerp(0, 5, scrollVal);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={3} color="#ff4500" />
      <pointLight position={[10, -10, 10]} intensity={3} color="#ff8c00" />
      
      {bubbles.map((data, i) => (
        <Bubble key={i} skill={data.skill} position={data.position} />
      ))}
    </group>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll value
  const smoothScroll = useSpring(scrollYProgress, { damping: 15, mass: 1, stiffness: 80 });

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505] w-full h-[300vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        <div className="absolute top-32 left-0 w-full z-10 pointer-events-none">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(255,69,0,0.5)]">
              Technical<span className="text-white/40"> Arsenal</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto drop-shadow-[0_0_15px_rgba(255,69,0,0.8)]" />
          </div>
        </div>
        
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <Suspense fallback={null}>
              <CloudScene scrollYProgress={smoothScroll} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-orange-400/80 text-sm font-mono tracking-widest pointer-events-none animate-pulse">
          SCROLL TO EXPLORE
        </div>

      </div>
    </div>
  );
}
