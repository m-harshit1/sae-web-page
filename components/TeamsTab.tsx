'use client';

import React, { useState } from 'react';
import { 
  Award, Search, Building2, Briefcase, Calendar, 
  CheckCircle2, Mail 
} from 'lucide-react';
import { 
  facultyAdvisors, executiveBoard, coreLeadership, subsystemLeads, 
  managementTeam, alumniData, TeamMember, Alumnus 
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

  // Alumni directory state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [batchFilter, setBatchFilter] = useState<string>("All");

  // Mentorship booking states
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumnus | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingType, setBookingType] = useState<string>("Career Guidance");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const getFilteredMembers = () => {
    switch (activeTab) {
      case "faculty": return facultyAdvisors;
      case "leadership": return [...executiveBoard, ...coreLeadership];
      case "technical": return subsystemLeads;
      case "management": return managementTeam;
      default: return [...facultyAdvisors, ...executiveBoard, ...coreLeadership, ...subsystemLeads, ...managementTeam];
    }
  };

  const getFilteredAlumni = () => {
    return alumniData.filter(alumnus => {
      const matchQuery = alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumnus.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumnus.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBatch = batchFilter === "All" || alumnus.batch === batchFilter;
      return matchQuery && matchBatch;
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !selectedAlumnus) return;

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumnusName: selectedAlumnus.name,
          bookingDate,
          bookingType
        })
      });
      if (res.ok) {
        setBookingSuccess(true);
      } else {
        alert('Failed to register booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting mentorship booking:', error);
      alert('Network error. Check server api status.');
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
          SAEINDIA DIRECTORY &amp; NETWORK
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Meet the active officers running our vehicle designs or trace our alumni legacy working in premium global mobility firms.
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
          Alumni Network
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
        /* ALUMNI SEGMENT */
        <div className="space-y-12 animate-fadeIn">
          {/* Alumni Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Legacy Members", val: "78+", color: "text-white" },
              { label: "Higher Studies (MS/PhD)", val: "18 Members", color: "text-apex-red" },
              { label: "Industry Placements", val: "45 Members", color: "text-torque-orange" },
              { label: "Startups Founded", val: "3 Founders", color: "text-emerald-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#1E2025]/50 border border-white/5 p-6 rounded-lg text-center backdrop-blur-sm">
                <span className={`font-heading font-black text-3xl lg:text-4xl ${stat.color} block`}>{stat.val}</span>
                <span className="font-mono text-xs text-slate-400 block mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Alumni Success Wall */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                🏆 ALUMNI SUCCESS WALL &amp; TESTIMONIALS
              </h3>
              <span className="font-mono text-xs text-[#00828A] uppercase tracking-widest font-bold">Industry Legacies</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Rahul Deshmukh",
                  role: "Battery Design Engineer",
                  company: "Tesla",
                  batch: "Class of 2022",
                  quote: "Designing chassis structures and powertrain integration at IIITDM Kurnool laid the absolute foundation for my battery pack thermal design work at Tesla.",
                  accent: "border-red-500/20 hover:border-red-500/40 hover:shadow-red-500/5",
                  logoBg: "bg-red-500/10 text-red-500",
                  initials: "RD"
                },
                {
                  name: "Shreya Sen",
                  role: "Junior Aerodynamicist",
                  company: "Mercedes AMG F1",
                  batch: "Class of 2024",
                  quote: "Defending our CFD surface flow maps and wing profiles before national competition judges was the defining challenge that opened my path to Brackley.",
                  accent: "border-teal-500/20 hover:border-teal-500/40 hover:shadow-teal-500/5",
                  logoBg: "bg-teal-500/10 text-teal-400",
                  initials: "SS"
                },
                {
                  name: "Meera Nair",
                  role: "Aerodynamics Analyst",
                  company: "Boeing",
                  batch: "Class of 2023",
                  quote: "Executing mesh refinement loops on BAJA body panel drag coefficients gave me the physical intuition required to evaluate actual wing lift and control surfaces.",
                  accent: "border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/5",
                  logoBg: "bg-blue-500/10 text-blue-400",
                  initials: "MN"
                },
                {
                  name: "Abhishek Roy",
                  role: "Vehicle Dynamics Engineer",
                  company: "Ford Performance",
                  batch: "Class of 2021",
                  quote: "From manual chassis jig welding in the Kurnool workshop to running dynamic shaker validation tables, my student team days are mirrored in my active performance motorsport role.",
                  accent: "border-blue-600/20 hover:border-blue-600/40 hover:shadow-blue-600/5",
                  logoBg: "bg-blue-600/10 text-blue-500",
                  initials: "AR"
                },
                {
                  name: "Varun Mehta",
                  role: "BMS Developer",
                  company: "Mahindra Electric",
                  batch: "Class of 2023",
                  quote: "Calibrating custom telemetry firmware node CAN-bus protocols was the best training playground for debugging real automotive grade battery management systems.",
                  accent: "border-orange-500/20 hover:border-orange-500/40 hover:shadow-orange-500/5",
                  logoBg: "bg-orange-500/10 text-orange-500",
                  initials: "VM"
                },
                {
                  name: "Aditi Joshi",
                  role: "Chassis Design Engineer",
                  company: "Ather Energy",
                  batch: "Class of 2020",
                  quote: "Working within tight structural design guidelines and weight budgets for our BAJA ATV taught me the exact engineering trade-offs required in electric scooter frame designs.",
                  accent: "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5",
                  logoBg: "bg-emerald-500/10 text-emerald-400",
                  initials: "AJ"
                }
              ].map((alumnus, i) => (
                <div 
                  key={i} 
                  className={`bg-[#1E2025]/40 border ${alumnus.accent} rounded-xl p-5 flex flex-col justify-between space-y-4 glass-panel hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-black text-xs border border-white/5 ${alumnus.logoBg}`}>
                          {alumnus.initials}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xs text-white uppercase">{alumnus.name}</h4>
                          <span className="font-mono text-[10px] text-slate-400 block">{alumnus.batch}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold border border-white/5 ${alumnus.logoBg}`}>
                        {alumnus.company}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 font-sans text-xs italic leading-relaxed pt-2">
                      &ldquo;{alumnus.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div className="border-t border-white/5 pt-3 font-mono text-[9px] text-slate-500 uppercase flex justify-between items-center">
                    <span>{alumnus.role}</span>
                    <span className="text-[#00828A]">Verified Alumnus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Directory Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-titanium-700/50 border border-white/10 rounded-lg p-5 flex flex-col sm:flex-row gap-4 justify-between items-center glass-panel">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, company, or role..."
                    className="w-full bg-carbon-900 border border-white/10 rounded p-3 pl-10 font-mono text-xs text-white focus:outline-none focus:border-apex-red transition-all font-semibold"
                  />
                </div>

                <div className="flex gap-3 w-full sm:w-auto font-mono text-xs">
                  <select 
                    value={batchFilter}
                    onChange={(e) => setBatchFilter(e.target.value)}
                    className="w-full bg-carbon-900 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-apex-red transition-all cursor-pointer font-bold"
                  >
                    <option value="All">All Batches</option>
                    <option value="2020">Class of 2020</option>
                    <option value="2021">Class of 2021</option>
                    <option value="2022">Class of 2022</option>
                    <option value="2023">Class of 2023</option>
                    <option value="2024">Class of 2024</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getFilteredAlumni().map((alumnus, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-lg p-5 flex flex-col justify-between space-y-4 glass-panel hover:border-white/20 transition-all duration-300 ${
                      selectedAlumnus?.name === alumnus.name ? "bg-apex-red/5 border-apex-red" : "bg-titanium-700/40 border-white/10"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-white uppercase">{alumnus.name}</h4>
                          <span className="font-mono text-xs text-slate-400">Class of {alumnus.batch} | {alumnus.team}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-lift-blue/10 border border-lift-blue/20 text-lift-blue rounded font-mono text-xs">
                          Verified
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                          <Building2 size={13} className="text-slate-500" />
                          <span>{alumnus.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                          <Briefcase size={13} className="text-slate-500" />
                          <span>{alumnus.position}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => {
                          setSelectedAlumnus(alumnus);
                          setBookingSuccess(false);
                        }}
                        className="w-full py-2 border border-white/10 hover:border-apex-red hover:bg-apex-red hover:text-white transition-all text-center rounded font-mono text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer"
                      >
                        Select for Mentorship
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentorship Booking Form Column */}
            <div className="lg:col-span-5 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between glass-panel space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                    MENTORSHIP BOOKING SYSTEM
                  </h3>
                  <span className="font-mono text-xs text-slate-400">Schedule Session</span>
                </div>

                {selectedAlumnus ? (
                  <div className="space-y-6">
                    <div className="bg-carbon-900 p-4 border border-white/5 rounded-lg space-y-2 font-mono text-xs text-slate-300">
                      <span className="text-xs text-slate-500 uppercase block">Selected Alumnus Mentor</span>
                      <strong className="text-white block uppercase text-sm">{selectedAlumnus.name}</strong>
                      <span className="block">{selectedAlumnus.position} at {selectedAlumnus.company}</span>
                    </div>

                    {!bookingSuccess ? (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 font-mono text-xs">
                        <div className="space-y-1.5">
                          <label className="text-slate-300 block">SESSION TYPE</label>
                          <select 
                            value={bookingType}
                            onChange={(e) => setBookingType(e.target.value)}
                            className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red"
                          >
                            <option value="Resume Review">Resume &amp; Portfolio Review</option>
                            <option value="Mock Interview">Mock Engineering Board Interview</option>
                            <option value="Career Guidance">Automotive/EV Career Guidance</option>
                            <option value="Technical Guidance">FEA / SolidWorks Technical Mentorship</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-300 block">PREFERRED DATE</label>
                          <input 
                            type="date" 
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red cursor-pointer"
                          />
                        </div>


                        <button 
                          type="submit"
                          className="w-full bg-apex-red hover:bg-apex-red/90 text-white font-bold uppercase py-4 rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar size={14} />
                          <span>Confirm Appointment Request</span>
                        </button>
                      </form>
                    ) : (
                      <div className="p-6 text-center bg-[#10b981]/15 border border-emerald-500/30 text-emerald-400 rounded-lg space-y-3 font-mono text-xs animate-fadeIn">
                        <CheckCircle2 size={24} className="mx-auto" />
                        <strong className="block uppercase text-white">Booking Scheduled!</strong>
                        <p className="text-slate-400 font-sans leading-relaxed text-xs max-w-xs mx-auto">
                          Your mentorship slot on <strong className="text-white font-mono">{bookingDate}</strong> with <strong className="text-white font-mono">{selectedAlumnus.name}</strong> has been booked. Check your inbox for invitation coordinates.
                        </p>
                        <button 
                          onClick={() => setBookingSuccess(false)}
                          className="text-xs text-apex-red underline cursor-pointer mt-2"
                        >
                          Reschedule Session
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-carbon-900/40 border border-white/5 rounded-lg space-y-3 font-sans text-xs text-slate-400">
                    <span className="font-mono text-slate-500 uppercase tracking-widest block font-bold">No Alumnus Selected</span>
                    Select a verified legacy member card from the directory list on the left to activate the mentorship scheduling HUD.
                  </div>
                )}
              </div>

              <div className="bg-carbon-900/60 p-3.5 border border-white/5 font-mono text-xs text-slate-400 rounded-lg">
                <span className="font-bold text-white uppercase block mb-1">Chapter Alumni Relations</span>
                Booking confirmations are direct-synced to calendars. Mentors usually respond within 48 hours.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
