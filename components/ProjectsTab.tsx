'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, CheckCircle, Flame, Activity, Download
} from 'lucide-react';
import { achievementsData } from '@/data/achievements';
import dynamic from 'next/dynamic';

const VehicleView3D = dynamic(() => import('./VehicleView3D'), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-[500px] md:h-[650px] bg-[#0D0E10] border border-[#1E2025] rounded-xl flex items-center justify-center">
      <div className="text-apex-red font-mono animate-pulse flex flex-col items-center">
        <Activity size={32} className="mb-2" />
        <span>Waking up WebGL Graphics Pipeline...</span>
      </div>
    </div>
  )
});

interface SpecGridItem {
  label: string;
  val: string;
}

interface HotspotSpec {
  title: string;
  accent: string;
  stats: SpecGridItem[];
}

const specHotspots: Record<string, HotspotSpec> = {
  chassis: {
    title: "Chassis & Roll Cage",
    accent: "text-apex-red border-apex-red/30",
    stats: [
      { label: "Material", val: "Chromoly Steel (AISI 4030 & 1013)" },
      { label: "Frame Type", val: "Tubular Spaceframe Roll Cage" },
      { label: "Max Length", val: "2000 mm" },
      { label: "Max Width", val: "700 mm" },
      { label: "Weldment Safety Factor", val: "2.1 (30 kN Front Brace Load)" }
    ]
  },
  powertrain: {
    title: "Powertrain & Drivetrain",
    accent: "text-torque-orange border-torque-orange/30",
    stats: [
      { label: "Engine Model", val: "Honda GX430T (425cc)" },
      { label: "Peak Power", val: "12.87 HP (9.6 kW) @ 3600 RPM" },
      { label: "Peak Engine Torque", val: "27.7 Nm @ 2500 RPM" },
      { label: "Transmission", val: "CVT (3:1 to 0.43:1 Ratio)" },
      { label: "Drive Type", val: "4WD (4:1 Final Drive)" }
    ]
  },
  suspension: {
    title: "Suspension & Kinematics",
    accent: "text-lift-blue border-lift-blue/30",
    stats: [
      { label: "Configuration", val: "Front & Rear Double Wishbone" },
      { label: "Dampers", val: "Ohlins Custom 3-Way Adjustable" },
      { label: "Wheel Travel", val: "±100 mm" },
      { label: "Spring Rates", val: "Front: 28 N/mm | Rear: 29 N/mm" },
      { label: "Optimization", val: "Multi-body dynamics (ADAMS/Car)" }
    ]
  },
  brakes: {
    title: "Brakes & Steering",
    accent: "text-emerald-400 border-emerald-400/30",
    stats: [
      { label: "Configuration", val: "Hydraulic Dual Master-Cylinder" },
      { label: "Brake Bias", val: "78:22 (Front:Rear)" },
      { label: "Deceleration", val: "~1g (7.848 m/s²)" },
      { label: "Rotor Material", val: "SS410 Stainless Steel" },
      { label: "Steering", val: "Custom Rack & Pinion" }
    ]
  }
};

const dynoData = [
  { rpm: 1200, hp: 3.2,  torque: 19.0 },
  { rpm: 1600, hp: 5.1,  torque: 22.5 },
  { rpm: 2000, hp: 7.4,  torque: 26.2 },
  { rpm: 2400, hp: 9.4,  torque: 27.6 },
  { rpm: 2500, hp: 9.9,  torque: 27.7 }, // Peak Torque
  { rpm: 2800, hp: 11.0, torque: 27.4 },
  { rpm: 3200, hp: 12.1, torque: 26.5 },
  { rpm: 3600, hp: 12.87, torque: 23.9 }, // Peak Power
];

export default function ProjectsTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<string>("baja");
  const [activeSubTab, setActiveSubTab] = useState<string>("3d_view");

  // Copy state
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopySpec = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // BAJA specifications hotspot state
  const [activeHotspot, setActiveHotspot] = useState<string>("chassis");

  // CVT Speed Calculator states
  const [cvtEngineRpm, setCvtEngineRpm] = useState<number>(3000);
  const [cvtRatio, setCvtRatio] = useState<number>(0.9);
  const [cvtFinalDrive, setCvtFinalDrive] = useState<number>(4.0);
  const [cvtTireDiameter, setCvtTireDiameter] = useState<number>(23.0);

  // Achievements State
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  // CVT dynamic speed and torque computations
  const lowerPoint = [...dynoData].reverse().find(p => p.rpm <= cvtEngineRpm) || dynoData[0];
  const upperPoint = dynoData.find(p => p.rpm >= cvtEngineRpm) || dynoData[dynoData.length - 1];
  const interpolatedTorque = lowerPoint.rpm === upperPoint.rpm 
    ? lowerPoint.torque 
    : lowerPoint.torque + ((cvtEngineRpm - lowerPoint.rpm) / (upperPoint.rpm - lowerPoint.rpm)) * (upperPoint.torque - lowerPoint.torque);

  const wheelSpeedRpm = cvtEngineRpm / (cvtRatio * cvtFinalDrive);
  const tireCircumferenceMeters = cvtTireDiameter * Math.PI * 0.0254;
  const vehicleSpeedKmh = (wheelSpeedRpm * tireCircumferenceMeters * 60) / 1000;
  const totalReduction = cvtRatio * cvtFinalDrive;
  const wheelTorqueNm = interpolatedTorque * totalReduction * 0.90; // 90% system efficiency

  const currentSpec = specHotspots[activeHotspot as keyof typeof specHotspots];

  const currentAchievement = achievementsData[selectedYear];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Title */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs uppercase tracking-widest skew-x-3">
          Chapter Projects &amp; Spec Sheets
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          PROJECT PIPELINE &amp; VEHICLE TECH
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Access vehicle engineering blueprint logs, dynamic CVT calculators, research studies, and seasonal scorecard registries.
        </p>
      </div>

      {/* Categories Sub-nav */}
      <div className="flex justify-center border-b border-white/10 pb-4 gap-2 overflow-x-auto">
        {["All", "Active", "Research", "Achievements"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveProject(""); // Clear active project view on category switch
            }}
            className={`px-5 py-2 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat ? "bg-apex-red text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      {activeProject === "" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Active: BAJA ATV */}
          {(selectedCategory === "All" || selectedCategory === "Active") && (
            <div className="bg-[#1E2025]/50 border border-[#F97316]/40 rounded-lg overflow-hidden glass-panel flex flex-col justify-between hover:border-torque-orange transition-all duration-300">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-[#F97316]/10 border border-[#F97316]/30 text-torque-orange font-mono text-xs font-bold uppercase rounded">
                    Active Campaign
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-mono text-xs led-pulse">RUNNING</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-black/60 border border-torque-orange/40 rounded p-1 flex items-center justify-center shrink-0">
                    <img src="/monarch_logo.png" alt="Team Monarch Racing" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-heading font-black text-xl uppercase tracking-tight text-white">BAJA ATV — B-26</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  AISI 4030 Chromoly tubular roll cage, double-wishbone suspension system, Honda GX430T powertrain, and custom 4WD layout.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveProject("baja");
                  setActiveSubTab("overview");
                }}
                className="w-full py-3 bg-[#F97316]/10 text-torque-orange hover:bg-torque-orange hover:text-white transition-all text-center font-mono text-xs font-bold uppercase border-t border-[#F97316]/20 cursor-pointer"
              >
                View Engineering Dashboard →
              </button>
            </div>
          )}

          {/* Research: Lightweight Chassis Optimization */}
          {(selectedCategory === "All" || selectedCategory === "Research") && (
            <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg overflow-hidden glass-panel flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-apex-red/10 border border-apex-red/30 text-apex-red font-mono text-xs font-bold uppercase rounded">
                  Structural FEA Research
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white leading-tight">Lightweight Chassis Topology</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Optimizing roll cage tube thicknesses and weld configurations. Targeting a 15% reduction in overall spaceframe weight while maintaining dynamic factor of safety above 2.0.
                </p>
              </div>
              <div className="p-4 bg-carbon-900 border-t border-white/5 font-mono text-xs text-slate-400">
                Software: ANSYS Structural, SolidWorks
              </div>
            </div>
          )}

          {/* Research: Electric ATV Powertrain */}
          {(selectedCategory === "All" || selectedCategory === "Research") && (
            <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg overflow-hidden glass-panel flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-torque-orange/10 border border-torque-orange/30 text-torque-orange font-mono text-xs font-bold uppercase rounded">
                  EV Conversion Study
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white leading-tight">Electric ATV Powertrain</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Modeling battery management algorithms, cell configurations, and motor efficiency maps for off-road tracks. Simulating continuous drawbar torque and traction boundaries.
                </p>
              </div>
              <div className="p-4 bg-carbon-900 border-t border-white/5 font-mono text-xs text-slate-400">
                Software: MATLAB, Simulink, COMSOL
              </div>
            </div>
          )}

          {/* Research: Additive Uprights */}
          {(selectedCategory === "All" || selectedCategory === "Research") && (
            <div className="bg-[#1E2025]/50 border border-white/10 rounded-lg overflow-hidden glass-panel flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-lift-blue/10 border border-lift-blue/30 text-lift-blue font-mono text-xs font-bold uppercase rounded">
                  Manufacturing Study
                </span>
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white leading-tight">Additive Manufactured Uprights</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Applying titanium selective laser melting processes to wheel hubs. Redesigning geometries using organic, generative design shapes to trim unsprung weight.
                </p>
              </div>
              <div className="p-4 bg-carbon-900 border-t border-white/5 font-mono text-xs text-slate-400">
                Software: Fusion 360, nTopology
              </div>
            </div>
          )}

          {/* Past Seasons Scoreboards Node */}
          {(selectedCategory === "All" || selectedCategory === "Achievements") && (
            <div className="bg-[#1E2025]/50 border border-emerald-500/40 rounded-lg overflow-hidden glass-panel flex flex-col justify-between hover:border-emerald-400 transition-all duration-300">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase rounded">
                    Chapter Achievements
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-mono text-xs uppercase font-bold">Verified</span>
                </div>
                <h3 className="font-heading font-black text-xl uppercase tracking-tight text-white">Scoreboard Registry</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Directing target score matrices and official national results for all active campaign years.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveProject("achievements");
                  setSelectedYear("2026");
                }}
                className="w-full py-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-center font-mono text-xs font-bold uppercase border-t border-emerald-500/20 cursor-pointer"
              >
                Open Scoreboard HUD →
              </button>
            </div>
          )}

        </div>
      ) : activeProject === "baja" ? (
        /* DETAIL VIEW: BAJA ATV */
        <div className="space-y-8 animate-fadeIn">
          {/* Back button */}
          <button
            onClick={() => setActiveProject("")}
            className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-white rounded font-mono text-xs uppercase cursor-pointer"
          >
            ← Back to Projects
          </button>

          <div className="bg-gradient-to-b from-[#131519] to-carbon-900 border border-white/10 p-6 rounded-lg space-y-6">
            <h3 className="font-heading font-black text-2xl uppercase text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-torque-orange led-pulse" />
              BAJA ATV B-26 ENGINEERING REPORT
            </h3>

            {/* Sub-tab Navigation */}
            <div className="flex gap-1 overflow-x-auto border-b border-white/10 pb-2">
              {[
                { key: "3d_view", label: "3D Engine Showcase" },
                { key: "overview", label: "Spec Hotspots" },
                { key: "cvt", label: "CVT Speed Calculator" }
              ].map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setActiveSubTab(sub.key)}
                  className={`px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    activeSubTab === sub.key ? "bg-torque-orange text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Sub-tab viewport */}
            {activeSubTab === "3d_view" && (
              <div className="pt-4 animate-fadeIn space-y-4">
                
                {/* CAD Download Banner */}
                <div className="w-full bg-[#1E2025]/60 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-black text-white text-lg uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-torque-orange animate-pulse" />
                      SolidWorks 3D CAD Assembly
                    </h4>
                    <p className="text-slate-400 font-mono text-[10px] sm:text-xs uppercase mt-1">
                      Full BAJA B-26 vehicle model with chassis, powertrain, double-wishbone suspension, and cockpit
                    </p>
                  </div>
                  <a 
                    href="/api/cad/download" 
                    download="BAJA_B26_FULL_ASSEMBLY.STEP"
                    className="w-full sm:w-auto px-5 py-3 bg-[#F97316]/15 hover:bg-[#F97316] text-[#F97316] hover:text-white border border-[#F97316]/30 font-bold font-mono text-xs uppercase rounded transition-all whitespace-nowrap flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <Download size={14} />
                    Download CAD (.STEP — 257 MB)
                  </a>
                </div>

                <div className="border border-white/5 rounded-xl overflow-hidden bg-carbon-900/50 p-2">
                  <VehicleView3D />
                </div>
              </div>
            )}

            {activeSubTab === "overview" && (
              <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-4 animate-fadeIn">
                
                {/* Hotspot triggers - Left Column */}
                <div className="lg:col-span-3 flex flex-col gap-4 justify-center">
                  {Object.keys(specHotspots).map((key) => (
                    <button
                      key={key}
                      onMouseEnter={() => setActiveHotspot(key)}
                      onClick={() => setActiveHotspot(key)}
                      className={`flex items-center justify-between p-4 border text-left rounded-lg transition-all cursor-pointer ${
                        activeHotspot === key 
                          ? "bg-apex-red/10 border-apex-red text-white" 
                          : "bg-titanium-700/40 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${activeHotspot === key ? "bg-apex-red led-pulse" : "bg-slate-600"}`}></span>
                        <span className="font-heading text-xs font-bold uppercase tracking-wider">{specHotspots[key].title}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-500" />
                    </button>
                  ))}
                </div>

                {/* Hotspot Details View - Right Column */}
                <div className="lg:col-span-9 bg-titanium-700/30 border border-white/10 p-6 rounded-lg glass-panel flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <h4 className="font-heading font-black text-lg text-white uppercase tracking-wider">
                        {currentSpec.title}
                      </h4>
                      <span className="font-mono text-xs text-slate-500 uppercase">Subsystem Blueprint</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {currentSpec.stats.map((s, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleCopySpec(s.val, idx)}
                          className="bg-carbon-900/60 p-4 border border-white/5 rounded-lg space-y-1 cursor-pointer hover:border-torque-orange/30 hover:bg-carbon-900 transition-all group relative overflow-hidden select-none"
                          title="Click to copy spec value"
                        >
                          <span className="font-mono text-xs text-slate-500 block uppercase">{s.label}</span>
                          <strong className="text-white text-xs block leading-relaxed group-hover:text-torque-orange transition-colors">{s.val}</strong>
                          
                          {/* Copy status overlay */}
                          {copiedIndex === idx ? (
                            <span className="absolute right-2 bottom-2 text-[9px] bg-torque-orange/15 text-torque-orange px-1.5 py-0.5 rounded font-mono uppercase font-bold animate-fadeIn">
                              Copied
                            </span>
                          ) : (
                            <span className="absolute right-2 bottom-2 text-[8px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                              Copy
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 font-mono text-xs text-slate-500 uppercase flex justify-between items-center">
                    <span>Validation Stage: Dynamic Track Approved</span>
                    <span className="text-apex-red font-bold">SAEINDIA Compliance Checked</span>
                  </div>
                </div>

              </div>
            )}


            {activeSubTab === "cvt" && (
              <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-4 animate-fadeIn">
                
                {/* CVT Slider inputs - Left Column */}
                <div className="lg:col-span-5 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between space-y-6 glass-panel">
                  <div className="space-y-4 font-mono text-xs">
                    <div className="border-b border-white/5 pb-2">
                      <h4 className="font-heading font-black text-sm text-white uppercase">CVT RATIO PARAMETERS</h4>
                    </div>

                    {/* RPM Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Engine Velocity:</span>
                        <strong className="text-white">{cvtEngineRpm} RPM</strong>
                      </div>
                      <input 
                        type="range" min="1200" max="3600" step="100" value={cvtEngineRpm}
                        onChange={(e) => setCvtEngineRpm(Number(e.target.value))}
                        className="w-full h-1 bg-carbon-900 rounded appearance-none cursor-pointer accent-torque-orange"
                      />
                    </div>

                    {/* CVT pulley ratio slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">CVT Pulley Ratio:</span>
                        <strong className="text-white">{cvtRatio.toFixed(2)} : 1</strong>
                      </div>
                      <input 
                        type="range" min="0.43" max="3.0" step="0.05" value={cvtRatio}
                        onChange={(e) => setCvtRatio(Number(e.target.value))}
                        className="w-full h-1 bg-carbon-900 rounded appearance-none cursor-pointer accent-torque-orange"
                      />
                      <div className="flex justify-between text-xs text-slate-500 uppercase">
                        <span>0.43 (Underdrive)</span>
                        <span>3.0 (Overdrive)</span>
                      </div>
                    </div>

                    {/* Final reduction ratio */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Final Drive Reduction:</span>
                        <strong className="text-white">{cvtFinalDrive.toFixed(2)} : 1</strong>
                      </div>
                      <input 
                        type="range" min="2.5" max="6.0" step="0.1" value={cvtFinalDrive}
                        onChange={(e) => setCvtFinalDrive(Number(e.target.value))}
                        className="w-full h-1 bg-carbon-900 rounded appearance-none cursor-pointer accent-torque-orange"
                      />
                    </div>

                    {/* Tire diameter */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Tire Outer Diameter:</span>
                        <strong className="text-white">{cvtTireDiameter.toFixed(1)} inches</strong>
                      </div>
                      <input 
                        type="range" min="18" max="26" step="0.5" value={cvtTireDiameter}
                        onChange={(e) => setCvtTireDiameter(Number(e.target.value))}
                        className="w-full h-1 bg-carbon-900 rounded appearance-none cursor-pointer accent-torque-orange"
                      />
                    </div>
                  </div>

                  <div className="bg-carbon-900/60 p-3.5 border border-white/5 font-mono text-xs text-slate-400 rounded-lg">
                    <span className="font-bold text-white block mb-0.5">MATH EQUATION USED</span>
                    Velocity (km/h) = [RPM / (Ratio × FinalDrive)] × [Diameter × π × 0.0254] × 0.06
                  </div>
                </div>

                {/* CVT calculations results - Right Column */}
                <div className="lg:col-span-7 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between glass-panel">
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-3">
                      <span className="font-mono text-xs text-torque-orange uppercase font-bold block">Simulator Outputs</span>
                      <h4 className="font-heading font-black text-xl text-white uppercase mt-1">VEHICLE VELOCITY HUD</h4>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-carbon-900 p-6 border border-white/5 rounded-lg text-center space-y-1 relative">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Simulated Velocity</span>
                        <strong className="text-4xl font-heading font-black text-white">{vehicleSpeedKmh.toFixed(1)} km/h</strong>
                        <span className="text-slate-500 text-xs block font-mono">({(vehicleSpeedKmh / 3.6).toFixed(2)} m/s Vector)</span>
                      </div>

                      <div className="bg-carbon-900 p-6 border border-white/5 rounded-lg text-center space-y-1 relative">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Available Wheel Torque</span>
                        <strong className="text-4xl font-heading font-black text-torque-orange">{wheelTorqueNm.toFixed(1)} Nm</strong>
                        <span className="text-slate-500 text-xs block font-mono">(Assuming 90% CVT Efficiency)</span>
                      </div>
                    </div>

                    <div className="bg-carbon-900/40 p-4 border border-white/5 rounded-lg font-sans text-xs text-slate-300 leading-relaxed">
                      At <strong className="text-white">{cvtEngineRpm} RPM</strong>, the Honda engine delivers <strong className="text-white">{interpolatedTorque.toFixed(1)} Nm</strong> of crankshaft torque. With a total reduction ratio of <strong className="text-white">{totalReduction.toFixed(2)}:1</strong>, this is multiplied to produce <strong className="text-white">{wheelTorqueNm.toFixed(1)} Nm</strong> at the drive axle hubs.
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 font-mono text-xs text-slate-500 uppercase flex justify-between items-center">
                    <span>Interpolated against official GX430T load map</span>
                    <span className="text-[#10b981] font-bold">✓ Model Parameters Valid</span>
                  </div>
                </div>

              </div>
            )}



          </div>
        </div>
      ) : (
        /* DETAIL VIEW: ACHIEVEMENTS SCOREBOARD */
        <div className="space-y-8 animate-fadeIn">
          {/* Back button */}
          <button
            onClick={() => setActiveProject("")}
            className="px-4 py-2 border border-white/10 text-slate-300 hover:text-white hover:border-white rounded font-mono text-xs uppercase cursor-pointer"
          >
            ← Back to Projects
          </button>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Timeline HUD */}
            <div className="lg:col-span-4 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between glass-panel">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                    CAMPAIGN YEARS
                  </h3>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Select Node</span>
                </div>

                {/* Timeline Tree Nodes */}
                <div className="space-y-4 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {Object.keys(achievementsData).map((year) => {
                    const node = achievementsData[year];
                    const isSelected = selectedYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className="w-full text-left relative flex items-center gap-4 group cursor-pointer focus:outline-none"
                      >
                        {/* Node Dot */}
                        <span className={`absolute -left-5 w-2.5 h-2.5 rounded-full border border-carbon-900 transition-all ${
                          isSelected 
                            ? "bg-torque-orange scale-125 led-pulse" 
                            : "bg-slate-700 hover:bg-white"
                        }`} />
                        
                        <div className={`flex-1 p-3 border rounded transition-all ${
                          isSelected 
                            ? "bg-[#F97316]/10 border-torque-orange text-white" 
                            : "bg-carbon-900/40 border-white/5 text-slate-400 group-hover:border-white/20 group-hover:text-white"
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="font-heading font-black text-sm">{node.year}</span>
                            <span className={`text-xs font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                              node.status === "Completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-purple-500/15 text-purple-400 led-pulse"
                            }`}>
                              {node.status}
                            </span>
                          </div>
                          <p className="font-sans text-xs truncate mt-1">{node.milestone}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-carbon-900/60 p-4 border border-white/5 rounded-lg font-mono text-xs text-slate-400 mt-6 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-torque-orange led-pulse" />
                  <strong className="text-white uppercase text-xs">Audit Log Verification</strong>
                </div>
                Scores verified via the official SAEINDIA BAJA portals and judge evaluation checklists.
              </div>
            </div>

            {/* Right Column: Score Metrics & Highlights */}
            <div className="lg:col-span-8 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between glass-panel space-y-8">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-4 gap-4">
                <div>
                  <span className="font-mono text-xs text-torque-orange uppercase tracking-wider block font-bold">Milestone Summary</span>
                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mt-1">
                    {currentAchievement.milestone}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-carbon-900/80 px-4 py-2 border border-white/5 rounded font-mono text-xs text-slate-300">
                  {currentAchievement.status === "Completed" ? (
                    <CheckCircle size={14} className="text-emerald-400" />
                  ) : (
                    <Flame size={14} className="text-purple-400 led-pulse" />
                  )}
                  <span className="uppercase text-xs font-bold">{currentAchievement.status} Stage</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {currentAchievement.desc}
              </p>

              {/* Score metrics progress blocks */}
              {currentAchievement.scores && (
                <div className="space-y-4">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block font-bold">
                    OFFICIAL COMPETITION SCORE HUD
                  </span>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentAchievement.scores.map((score, sIdx) => {
                      const percent = (score.scored / score.max) * 100;
                      return (
                        <div key={sIdx} className="bg-carbon-900/60 p-4 border border-white/5 rounded-lg space-y-2 font-mono text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-xs block truncate max-w-[70%]">{score.label}</span>
                            <strong className="text-white">{score.scored} / {score.max}</strong>
                          </div>
                          
                          {/* Meter bar */}
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${score.color}`} style={{ width: `${percent}%` }} />
                          </div>
                          
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>{percent.toFixed(0)}% Accomplished</span>
                            <span>{score.max - score.scored} points deficit</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Highlights bullet list */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block font-bold">
                  CAMPAIGN METRICS &amp; LOGISTICS HIGHLIGHTS
                </span>
                <ul className="grid sm:grid-cols-2 gap-3 font-sans text-xs text-slate-300">
                  {currentAchievement.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-2 items-start bg-carbon-900/20 p-2.5 border border-white/5 rounded">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-torque-orange rounded-full" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
