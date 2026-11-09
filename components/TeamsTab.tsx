'use client';

import React, { useState } from 'react';
import { Award, Mail } from 'lucide-react';
import { 
  facultyAdvisors, executiveBoard, coreLeadership, subsystemLeads, 
  managementTeam, TeamMember 
} from '@/data/teamData';

const Linkedin = ({ size = 24, ...props }: React.ComponentPropsWithoutRef<'svg'> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamsTab() {
  const [activeSegment, setActiveSegment] = useState<"officers" | "alumni">("officers");

  // Officers directory state
  const [activeTab, setActiveTab] = useState<string>("all");

  const getFilteredMembers = () => {
    switch (activeTab) {
      case "faculty": return facultyAdvisors;
      case "leadership": return [...executiveBoard, ...coreLeadership];
      case "technical": return subsystemLeads;
      case "management": return managementTeam;
      default: return [...facultyAdvisors, ...executiveBoard, ...coreLeadership, ...subsystemLeads, ...managementTeam];
    }
  };

  return (
    <div className="animate-fadeIn py-16 px-4 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
          Chapter Directory
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          SAEINDIA DIRECTORY &amp; ROSTER
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Meet the 77 active student engineers and executive officers designing and running our vehicle campaigns at IIITDM Kurnool (Established 2025).
        </p>
      </div>

      {/* Segment Navigation */}
      <div className="flex justify-center border-b border-white/10 pb-4 gap-2">
        <button
          onClick={() => setActiveSegment("officers")}
          className={`px-5 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
            activeSegment === "officers" ? "bg-apex-red text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Active Officers &amp; Org Tree
        </button>
        <button
          onClick={() => setActiveSegment("alumni")}
          className={`px-5 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
            activeSegment === "alumni" ? "bg-torque-orange text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Alumni Network (0)
        </button>
      </div>

      {activeSegment === "officers" ? (
        /* ACTIVE OFFICERS & ORG HIERARCHY */
        <div className="space-y-12 animate-fadeIn">
          {/* Org Tree */}
          <div className="bg-[#1E2025]/30 border border-white/10 rounded-xl p-8 glass-panel space-y-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-4 right-4 font-mono text-xs text-slate-500 uppercase tracking-widest">
              Org Hierarchy v26.0
            </div>
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <Award size={16} className="text-apex-red" />
              INTERACTIVE ORGANIZATIONAL TREE
            </h3>

            <div className="space-y-6 font-mono text-xs max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-[#1E2025] border border-emerald-500/40 p-4 rounded text-center w-full max-w-sm shadow-md transition-all hover:border-emerald-400">
                  <span className="text-xs text-emerald-400 uppercase tracking-widest block font-bold">Faculty Advisors</span>
                  <strong className="text-white text-xs block mt-1">Dr. S. Anand Kumar &amp; Dr. Pankaj Kaushik</strong>
                  <span className="text-slate-500 text-xs block mt-0.5 font-sans">Mechanical Engineering Department</span>
                </div>
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-[#1E2025] border border-apex-red/40 p-4 rounded text-center w-full max-w-sm shadow-md transition-all hover:border-apex-red">
                  <span className="text-xs text-apex-red uppercase tracking-widest block font-bold">Executive Board</span>
                  <strong className="text-white text-xs block mt-1">Harshit Kumar Mishra <span className="text-slate-500">(Pres)</span> &amp; N M Roshanth <span className="text-slate-500">(VP)</span></strong>
                  <span className="text-slate-500 text-xs block mt-0.5 font-sans">Chapter Operations &amp; Strategy</span>
                </div>
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto relative">
                <div className="hidden md:block absolute left-1/4 right-1/4 top-0 h-0.5 bg-white/10"></div>
                
                <div className="bg-[#1E2025] border border-torque-orange/40 p-4 rounded text-center shadow-md transition-all hover:border-torque-orange">
                  <span className="text-xs text-torque-orange uppercase tracking-widest block font-bold">Technical Division</span>
                  <strong className="text-white text-xs block mt-1">Vineet Sharma</strong>
                  <span className="text-slate-500 text-xs block mt-0.5 font-sans">Technical Head / Vehicle Dynamics</span>
                </div>

                <div className="bg-[#1E2025] border border-lift-blue/40 p-4 rounded text-center shadow-md transition-all hover:border-lift-blue">
                  <span className="text-xs text-lift-blue uppercase tracking-widest block font-bold">Operations &amp; Finance</span>
                  <strong className="text-white text-xs block mt-1">Priya Patel</strong>
                  <span className="text-slate-500 text-xs block mt-0.5 font-sans">Sponsorships &amp; Public Relations</span>
                </div>
              </div>

              <div className="hidden md:flex justify-between max-w-3xl mx-auto px-16">
                <div className="w-0.5 h-6 bg-white/10"></div>
                <div className="w-0.5 h-6 bg-white/10"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                      <span>Drivetrain &amp; Trans.</span>
                      <strong className="text-white font-mono font-bold uppercase">N M Roshanth</strong>
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
                    MANAGEMENT &amp; COMPLIANCE LEADS
                  </span>
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Sponsors &amp; CSR Outreach</span>
                      <strong className="text-white font-mono font-bold uppercase">Priya Patel</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Finances &amp; Billing</span>
                      <strong className="text-white font-mono font-bold uppercase">Aman Sharma</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>PR, Media &amp; Design</span>
                      <strong className="text-white font-mono font-bold uppercase">Rohan Verma</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>AWIM Program Coordinator</span>
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
              { key: "faculty", label: "Faculty Supervisors" },
              { key: "leadership", label: "Executive Leadership" },
              { key: "technical", label: "Engineering Leads" },
              { key: "management", label: "Management Team" }
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveTab(btn.key)}
                className={`px-4 py-2 border rounded cursor-pointer transition-all uppercase font-bold tracking-wider ${
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredMembers().map((member, index) => (
              <div key={index} className="bg-titanium-700/50 border border-white/10 rounded-lg p-6 flex flex-col justify-between space-y-4 glass-panel hover:border-white/20 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-heading font-black text-sm uppercase tracking-wide border ${
                      member.subteam === "Academic Advisory" 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                        : member.subteam === "Executive Board"
                        ? "bg-apex-red/10 border-apex-red/30 text-apex-red"
                        : member.subteam === "Core Tech Leadership"
                        ? "bg-torque-orange/10 border-torque-orange/30 text-torque-orange"
                        : "bg-lift-blue/10 border-lift-blue/30 text-lift-blue"
                    }`}>
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white uppercase">{member.name}</h4>
                      <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">{member.subteam}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">Role Assignment</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed font-semibold">{member.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-white/5 pt-4 font-mono text-xs">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2 bg-carbon-900 border border-white/5 text-slate-400 hover:text-white rounded hover:border-white/15 transition-all"
                      title="Send Email"
                    >
                      <Mail size={14} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 bg-carbon-900 border border-white/5 text-slate-400 hover:text-white rounded hover:border-white/15 transition-all"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  <span className="ml-auto text-xs text-slate-500 uppercase tracking-widest">Active Member</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ALUMNI SEGMENT — ZERO ALUMNI NETWORK (2025 CHAPTER INCEPTION) */
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
                onClick={() => setActiveSegment("officers")}
                className="px-6 py-3 bg-apex-red hover:bg-apex-red/90 text-white font-mono text-xs uppercase font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-apex-red/20 inline-flex items-center gap-2"
              >
                <span>Explore Active Student Leadership &amp; Org Hierarchy</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
