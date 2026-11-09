'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, Building2, Info, GraduationCap, X 
} from 'lucide-react';
import { motion, useInView, useAnimation, useSpring, useTransform } from 'framer-motion';
import HolographicCard from './HolographicCard';

// --- Animation Helper Components ---
function RevealOnScroll({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } }
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", colorClass }: { value: number, suffix?: string, colorClass: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Use framer-motion spring for counting
  const spring = useSpring(0, { bounce: 0, duration: 2500 });
  const display = useTransform(spring, (current) => Math.floor(current));

  React.useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className={`font-heading font-black text-4xl lg:text-5xl ${colorClass} block flex justify-center items-end`}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
// -----------------------------------

import { facultyAdvisors } from '@/data/teamData';

interface HomeTabProps {
  switchPage: (tab: string) => void;
}

interface PhotoItem {
  title: string;
  desc: string;
  path: string;
  category: "Testing" | "Workshops" | "AWIM" | "Competition" | "Sponsors" | "Manufacturing";
  accent: string;
  camera: string;
  lens: string;
  exposure: string;
  location: string;
  date: string;
}

const galleryPhotos: PhotoItem[] = [
  {
    title: "Rally Shakedown Race",
    desc: "Single-seat off-road vehicle conquering steep muddy hairpins during the dynamic shakedown phase.",
    path: "/baja_atv_race.png",
    category: "Testing",
    accent: "border-torque-orange/30 text-torque-orange",
    camera: "Sony α7R V",
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
    date: "January 16, 2026"
  },
  {
    title: "Extreme Obstacle Jump",
    desc: "The single-seater ATV getting airborne while navigating a rough log-jump obstacle.",
    path: "/event_baja_jump.png",
    category: "Testing",
    accent: "border-emerald-500/30 text-emerald-400",
    camera: "Sony α1",
    lens: "FE 400mm f/2.8 GM OSS",
    exposure: "1/4000s | f/3.5 | ISO 500",
    location: "Suspension Shakedown Sector",
    date: "February 20, 2026"
  }
];

export default function HomeTab({ switchPage }: HomeTabProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredPhotos = activeFilter === "All" 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === activeFilter);

  // Keyboard Navigation for Lightbox Modal
  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex(prev => (prev !== null ? (prev + 1) % filteredPhotos.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex(prev => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : filteredPhotos.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  return (
    <div className="animate-fadeIn">
      {/* Section 1: Hero Section with Video Overlay */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center px-4 bg-gradient-to-b from-carbon-900 via-[#131519] to-carbon-900 border-b border-white/5">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          autoPlay loop muted playsInline
        >
          <source src="https://www.bajasaeindia.org/upload/banner/BSI%202025_1719844207.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 carbon-mesh opacity-40" />

        <div className="max-w-7xl mx-auto w-full relative z-10 space-y-8">
          <RevealOnScroll>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-apex-red/10 border border-apex-red/30 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-apex-red">
              <span className="w-2 h-2 rounded-full bg-apex-red led-pulse" />
              SAEINDIA Collegiate Club — IIITDM Kurnool
            </div>
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-[0.88] text-white">
              DESIGN.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-red to-torque-orange">BUILD.</span><br />
              RACE.
            </h1>
            <p className="max-w-xl text-slate-300 font-sans text-base leading-relaxed pt-2">
              We are the SAEINDIA student chapter of IIITDM Kurnool — annually designing, fabricating, and racing
              competitive off-road and motorsport vehicles while building India's next generation of engineers.
            </p>
          </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
          <div className="flex flex-wrap gap-4 font-mono">
            <button
              onClick={() => switchPage("projects")}
              className="flex items-center gap-2 bg-apex-red/10 border border-apex-red hover:bg-apex-red hover:text-white text-apex-red text-[10px] font-bold uppercase tracking-widest px-7 py-4 transition-all rounded-sm cursor-crosshair"
            >
              <span>[ EXPLORE_PROJECTS ]</span>
              <ArrowUpRight size={14} />
            </button>
            <button
              onClick={() => switchPage("join")}
              className="flex items-center gap-2 bg-[#1E2025]/50 backdrop-blur-md border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-widest px-7 py-4 transition-all rounded-sm cursor-crosshair"
            >
              <span>[ JOIN_TEAM ]</span>
            </button>
            <button
              onClick={() => switchPage("join")}
              className="flex items-center gap-2 bg-transparent border border-white/5 hover:border-white/30 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest px-7 py-4 transition-all rounded-sm cursor-crosshair"
            >
              <span>[ SPONSOR_US ]</span>
            </button>
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 2: Who We Are (Stats & Impact) */}
      <section className="py-16 px-4 bg-carbon-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-white flex items-center justify-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-apex-red animate-pulse" />
              [ CORE DIRECTIVES ]
            </h2>
            <p className="text-slate-400 font-mono text-xs tracking-widest uppercase">
              Bridging academic limits and physical engineering parameters to run competitive national campaigns.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: 50, suffix: "+", label: "Active Members", desc: "Specialized subsystem teams", color: "text-white" },
              { val: 4, suffix: "+", label: "Years Active", desc: "Since our 2023 inception", color: "text-apex-red" },
              { val: 10, suffix: "+", label: "Industry Sponsors", desc: "Fueling fabrication & tests", color: "text-torque-orange" },
              { val: 100, suffix: "+", label: "Students Mentored", desc: "Kurnool AWIM STEM Outreach", color: "text-emerald-400" },
            ].map((s, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="bg-[#1E2025]/50 border border-white/5 p-6 rounded-lg text-center backdrop-blur-sm h-full flex flex-col justify-center">
                  <AnimatedCounter value={s.val} suffix={s.suffix} colorClass={s.color} />
                  <span className="font-mono text-xs text-white block mt-2 uppercase tracking-wider">{s.label}</span>
                  <span className="font-sans text-xs text-slate-400 block mt-1">{s.desc}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: About details */}
      <section className="py-20 px-4 bg-gradient-to-b from-carbon-900 to-[#131519] border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <RevealOnScroll>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
              Chapter Legacy
            </span>
            <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-white flex items-center justify-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-torque-orange animate-pulse" />
              [ MISSION PARAMETERS ]
            </h2>
            <p className="text-slate-400 font-mono text-xs tracking-widest uppercase pt-2">
              Discover our collegiate foundation and core engineering values.
            </p>
          </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealOnScroll delay={0.1}>
            <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg p-8 glass-panel space-y-4 backdrop-blur-sm h-full">
              <h3 className="font-mono font-bold text-[11px] uppercase tracking-widest text-apex-red border-b border-white/10 pb-2 mb-3">
                [ WHAT_IS_SAEINDIA ]
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                SAEINDIA is a premier professional society that serves the mobility engineering community in India. Operating as an affiliate of SAE International, it connects students, researchers, and corporate engineering supervisors to define industrial benchmarks for automotive, aerospace, and commercial vehicle segments.
              </p>
            </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
            <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg p-8 glass-panel space-y-4 backdrop-blur-sm h-full">
              <h3 className="font-mono font-bold text-[11px] uppercase tracking-widest text-torque-orange border-b border-white/10 pb-2 mb-3">
                [ OUR_COLLEGIATE_MISSION ]
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                Founded in 2023 at the Indian Institute of Information Technology, Design & Manufacturing (IIITDM), Kurnool, our collegiate club acts as an incubator for hands-on technical skills. We organize specialized student teams to apply classroom mathematics directly to multi-body dynamic software simulations, chassis TIG weldments, and circuit testing.
              </p>
            </div>
            </RevealOnScroll>
          </div>

          {/* Advisors */}
          <div className="bg-[#1E2025]/30 border border-white/10 rounded-lg p-8 glass-panel space-y-6 backdrop-blur-sm">
            <h3 className="font-mono font-bold text-[11px] uppercase tracking-widest text-white border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              [ FACULTY_IN_CHARGES ]
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {facultyAdvisors.map((advisor, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading font-black text-lg shrink-0 ${
                    idx === 0 
                      ? "bg-torque-orange/20 border border-torque-orange/30 text-torque-orange" 
                      : "bg-apex-red/20 border border-apex-red/30 text-apex-red"
                  }`}>
                    {advisor.initials}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-white text-base">{advisor.name}</h4>
                    <p className="font-mono text-xs text-slate-400">{advisor.role}</p>
                    <p className="text-slate-300 text-xs font-sans leading-relaxed pt-1">
                      {advisor.role.includes("Advisor") 
                        ? "Mechanical Engineering Department, IIITDM Kurnool. Directing overall student activities, rulebook validations, and project budgeting strategies." 
                        : "Mechanical Engineering Department, IIITDM Kurnool. Supervising welding fixtures quality, Finite Element Analysis static approvals, and workshop safety."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Values */}
          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
            {[
              { icon: <Building2 className="text-apex-red" size={20} />, title: "Technical Rigor", desc: "Every bracket, tube profile, and gear ratio is validated using numerical simulations prior to fabrication." },
              { icon: <Info className="text-torque-orange" size={20} />, title: "Student Autonomy", desc: "Chapter officers manage operations, budget allocations, vendor outreach, and recruitment drives independently." },
              { icon: <GraduationCap className="text-emerald-400" size={20} />, title: "Mentorship Transfer", desc: "Senior team leads draft training roadmaps and host software bootcamps to transfer knowledge to rookies." }
            ].map((v, i) => (
              <div key={i} className="bg-carbon-900/60 border border-white/5 rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-3">
                  {v.icon}
                  <strong className="text-white text-sm uppercase tracking-wide block">{v.title}</strong>
                </div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Current Vehicle (B-26 ATV Highlight) */}
      <section className="py-20 px-4 bg-carbon-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-torque-orange/10 border border-torque-orange/30 px-3 py-1 text-xs font-mono uppercase tracking-widest text-torque-orange">
              ACTIVE COMPETITION VEHICLE
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white leading-none flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-torque-orange animate-pulse" />
              [ VEHICLE_B-26_ACTIVE ]
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              Our active engineering project: a single-seat off-road vehicle built to withstand extreme jumps, rock crawls, and deep mud trails. Powered by an air-cooled Honda GX430T powerplant and a custom-tuned 4WD system.
            </p>
            <div className="grid grid-cols-3 gap-4 font-mono text-xs text-slate-300 pt-2">
              <div className="bg-[#1E2025]/40 p-3 border border-white/5 rounded">
                <span className="text-xs text-slate-500 block uppercase">Top Speed</span>
                <strong className="text-white text-base">50.1 km/h</strong>
              </div>
              <div className="bg-[#1E2025]/40 p-3 border border-white/5 rounded">
                <span className="text-xs text-slate-500 block uppercase">Acceleration</span>
                <strong className="text-white text-base">2.94 m/s²</strong>
              </div>
              <div className="bg-[#1E2025]/40 p-3 border border-white/5 rounded">
                <span className="text-xs text-slate-500 block uppercase">Wheel Torque</span>
                <strong className="text-white text-base">166.2 Nm</strong>
              </div>
            </div>
            <button
              onClick={() => switchPage("projects")}
              className="flex items-center justify-center w-max gap-2 bg-transparent border border-torque-orange text-torque-orange hover:bg-torque-orange hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 transition-all rounded-sm cursor-crosshair animate-pulse"
            >
              <span>[ EXPLORE_VEHICLE_BLUEPRINT ]</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1E2025] to-carbon-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl relative p-1 group aspect-video">
            <Image 
              src="/baja_atv_race.png" 
              alt="BAJA ATV B-26" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-500" 
            />
          </div>
        </div>
      </section>

      {/* Section 5: Action Reels and Video Hub */}
      <section className="py-20 px-4 bg-[#131519] border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-torque-orange/10 border border-torque-orange/30 text-torque-orange font-mono text-xs uppercase tracking-widest skew-x-3">
              Action Archives
            </span>
            <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-white flex items-center justify-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-torque-orange animate-pulse" />
              [ COMPETITION_ACTION_REELS ]
            </h2>
            <p className="text-slate-400 font-mono text-xs tracking-widest uppercase pt-2">
              Watch the B-26 ATV conquering shakedowns, dynamic tests, and national design tracks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
            {[
              {
                title: "BAJA Highlights Loop (BSI 2025)",
                desc: "Endurance race action and extreme hill climbs.",
                src: "https://www.bajasaeindia.org/upload/banner/BSI%202025_1719844207.mp4"
              },
              {
                title: "Brake Test & Sledge Pull",
                desc: "Simultaneous wheel locking and torque pulling validation.",
                src: "https://www.bajasaeindia.org/upload/banner/Brake%20test%20_sledge%20pull_1719849400.mp4"
              },
              {
                title: "Suspension, Traction & Fabrication",
                desc: "Shakedown runs on rough tracks demonstrating wheel travel.",
                src: "https://www.bajasaeindia.org/upload/banner/S&T_Manu_1719849484.mp4"
              }
            ].map((vid, idx) => (
              <div key={idx} className="bg-titanium-700/40 border border-white/10 rounded-lg overflow-hidden glass-panel flex flex-col justify-between">
                <div className="aspect-video w-full relative bg-carbon-900 overflow-hidden">
                  <video 
                    src={vid.src}
                    controls
                    muted
                    loop
                    className="w-full h-full object-cover"
                    playsInline
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-white font-bold uppercase tracking-tight text-xs">{vid.title}</h4>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">{vid.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Photo Gallery */}
      <section className="py-20 px-4 bg-carbon-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
              Photo Registers
            </span>
            <h2 className="font-heading font-black text-3xl uppercase tracking-tight text-white flex items-center justify-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-apex-red animate-pulse" />
              [ PROJECT_ACTION_PHOTO_GALLERY ]
            </h2>
            <p className="text-slate-400 font-mono text-xs tracking-widest uppercase pt-2">
              Dynamic photo registers of track tests, laboratory designs, and mentoring events.
            </p>
          </div>

          {/* Photo Filters */}
          <div className="flex flex-wrap justify-center border-b border-white/10 pb-4 gap-2 font-mono text-xs">
            {["All", "Testing", "Workshops", "AWIM", "Competition"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 py-1.5 border rounded cursor-pointer transition-all uppercase font-bold tracking-wider ${
                  activeFilter === cat 
                    ? "bg-apex-red border-apex-red text-white" 
                    : "bg-transparent border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((pic, idx) => (
              <HolographicCard key={idx} intensity={8}>
                <div 
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="bg-titanium-700/50 border border-white/10 rounded-lg overflow-hidden glass-panel flex flex-col justify-between group hover:border-white/20 transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-carbon-900 border-b border-white/5">
                    <Image
                      src={pic.path}
                      alt={pic.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2 font-mono text-xs">
                    <div className={`inline-block px-2 py-0.5 border rounded text-xs uppercase font-bold ${pic.accent}`}>
                      {pic.category}
                    </div>
                    <h4 className="text-white font-black text-sm uppercase tracking-tight leading-none pt-1">{pic.title}</h4>
                    <p className="text-slate-400 font-sans text-xs leading-relaxed pt-1">{pic.desc}</p>
                  </div>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Corporate Sponsors Marquee */}
      <section className="py-16 px-4 bg-[#131519]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">PARTNERS & BENEFECTORS</span>
            <h2 className="font-heading font-black text-2xl uppercase text-white">FUELING OUR ENGINEERING DRIVE</h2>
          </div>

          {/* Corporate Industry Supporters */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-60">
            {["ANSYS", "SolidWorks", "Ohlins Shocks", "Bosch", "Brembo", "Mahindra"].map((name, i) => (
              <div key={i} className="bg-carbon-900 border border-white/5 px-6 py-4 rounded font-mono text-xs text-slate-400 font-bold uppercase text-center w-full">
                {name}
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => switchPage("join")}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-torque-orange hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Sponsor Tiers &amp; ROI Plans →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Join Us CTA */}
      <section className="py-20 px-4 bg-carbon-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-apex-red/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none">
            WANT TO BUILD THE FUTURE?
          </h2>
          <p className="text-slate-300 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            We are looking for passionate analysts, mechanical designers, electronics programmers, and management operations captains. Applications are open for the Monsoon 2026 recruit cycle.
          </p>
          <button
            onClick={() => switchPage("join")}
            className="inline-flex items-center gap-2 bg-apex-red hover:bg-apex-red/90 text-white font-mono text-xs font-bold uppercase tracking-wider px-8 py-4 transition-all rounded cursor-pointer shadow-lg shadow-apex-red/20"
          >
            <span>Enter Recruitment Hub</span>
          </button>
        </div>
      </section>

      {/* Full screen Lightbox viewer for Photos */}
      {isMounted && selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-900/95 backdrop-blur-md p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPhotoIndex(null);
          }}
        >
          <div className="relative w-full max-w-5xl bg-titanium-700/95 border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch max-h-[90vh]">
            
            {/* Arrows */}
            <button 
              onClick={() => setSelectedPhotoIndex(prev => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 border border-white/10 text-white rounded-full hover:bg-apex-red hover:border-apex-red transition-all cursor-pointer font-bold"
            >
              ◀
            </button>
            <button 
              onClick={() => setSelectedPhotoIndex(prev => (prev !== null ? (prev + 1) % filteredPhotos.length : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 border border-white/10 text-white rounded-full hover:bg-apex-red hover:border-apex-red transition-all cursor-pointer font-bold"
            >
              ▶
            </button>

            {/* Close */}
            <button 
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute right-4 top-4 z-40 p-2 bg-black/40 border border-white/10 text-white rounded-full hover:bg-apex-red hover:border-apex-red transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left: Image Canvas */}
            <div className="flex-grow flex items-center justify-center p-6 bg-carbon-900 border-r border-white/5 relative min-h-[300px]">
              <Image 
                src={filteredPhotos[selectedPhotoIndex].path} 
                alt={filteredPhotos[selectedPhotoIndex].title}
                width={800}
                height={600}
                className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain rounded"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 border border-white/10 px-3 py-1.5 rounded font-mono text-xs text-slate-300 flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lift-blue led-pulse" />
                <span>{filteredPhotos[selectedPhotoIndex].location}</span>
              </div>
            </div>

            {/* Right EXIF details */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-titanium-700 font-mono text-xs text-slate-300 border-t md:border-t-0 md:border-l border-white/5 space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest block">Event Snapshot</span>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight leading-tight mt-1">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h4>
                  <span className="text-xs text-torque-orange font-bold block mt-1">
                    {filteredPhotos[selectedPhotoIndex].date}
                  </span>
                </div>

                <p className="text-xs font-sans text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                  {filteredPhotos[selectedPhotoIndex].desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500 uppercase tracking-widest block">EXIF / Camera Metadata</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-carbon-900/60 p-2.5 border border-white/5 rounded">
                      <span className="text-slate-500 block text-xs uppercase">Body</span>
                      <strong className="text-white block truncate">{filteredPhotos[selectedPhotoIndex].camera}</strong>
                    </div>
                    <div className="bg-carbon-900/60 p-2.5 border border-white/5 rounded">
                      <span className="text-slate-500 block text-xs uppercase">Lens</span>
                      <strong className="text-white block truncate">{filteredPhotos[selectedPhotoIndex].lens}</strong>
                    </div>
                    <div className="bg-carbon-900/60 p-2.5 border border-white/5 rounded col-span-2">
                      <span className="text-slate-500 block text-xs uppercase">Settings</span>
                      <strong className="text-white block">{filteredPhotos[selectedPhotoIndex].exposure}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-2">
                <a 
                  href={filteredPhotos[selectedPhotoIndex].path} 
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 border border-white/10 hover:border-white hover:bg-white hover:text-carbon-900 transition-all text-center rounded font-bold uppercase tracking-wider text-xs"
                >
                  Open Original
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
