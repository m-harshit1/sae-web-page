'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HolographicCard from './HolographicCard';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryPhotos = [
  {
    title: "BAJA ATV Track Shakedown",
    desc: "B-26 ATV undergoing rigorous suspension tuning and acceleration tests on the dirt track.",
    path: "/baja_atv_race.png",
    category: "Testing",
    accent: "border-torque-orange/30 text-torque-orange",
    camera: "Sony α7 IV",
    lens: "FE 70-200mm f/2.8 GM OSS II",
    exposure: "1/2000s | f/4.0 | ISO 400",
    location: "Orvakal Test Track, Kurnool",
    date: "February 14, 2026"
  },
  {
    title: "IIITDM Racing Team Workshop",
    desc: "Chapter officers standing next to the B-26 ATV inside our motorsport welding laboratory.",
    path: "/team_workshop.png",
    category: "Workshops",
    accent: "border-apex-red/30 text-apex-red",
    camera: "Sony α7R V",
    lens: "FE 24-70mm f/2.8 GM II",
    exposure: "1/125s | f/2.8 | ISO 800",
    location: "IIITDM Kurnool Welding Lab",
    date: "October 22, 2025"
  },
  {
    title: "AWIM STEM Mentoring Session",
    desc: "SAE chapter mentors demonstrating aero concepts to primary school children in Kurnool district.",
    path: "/outreach_mentorship.png",
    category: "AWIM",
    accent: "border-emerald-500/30 text-emerald-400",
    camera: "Fujifilm X-T5",
    lens: "XF 16-55mm f/2.8 R LM WR",
    exposure: "1/250s | f/3.2 | ISO 320",
    location: "Govt High School, Orvakal",
    date: "November 05, 2025"
  },
  {
    title: "BAJA ATV Dynamic Drift",
    desc: "All-terrain vehicle kicking up a massive dirt plume during high-speed cornering and traction tests.",
    path: "/event_baja_drift.png",
    category: "Testing",
    accent: "border-torque-orange/30 text-torque-orange",
    camera: "Canon EOS R3",
    lens: "RF 70-200mm f/2.8 L IS USM",
    exposure: "1/3200s | f/4.5 | ISO 250",
    location: "National Off-Road Circuit, Indore",
    date: "January 18, 2026"
  },
  {
    title: "BAJA Grid Lineup",
    desc: "Competition vehicles lined up at the starting grid of the endurance racing phase in the national campaign.",
    path: "/event_baja_lineup.png",
    category: "Competition",
    accent: "border-apex-red/30 text-apex-red",
    camera: "Canon EOS R3",
    lens: "RF 24-70mm f/2.8 L IS USM",
    exposure: "1/1600s | f/5.6 | ISO 200",
    location: "Indore Competition Paddocks",
    date: "January 20, 2026"
  }
];

export default function GalleryTab() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = activeFilter === "All" 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === activeFilter);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  return (
    <div className="animate-fadeIn pb-24">
      {/* Header */}
      <div className="bg-carbon-900 border-b border-white/5 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-white flex items-center justify-center gap-4">
            <span className="w-3 h-3 rounded-full bg-apex-red animate-pulse" />
            [ SYSTEM_MEDIA_REGISTERS ]
          </h1>
          <p className="font-mono text-sm tracking-widest uppercase text-slate-400">
            Accessing media archives and competition logs.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3 font-mono text-xs mb-12 border-b border-white/5 pb-8">
          {["All", "Testing", "Workshops", "AWIM", "Competition"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setSelectedPhotoIndex(null);
              }}
              className={`px-6 py-2 border transition-all uppercase font-bold tracking-widest cursor-crosshair ${
                activeFilter === cat 
                  ? "bg-apex-red/10 border-apex-red text-apex-red" 
                  : "bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/30"
              }`}
            >
              [ {cat.toUpperCase()} ]
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPhotos.map((pic, idx) => (
            <HolographicCard key={idx} intensity={12}>
              <div 
                onClick={() => setSelectedPhotoIndex(idx)}
                className="bg-titanium-700/50 border border-white/10 rounded-sm overflow-hidden glass-panel flex flex-col justify-between group hover:border-white/30 transition-all duration-300 cursor-crosshair h-full"
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-carbon-900 border-b border-white/5">
                  <Image
                    src={pic.path}
                    alt={pic.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay HUD target */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-carbon-900/40 backdrop-blur-[2px]">
                    <Search className="text-white/50 w-12 h-12" strokeWidth={1} />
                  </div>
                </div>
                <div className="p-6 space-y-3 font-mono">
                  <div className={`inline-block px-2 py-1 border rounded-sm text-[9px] uppercase tracking-widest font-bold ${pic.accent}`}>
                    {pic.category}
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider leading-relaxed">{pic.title}</h4>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">{pic.desc}</p>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-900/95 backdrop-blur-xl p-4 md:p-12"
          >
            <div className="absolute inset-0 cursor-crosshair" onClick={() => setSelectedPhotoIndex(null)} />
            
            <button 
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 z-50 p-2 text-slate-400 hover:text-white border border-transparent hover:border-white/20 transition-all rounded-sm cursor-pointer"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#1E2025] border border-white/10 rounded-sm overflow-hidden shadow-2xl z-10"
            >
              <div className="relative w-full md:w-3/4 aspect-video md:aspect-auto md:min-h-[70vh] bg-black">
                <Image
                  src={filteredPhotos[selectedPhotoIndex].path}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="w-full md:w-1/4 p-8 border-l border-white/5 space-y-8 flex flex-col justify-center">
                <div className="space-y-3 border-b border-white/5 pb-6">
                  <div className={`inline-block px-2 py-1 border rounded-sm font-mono text-[9px] uppercase tracking-widest font-bold ${filteredPhotos[selectedPhotoIndex].accent}`}>
                    {filteredPhotos[selectedPhotoIndex].category}
                  </div>
                  <h3 className="font-heading font-black text-2xl uppercase tracking-tighter text-white">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h3>
                  <p className="text-slate-400 font-sans text-sm leading-relaxed">
                    {filteredPhotos[selectedPhotoIndex].desc}
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <span className="block text-slate-500 uppercase tracking-widest mb-1 text-[9px]">Location</span>
                    <strong className="text-white">{filteredPhotos[selectedPhotoIndex].location}</strong>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase tracking-widest mb-1 text-[9px]">Timestamp</span>
                    <strong className="text-white">{filteredPhotos[selectedPhotoIndex].date}</strong>
                  </div>
                  <div className="border-t border-white/5 pt-4 space-y-2 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Camera</span>
                      <span className="text-slate-300">{filteredPhotos[selectedPhotoIndex].camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lens</span>
                      <span className="text-slate-300 text-right">{filteredPhotos[selectedPhotoIndex].lens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">EXIF</span>
                      <span className="text-slate-300">{filteredPhotos[selectedPhotoIndex].exposure}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
