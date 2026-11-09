'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Mail, Wrench, Shield, Flag, Compass, Zap, Users, Briefcase } from 'lucide-react';
import { 
  chapterOfficers, facultyAdvisors, subsystemLeads, 
  managementTeam, bajaTeam, TeamMember 
} from '@/data/teamData';

const Linkedin = ({ size = 24, ...props }: React.ComponentPropsWithoutRef<'svg'> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamsTab() {
  const [activeSegment, setActiveSegment] = useState<"baja" | "officers" | "alumni">("baja");

  // Officers directory filter
  const [activeTab, setActiveTab] = useState<string>("all");

  // BAJA team subsystem filter
  const [bajaFilter, setBajaFilter] = useState<string>("all");

  const getFilteredMembers = () => {
    switch (activeTab) {
      case "officers": return chapterOfficers;
      case "faculty": return facultyAdvisors;
      case "technical": return subsystemLeads;
      case "management": return managementTeam;
      default: return [...chapterOfficers, ...facultyAdvisors, ...subsystemLeads, ...managementTeam];
    }
  };

  const getFilteredBajaCrew = () => {
    if (bajaFilter === "all") return bajaTeam;
    return bajaTeam.filter(m => m.subsystem.toLowerCase() === bajaFilter.toLowerCase());
  };

  return (
    <div className="animate-fadeIn py-16 px-4 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
          Collegiate Chapter Directory &amp; Racing Squad
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          TEAM &amp; ROSTER DIRECTORY
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Meet the 77 active student engineers, national BAJA B-26 vehicle designers, and elected chapter office bearers at IIITDM Kurnool (Established 2025).
        </p>
      </div>

      {/* Segment Navigation */}
      <div className="flex flex-wrap justify-center border-b border-white/10 pb-4 gap-2">
        <button
          onClick={() => setActiveSegment("baja")}
          className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeSegment === "baja" 
              ? "bg-torque-orange text-white shadow-lg shadow-torque-orange/20" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Flag size={14} />
          <span>BAJA Racing Team (B-26 Crew)</span>
        </button>

        <button
          onClick={() => setActiveSegment("officers")}
          className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeSegment === "officers" 
              ? "bg-apex-red text-white shadow-lg shadow-apex-red/20" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase size={14} />
          <span>Office Section &amp; Org Tree</span>
        </button>

        <button
          onClick={() => setActiveSegment("alumni")}
          className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeSegment === "alumni" 
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Compass size={14} />
          <span>Alumni Network (0)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SEGMENT 1: BAJA RACING TEAM (B-26 CAMPAIGN SQUAD)        */}
      {/* ======================================================== */}
      {activeSegment === "baja" && (
        <div className="space-y-12 animate-fadeIn">
          
          {/* BAJA Paddock Hero Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1E2025] via-[#16181D] to-[#0E1013] border border-torque-orange/30 rounded-2xl p-6 sm:p-10 glass-panel shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-torque-orange/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-torque-orange animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-torque-orange">
                    Official National Campaign Team // IIITDM Kurnool
                  </span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                  TEAM BLITZKRIEG // BAJA RACING CREW
                </h3>
                <p className="text-slate-300 font-sans text-xs sm:text-sm max-w-2xl leading-relaxed">
                  The specialized vehicle engineering and race operations squad fabricating, tuning, and defending the 
                  <strong className="text-white"> B-26 4WD All-Terrain Vehicle</strong> at national BAJA SAEINDIA 2026.
                </p>

                {/* Telemetry Pills */}
                <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px]">
                  <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-slate-300">
                    🏎️ Platform: <strong className="text-white font-bold">B-26 ATV</strong>
                  </span>
                  <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-slate-300">
                    ⚡ Powertrain: <strong className="text-torque-orange font-bold">Honda GX430T (425cc)</strong>
                  </span>
                  <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-slate-300">
                    🛡️ Chassis: <strong className="text-apex-red font-bold">AISI 4030 Chromoly</strong>
                  </span>
                  <span className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-slate-300">
                    👥 Squad: <strong className="text-emerald-400 font-bold">77 Active Crew</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/baja"
                  className="px-6 py-3 bg-torque-orange hover:bg-torque-orange/90 text-white font-mono text-xs uppercase font-bold rounded-lg transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-torque-orange/20 cursor-pointer"
                >
                  <Wrench size={14} />
                  <span>Launch 3D CAD Paddock</span>
                </Link>
                <a
                  href="/api/cad/download"
                  download="BAJA_B26_FULL_ASSEMBLY.STEP"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-mono text-xs uppercase font-bold rounded-lg transition-all text-center cursor-pointer"
                >
                  Download SolidWorks STEP
                </a>
              </div>
            </div>
          </div>

          {/* Subsystem Filter Navigation */}
          <div className="flex flex-wrap justify-center border-b border-white/10 pb-4 gap-2 font-mono text-xs">
            {[
              { key: "all", label: "All BAJA Crew" },
              { key: "powertrain", label: "Powertrain & Drivetrain" },
              { key: "suspension", label: "Suspension & Dynamics" },
              { key: "chassis", label: "Chassis & Spaceframe" },
              { key: "brakes", label: "Brakes & Steering" },
              { key: "electronics", label: "Electronics & Safety" },
              { key: "management", label: "Operations & Cost" }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setBajaFilter(f.key)}
                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all uppercase font-bold tracking-wider ${
                  bajaFilter === f.key 
                    ? "bg-torque-orange border-torque-orange text-white shadow-md shadow-torque-orange/20" 
                    : "bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* BAJA Crew Member Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredBajaCrew().map((member, idx) => (
              <div 
                key={idx}
                className="bg-titanium-700/40 border border-white/10 hover:border-torque-orange/50 rounded-xl p-5 flex flex-col justify-between space-y-4 glass-panel hover:scale-[1.02] transition-all duration-300 shadow-lg group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-sm uppercase tracking-wide border shadow-md ${member.accent}`}>
                      {member.initials}
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold border border-white/10 bg-black/40 text-slate-300">
                      {member.subsystem}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-black text-base text-white uppercase group-hover:text-torque-orange transition-colors">
                      {member.name}
                    </h4>
                    <span className="font-mono text-xs text-torque-orange block font-bold mt-0.5">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-slate-400 font-sans text-xs leading-relaxed pt-2 border-t border-white/5">
                    {member.responsibility}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px]">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                    title={`Contact ${member.name}`}
                  >
                    <Mail size={12} className="text-torque-orange" />
                    <span>{member.email.split('@')[0]}</span>
                  </a>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">● BAJA Core</span>
                </div>
              </div>
            ))}
          </div>

          {/* BAJA SAEINDIA Dynamic & Static Events Blueprint */}
          <div className="bg-[#1E2025]/40 border border-white/10 rounded-2xl p-8 glass-panel space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-torque-orange" />
                <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  BAJA SAEINDIA CAMPAIGN COMPETITION PHASES
                </h4>
              </div>
              <span className="font-mono text-xs text-slate-400">National Competition Format</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
              {/* Static Events */}
              <div className="bg-carbon-900/60 p-5 rounded-xl border border-white/5 space-y-3">
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-torque-orange block border-b border-white/5 pb-2">
                  PHASE 1: STATIC ENGINEERING DEFENSES
                </span>
                <ul className="space-y-2 font-sans text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-torque-orange font-bold font-mono">01.</span>
                    <span><strong className="text-white">Design Evaluation:</strong> Defending chassis stress FEA, suspension roll centers, and 4WD packaging before automotive judges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-torque-orange font-bold font-mono">02.</span>
                    <span><strong className="text-white">Cost &amp; Manufacturing Report:</strong> Defending complete Bill of Materials (BOM), machining cycles, and fabrication costs under ₹3,00,000.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-torque-orange font-bold font-mono">03.</span>
                    <span><strong className="text-white">Business &amp; Sales Presentation:</strong> Pitching high-volume ATV fleet commercialization and manufacturing viability to corporate OEM panelists.</span>
                  </li>
                </ul>
              </div>

              {/* Dynamic Events */}
              <div className="bg-carbon-900/60 p-5 rounded-xl border border-white/5 space-y-3">
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-apex-red block border-b border-white/5 pb-2">
                  PHASE 2: DYNAMIC ON-TRACK TRIALS
                </span>
                <ul className="space-y-2 font-sans text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-apex-red font-bold font-mono">01.</span>
                    <span><strong className="text-white">Acceleration &amp; Sledge Pull:</strong> 0 to 50.1 km/h straight-line sprint and continuous maximum drawbar pull testing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apex-red font-bold font-mono">02.</span>
                    <span><strong className="text-white">Maneuverability &amp; Rock Crawl:</strong> Navigating tight slaloms, deep mud trenches, log obstacles, and rough boulders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-apex-red font-bold font-mono">03.</span>
                    <span><strong className="text-white">4-Hour Endurance Race:</strong> Relentless 4-hour wheel-to-wheel race stress-testing weldment fatigue, thermal CVT limits, and driver stamina.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SEGMENT 2: OFFICE SECTION (OFFICERS & ORG TREE)          */}
      {/* ======================================================== */}
      {activeSegment === "officers" && (
        <div className="space-y-12 animate-fadeIn">

          {/* Chapter Office Header */}
          <div className="bg-[#1E2025]/50 border border-apex-red/30 rounded-2xl p-6 sm:p-8 glass-panel space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-apex-red/10 border border-apex-red/30 rounded-xl text-apex-red">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    OFFICE BEARERS // EXECUTIVE ROSTER
                  </h3>
                  <p className="text-slate-400 font-sans text-xs">
                    Official Collegiate Chapter Officers elected under SAEINDIA Constitution &amp; By-laws.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red rounded-full self-start md:self-auto font-bold uppercase tracking-wider">
                ● 8 Chapter Officers
              </span>
            </div>

            {/* Officers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {chapterOfficers.map((officer, idx) => {
                // Color badges depending on seniority
                const isTop2 = idx < 2;
                const isExec = idx < 4;
                const borderTone = isTop2 
                  ? "border-apex-red/50 hover:border-apex-red group-hover:text-apex-red" 
                  : isExec 
                  ? "border-torque-orange/50 hover:border-torque-orange group-hover:text-torque-orange" 
                  : "border-lift-blue/40 hover:border-lift-blue group-hover:text-lift-blue";

                const badgeBg = isTop2
                  ? "bg-apex-red/15 text-apex-red border-apex-red/30"
                  : isExec
                  ? "bg-torque-orange/15 text-torque-orange border-torque-orange/30"
                  : "bg-lift-blue/15 text-lift-blue border-lift-blue/30";

                return (
                  <div
                    key={idx}
                    className={`bg-titanium-800/60 border rounded-xl p-5 space-y-3 glass-panel transition-all hover:scale-[1.02] duration-300 group ${borderTone}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-sm uppercase tracking-wide border shadow-md ${badgeBg}`}>
                        {officer.initials}
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold border ${badgeBg}`}>
                        {officer.role.includes("President") ? "E-Board" : officer.role.includes("Treasurer") || officer.role.includes("Secretary") ? "E-Board" : "Chair"}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-base text-white uppercase group-hover:text-white transition-colors">
                        {officer.name}
                      </h4>
                      <span className={`font-mono text-xs block font-bold mt-0.5 ${
                        isTop2 ? "text-apex-red" : isExec ? "text-torque-orange" : "text-lift-blue"
                      }`}>
                        {officer.role}
                      </span>
                    </div>

                    <div className="border-t border-white/5 pt-3 flex items-center justify-between font-mono text-[10px]">
                      <a
                        href={`mailto:${officer.email}`}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                        title={`Email ${officer.name}`}
                      >
                        <Mail size={12} className="text-slate-400 group-hover:text-white" />
                        <span>{officer.email?.split('@')[0]}</span>
                      </a>
                      <span className="text-slate-500 font-bold uppercase">SAEINDIA</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Org Tree */}
          <div className="bg-[#1E2025]/30 border border-white/10 rounded-xl p-6 sm:p-8 glass-panel space-y-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-4 right-4 font-mono text-xs text-slate-500 uppercase tracking-widest hidden sm:block">
              Org Hierarchy v26.0
            </div>
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <Award size={16} className="text-apex-red" />
              INTERACTIVE ORGANIZATIONAL TREE
            </h3>

            <div className="space-y-6 font-mono text-xs max-w-4xl mx-auto">
              {/* Faculty Advisors */}
              <div className="flex flex-col items-center">
                <div className="bg-[#1E2025] border border-emerald-500/40 p-4 rounded text-center w-full max-w-sm shadow-md transition-all hover:border-emerald-400">
                  <span className="text-xs text-emerald-400 uppercase tracking-widest block font-bold">Faculty Advisors</span>
                  <strong className="text-white text-xs block mt-1">Dr. S. Anand Kumar &amp; Dr. Pankaj Kaushik</strong>
                  <span className="text-slate-500 text-xs block mt-0.5 font-sans">Mechanical Engineering Department</span>
                </div>
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              {/* President & Vice President */}
              <div className="flex flex-col items-center">
                <div className="bg-[#1E2025] border border-apex-red/50 p-4 rounded text-center w-full max-w-md shadow-md transition-all hover:border-apex-red">
                  <span className="text-xs text-apex-red uppercase tracking-widest block font-bold">Executive Board // Top Leadership</span>
                  <div className="mt-1 flex flex-col sm:flex-row justify-center items-center gap-2 text-white text-xs">
                    <span><strong>Harshit Mishra</strong> <span className="text-apex-red">(President)</span></span>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <span><strong>Ramakrishna Sen</strong> <span className="text-torque-orange">(Vice President)</span></span>
                  </div>
                  <span className="text-slate-500 text-xs block mt-1 font-sans">Strategic Chapter Governance &amp; Executive Approvals</span>
                </div>
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              {/* Treasurer & Secretary */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto relative">
                <div className="hidden md:block absolute left-1/4 right-1/4 top-0 h-0.5 bg-white/10"></div>
                
                <div className="bg-[#1E2025] border border-torque-orange/40 p-4 rounded text-center shadow-md transition-all hover:border-torque-orange">
                  <span className="text-xs text-torque-orange uppercase tracking-widest block font-bold">Finance &amp; Accounts</span>
                  <strong className="text-white text-xs block mt-1">Vineet Sharma</strong>
                  <span className="text-slate-400 text-xs block mt-0.5 font-sans">Treasurer // Budget Allocation</span>
                </div>

                <div className="bg-[#1E2025] border border-torque-orange/40 p-4 rounded text-center shadow-md transition-all hover:border-torque-orange">
                  <span className="text-xs text-torque-orange uppercase tracking-widest block font-bold">Administration &amp; Records</span>
                  <strong className="text-white text-xs block mt-1">Pranjal Mishra</strong>
                  <span className="text-slate-400 text-xs block mt-0.5 font-sans">Secretary // Documentation</span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              {/* Committee Chairs: Membership, Publicity, Reception, Program */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-[#1E2025]/60 border border-lift-blue/40 p-3.5 rounded text-center transition-all hover:border-lift-blue">
                  <span className="text-[10px] text-lift-blue uppercase tracking-widest block font-bold">Membership</span>
                  <strong className="text-white text-xs block mt-0.5">Shanu Jha</strong>
                  <span className="text-slate-500 text-[10px] block mt-0.5 font-sans">Member Registration</span>
                </div>

                <div className="bg-[#1E2025]/60 border border-lift-blue/40 p-3.5 rounded text-center transition-all hover:border-lift-blue">
                  <span className="text-[10px] text-lift-blue uppercase tracking-widest block font-bold">Publicity</span>
                  <strong className="text-white text-xs block mt-0.5">Jatin Sharma</strong>
                  <span className="text-slate-500 text-[10px] block mt-0.5 font-sans">Media &amp; Campaigns</span>
                </div>

                <div className="bg-[#1E2025]/60 border border-lift-blue/40 p-3.5 rounded text-center transition-all hover:border-lift-blue">
                  <span className="text-[10px] text-lift-blue uppercase tracking-widest block font-bold">Reception</span>
                  <strong className="text-white text-xs block mt-0.5">Prashant Kumar</strong>
                  <span className="text-slate-500 text-[10px] block mt-0.5 font-sans">Guest &amp; Event Host</span>
                </div>

                <div className="bg-[#1E2025]/60 border border-lift-blue/40 p-3.5 rounded text-center transition-all hover:border-lift-blue">
                  <span className="text-[10px] text-lift-blue uppercase tracking-widest block font-bold">Program</span>
                  <strong className="text-white text-xs block mt-0.5">Karthikeya</strong>
                  <span className="text-slate-500 text-[10px] block mt-0.5 font-sans">Workshops &amp; AWIM</span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              {/* Subsystems & Management Division */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-[#1E2025]/50 border border-white/10 p-5 rounded-lg space-y-3">
                  <span className="font-heading font-extrabold text-xs text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-1">
                    ENGINEERING SUBSYSTEM LEADS
                  </span>
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Chassis &amp; Structure</span>
                      <strong className="text-white font-mono font-bold uppercase">V. Akash</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Suspension &amp; Geometry</span>
                      <strong className="text-white font-mono font-bold uppercase">Vineet Sharma</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Drivetrain &amp; Transmission</span>
                      <strong className="text-white font-mono font-bold uppercase">Ramakrishna Sen</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Brakes &amp; Steering</span>
                      <strong className="text-white font-mono font-bold uppercase">Samarth Sakhale</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Electrical &amp; DAQ</span>
                      <strong className="text-white font-mono font-bold uppercase">Sneha Nair</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E2025]/50 border border-white/10 p-5 rounded-lg space-y-3">
                  <span className="font-heading font-extrabold text-xs text-slate-400 uppercase tracking-widest block border-b border-white/5 pb-1">
                    OPERATIONS &amp; LOGISTICS CREW
                  </span>
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Sponsors &amp; CSR Outreach</span>
                      <strong className="text-white font-mono font-bold uppercase">Priya Patel</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Finances &amp; Tool Inventory</span>
                      <strong className="text-white font-mono font-bold uppercase">Aman Sharma</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>PR, Media &amp; Graphic Design</span>
                      <strong className="text-white font-mono font-bold uppercase">Rohan Verma</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>AWIM School Outreach</span>
                      <strong className="text-white font-mono font-bold uppercase">Sneha Nair</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Directory Filter Buttons */}
          <div className="flex flex-wrap justify-center border-b border-white/10 pb-4 gap-2 font-mono text-xs">
            {[
              { key: "all", label: "All Directory" },
              { key: "officers", label: "Chapter Officers (8)" },
              { key: "faculty", label: "Faculty Supervisors (2)" },
              { key: "technical", label: "Engineering Leads (5)" },
              { key: "management", label: "Operations Team (3)" }
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveTab(btn.key)}
                className={`px-4 py-2 border rounded-lg cursor-pointer transition-all uppercase font-bold tracking-wider ${
                  activeTab === btn.key 
                    ? "bg-apex-red border-apex-red text-white" 
                    : "bg-transparent border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredMembers().map((member, index) => (
              <div key={index} className="bg-titanium-700/50 border border-white/10 rounded-lg p-5 flex flex-col justify-between space-y-4 glass-panel hover:border-white/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-heading font-black text-sm uppercase tracking-wide border ${
                      member.subteam === "Academic Advisory" 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : member.subteam === "Chapter Officers"
                        ? "bg-apex-red/10 border-apex-red/30 text-apex-red"
                        : member.subteam === "Chassis" || member.subteam === "Powertrain" || member.subteam === "Suspension" || member.subteam === "Brakes" || member.subteam === "Electrical"
                        ? "bg-torque-orange/10 border-torque-orange/30 text-torque-orange"
                        : "bg-lift-blue/10 border-lift-blue/30 text-lift-blue"
                    }`}>
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white uppercase">{member.name}</h4>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{member.subteam}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5 pt-2 font-mono text-xs">
                    <span className="text-slate-300 block font-bold">{member.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-1.5 bg-carbon-900 border border-white/5 text-slate-400 hover:text-white rounded hover:border-white/15 transition-all text-xs"
                      title="Send Email"
                    >
                      <Mail size={13} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-1.5 bg-carbon-900 border border-white/5 text-slate-400 hover:text-white rounded hover:border-white/15 transition-all text-xs"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin size={13} />
                    </a>
                  )}
                  <span className="ml-auto text-[10px] text-slate-500 uppercase tracking-widest font-mono">SAEINDIA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SEGMENT 3: ALUMNI NETWORK (0 — INCEPTION ERA)            */}
      {/* ======================================================== */}
      {activeSegment === "alumni" && (
        <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
          {/* Key Inception Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Graduated Alumni", val: "0", color: "text-torque-orange", desc: "Inaugural cohort in training" },
              { label: "Inception Year", val: "2025", color: "text-white", desc: "Chartered collegiate chapter" },
              { label: "Active Members", val: "77", color: "text-apex-red", desc: "Currently building B-26" },
              { label: "First Graduating Class", val: "2027/28", color: "text-emerald-400", desc: "Upcoming inaugural alumni" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#1E2025]/50 border border-white/5 p-6 rounded-lg text-center backdrop-blur-sm">
                <span className={`font-heading font-black text-3xl lg:text-4xl ${stat.color} block`}>{stat.val}</span>
                <span className="font-mono text-xs text-white block mt-2 uppercase tracking-wider">{stat.label}</span>
                <span className="font-sans text-[11px] text-slate-400 block mt-1">{stat.desc}</span>
              </div>
            ))}
          </div>

          {/* Inception Statement Banner */}
          <div className="bg-[#1E2025]/60 border border-torque-orange/30 rounded-2xl p-8 sm:p-12 text-center glass-panel space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-torque-orange/15 border border-torque-orange/30 text-torque-orange flex items-center justify-center mx-auto text-2xl font-bold font-mono">
              0
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <span className="px-3 py-1 bg-torque-orange/10 border border-torque-orange/30 text-torque-orange font-mono text-[10px] uppercase font-bold tracking-widest rounded">
                Foundational Era
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
                Zero Alumni Network — 2025 Chapter Inception
              </h3>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                The SAEINDIA Collegiate Chapter at IIITDM Kurnool was established in 2025. Our foundational batch of 77 active student members is currently fabricating our flagship B-26 BAJA vehicle and executing national design reviews.
              </p>
              <p className="text-slate-400 font-mono text-xs">
                As a young chapter, our first official alumni network will graduate in 2027–2028.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveSegment("baja")}
                className="px-6 py-3 bg-torque-orange hover:bg-torque-orange/90 text-white font-mono text-xs uppercase font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-torque-orange/20 inline-flex items-center gap-2"
              >
                <span>View BAJA Racing Team (B-26 Crew)</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
