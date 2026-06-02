"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import Image from "next/image";
import { FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function EventLookbookCard({ event, index, onClick }: { event: any; index: number; onClick: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!event.images || event.images.length <= 1) return;

    // Randomize the interval between 2000ms and 4000ms so they shuffle at different speeds
    const shuffleSpeed = 2000 + Math.random() * 2000;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    }, shuffleSpeed);

    return () => clearInterval(interval);
  }, [event.images]);

  // Determine span classes based on index to create an asymmetrical bento box grid based on the sketch
  let spanClass = "col-span-1";
  
  switch (index) {
    case 0: // Zero to One Hackathon (Tall Left)
      spanClass = "md:col-start-1 md:row-start-1 md:row-span-3 md:h-full min-h-[380px] md:min-h-[750px]";
      break;
    case 1: // AI Impact Summit (Tall Right)
      spanClass = "md:col-start-3 md:row-start-1 md:row-span-2 md:h-full min-h-[280px] md:min-h-[500px]";
      break;
    case 2: // The Campus Chronicles (Top Middle)
      spanClass = "md:col-start-2 md:row-start-1 md:row-span-1 md:h-full min-h-[200px]";
      break;
    case 3: // Tales Factory (Middle Middle)
      spanClass = "md:col-start-2 md:row-start-2 md:row-span-1 md:h-full min-h-[200px]";
      break;
    case 4: // UTKARSH (Bottom Middle/Right)
      spanClass = "md:col-start-2 md:col-span-2 md:row-start-3 md:row-span-1 md:h-full min-h-[200px]";
      break;
  }

  return (
    <motion.div 
      className={`relative rounded-3xl overflow-hidden cursor-pointer group w-full ${spanClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 w-full h-full bg-[#121217]">
        {event.images && event.images.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={event.images[currentImageIndex]}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 opacity-75 group-hover:opacity-90" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end z-10">
        <p className="text-[#ff4d4d] font-bold text-xs tracking-widest uppercase mb-2">{event.date}</p>
        <h3 className="text-2xl md:text-3xl font-black text-white/95 mb-2 uppercase tracking-tight leading-none">{event.title}</h3>
        
        <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white/70 text-sm mt-3 font-light max-w-md">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const selectedEvent = content.events.find((e: any) => e.id === selectedEventId);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedEventId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEventId]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEventId === null) return;
    const currentIndex = content.events.findIndex((e: any) => e.id === selectedEventId);
    const prevIndex = (currentIndex - 1 + content.events.length) % content.events.length;
    setSelectedEventId(content.events[prevIndex].id);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEventId === null) return;
    const currentIndex = content.events.findIndex((e: any) => e.id === selectedEventId);
    const nextIndex = (currentIndex + 1) % content.events.length;
    setSelectedEventId(content.events[nextIndex].id);
  };

  // Helper to style event headings with a two-part split look like the reference image
  const formatTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length <= 1) return <span className="text-white">{title}</span>;
    // Split near the middle
    const mid = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, mid).join(" ");
    const secondPart = words.slice(mid).join(" ");
    return (
      <>
        <span className="text-white">{firstPart}</span>{" "}
        <span className="text-white/20">{secondPart}</span>
      </>
    );
  };

  // Filter out the podcast thumbnail so it isn't repeated in the standard gallery columns
  const galleryImages = selectedEvent && selectedEvent.images 
    ? selectedEvent.images.filter((imgSrc: string) => imgSrc !== "/S10.jpg") 
    : [];

  // Manually split images into 3 columns to build a robust masonry grid with vertical flow and NO cropping
  const col1 = galleryImages.filter((_: any, i: number) => i % 3 === 0);
  const col2 = galleryImages.filter((_: any, i: number) => i % 3 === 1);
  const col3 = galleryImages.filter((_: any, i: number) => i % 3 === 2);

  return (
    <section id="events" className="py-32 bg-[#050505] relative min-h-screen overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff4d4d]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* Expanded container for Edge-to-Edge feel */}
      <div className="w-full max-w-[95vw] lg:max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-2">
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Featured Events
            </h2>
            <div className="w-24 h-1 bg-[#ff4d4d]" />
          </div>
          <p className="text-white/50 max-w-sm text-sm font-light text-right leading-relaxed hidden md:block">
            A curated lookbook of hackathon victories, technical summits, editorial leadership, and cultural organization.
          </p>
        </div>
        
        {/* Bento Box Grid - Stretched row heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-[250px_250px_250px] w-full">
          {content.events.map((event: any, index: number) => (
            <EventLookbookCard 
              key={event.id} 
              event={event} 
              index={index} 
              onClick={() => setSelectedEventId(event.id)} 
            />
          ))}
        </div>
      </div>

      {/* Modal Overlay Box Detailed View */}
      <AnimatePresence>
        {selectedEventId !== null && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-md">
            
            {/* Backdrop Click Dismiss */}
            <motion.div 
              className="absolute inset-0 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventId(null)}
            />

            {/* Modal Box Container - Enlarged to fill screen better */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[95vw] lg:max-w-[1300px] h-[90vh] bg-[#0b0b10] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-[#ff4d4d]/10 z-50"
            >
              {/* Sticky Header with Title and description as italic subheading */}
              <div className="sticky top-0 z-30 bg-[#0b0b10]/95 backdrop-blur-md border-b border-white/10 py-6 px-10 md:px-16 flex justify-between items-start">
                <div className="pr-6">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
                    {formatTitle(selectedEvent.title)}
                  </h2>
                  <p className="text-white/60 italic text-sm md:text-base font-light leading-relaxed max-w-3xl">
                    {selectedEvent.description}
                  </p>
                </div>
                
                <button
                  onClick={() => setSelectedEventId(null)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#ff4d4d] border border-white/10 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer ml-4 group shrink-0"
                  title="Return to Events"
                >
                  <FaHome size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Scrollable Content (Strictly Vertical / Up-Down Scroll) */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                
                {/* 3-Column Solid Masonry Grid - 100% Uncropped dynamic images */}
                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                      {col1.map((imgSrc: string, i: number) => (
                        <div 
                          key={`col1-${i}`} 
                          className="relative rounded-2xl overflow-hidden border border-white/10 group bg-[#161620] transition-all duration-300 hover:scale-[1.01] hover:border-white/30 hover:shadow-xl hover:shadow-[#ff4d4d]/5 w-full"
                        >
                          <img 
                            src={imgSrc} 
                            alt={`${selectedEvent.title} Gallery`}
                            loading="lazy"
                            className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                            <span className="text-white/60 text-xs font-mono">Image {i * 3 + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6">
                      {col2.map((imgSrc: string, i: number) => (
                        <div 
                          key={`col2-${i}`} 
                          className="relative rounded-2xl overflow-hidden border border-white/10 group bg-[#161620] transition-all duration-300 hover:scale-[1.01] hover:border-white/30 hover:shadow-xl hover:shadow-[#ff4d4d]/5 w-full"
                        >
                          <img 
                            src={imgSrc} 
                            alt={`${selectedEvent.title} Gallery`}
                            loading="lazy"
                            className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                            <span className="text-white/60 text-xs font-mono">Image {i * 3 + 2}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-6">
                      {col3.map((imgSrc: string, i: number) => (
                        <div 
                          key={`col3-${i}`} 
                          className="relative rounded-2xl overflow-hidden border border-white/10 group bg-[#161620] transition-all duration-300 hover:scale-[1.01] hover:border-white/30 hover:shadow-xl hover:shadow-[#ff4d4d]/5 w-full"
                        >
                          <img 
                            src={imgSrc} 
                            alt={`${selectedEvent.title} Gallery`}
                            loading="lazy"
                            className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                            <span className="text-white/60 text-xs font-mono">Image {i * 3 + 3}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  <p className="text-white/40 text-center py-12">No images available for this event.</p>
                )}

                {/* Featured Podcast Banner for Tales Factory - Enlarged and moved to the BOTTOM of the section */}
                {selectedEvent.id === 4 && (
                  <a 
                    href="https://youtu.be/gEF9dfCdRPg?si=G-9lq4xdBpG7o0nk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative rounded-3xl overflow-hidden border border-[#ff4d4d]/30 group bg-[#161620] mt-12 hover:border-[#ff4d4d] transition-all duration-300 shadow-2xl hover:shadow-[#ff4d4d]/10 cursor-pointer max-w-4xl mx-auto"
                  >
                    <div className="relative w-full aspect-[16/9]">
                      <img 
                        src="/S10.jpg" 
                        alt="Watch Podcast"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Play Button Icon Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-[#ff4d4d] hover:bg-[#ff1a1a] text-white flex items-center justify-center shadow-lg shadow-[#ff4d4d]/30 transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-10 h-10 fill-current translate-x-1" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Caption text at the bottom overlay */}
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 to-transparent py-6 text-center">
                        <p className="text-white text-xs sm:text-sm md:text-lg font-black tracking-[0.15em] uppercase px-4 drop-shadow-md">
                          YOU CAN WATCH THE FULL PODCAST ON YOUTUBE
                        </p>
                      </div>
                    </div>
                  </a>
                )}

              </div>

              {/* Navigation arrows (Placed INSIDE the box container, absolute) */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-[#ff4d4d] border border-white/10 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-sm"
                title="Previous Event"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-[#ff4d4d] border border-white/10 hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-sm"
                title="Next Event"
              >
                <FaChevronRight size={16} />
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
