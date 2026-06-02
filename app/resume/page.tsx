"use client";

import { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdScreenRotation } from "react-icons/md";

export default function ResumePage() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if it's a mobile device and portrait orientation
      const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
      const isPortrait = window.innerHeight > window.innerWidth;
      
      setIsPortraitMobile(isMobile && isPortrait);
    };

    // Initial check
    checkOrientation();

    // Listen to resize and orientation change
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (isPortraitMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050505] via-[#1a0500] to-[#050505] text-white p-6 text-center">
        <div className="relative mb-8">
          <MdScreenRotation className="w-32 h-32 text-orange-500/80 animate-[spin_3s_ease-in-out_infinite]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-4">
          Rotate Your <span className="text-orange-500">Phone</span>
        </h1>
        <p className="text-white/60 max-w-md text-lg">
          Please rotate your device to landscape mode for the best resume viewing experience.
        </p>
      </div>
    );
  }

  // On laptop or landscape mobile, show the PDF directly
  return (
    <div className="w-full h-screen m-0 p-0 overflow-hidden bg-[#111]">
      <iframe 
        src="/FARHAN_RESUME_1.pdf" 
        className="w-full h-full border-none"
        title="Farhan Resume"
      />
    </div>
  );
}
