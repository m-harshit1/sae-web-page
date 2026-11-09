'use client';

import React, { useState } from 'react';
import { 
  Send, CheckCircle2, FileText, Brain, GraduationCap, 
  Compass, BookOpen, Download, X, Building2, Award
} from 'lucide-react';

interface SkillMatrixItem {
  department: string;
  skills: string[];
  tools: string[];
  slots: number;
  color: string;
}

const skillMatrix: SkillMatrixItem[] = [
  { department: "Design & CFD", skills: ["3D Modeling", "Chassis Spaceframe", "Aerodynamics"], tools: ["SolidWorks", "CATIA", "SimScale"], slots: 4, color: "border-apex-red/30 text-apex-red bg-apex-red/5" },
  { department: "Structural FEA", skills: ["Static Structural FEA", "Modal Analysis", "Topology Optimization"], tools: ["ANSYS Workbench", "nTopology"], slots: 3, color: "border-torque-orange/30 text-torque-orange bg-torque-orange/5" },
  { department: "Embedded Systems", skills: ["Microcontrollers", "CAN-Bus Protocols", "DAQ & Sensor Node design"], tools: ["Arduino", "STM32 CubeIDE", "Altium"], slots: 5, color: "border-lift-blue/30 text-lift-blue bg-lift-blue/5" },
  { department: "Manufacturing Ops", skills: ["TIG Welding", "CNC Lathe machining", "Welding Fixtures Setup"], tools: ["Workshop Skills", "Safety Rules"], slots: 6, color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" },
  { department: "Business Ops", skills: ["Sponsor deck outreach", "CSR proposals drafting", "BOM spreadsheets costing"], tools: ["MS Excel", "Adobe Illustrator"], slots: 2, color: "border-purple-500/30 text-purple-400 bg-purple-500/5" }
];

const trainingRoadmaps = [
  {
    title: "ANSYS Workbench Roadmap",
    desc: "A step-by-step framework to model static structural stress. Covers mesh refinement guidelines, weld joints connections, loading setups, and factor of safety computations.",
    icon: <Brain className="text-torque-orange shrink-0" size={20} />,
    duration: "4-Week Plan"
  },
  {
    title: "SolidWorks CAD Layouts",
    desc: "Master 3D sketch constraints for tubular chassis spaceframes. Learn weldment structural member mapping, structural tube profiling, and fixture point design.",
    icon: <Compass className="text-apex-red shrink-0" size={20} />,
    duration: "3-Week Plan"
  },
  {
    title: "BAJA Rulebook Core Digest",
    desc: "Deep dive into official BAJA SAEINDIA regulations. Direct focus on Article 3 (Roll Cage dimensions, clearance margins, primary member configurations, and safety harnesses).",
    icon: <BookOpen className="text-lift-blue shrink-0" size={20} />,
    duration: "Self-Paced"
  },
  {
    title: "Workshop Manufacturing Guide",
    desc: "Essential safety parameters, AISI 4130 tube TIG welding specs, structural weldment testing parameters, and jig designs to prevent distortion during chassis welding.",
    icon: <GraduationCap className="text-emerald-400 shrink-0" size={20} />,
    duration: "2-Week Workshop"
  }
];

interface SponsorTier {
  id: string;
  name: string;
  investment: string;
  pledgeValue: number;
  badge: string;
  color: string;
  border: string;
  badgeBg: string;
  csrSchoolCount: number;
  highlight: string;
  benefits: string[];
}

const sponsorTiers: SponsorTier[] = [
  { 
    id: "bronze",
    name: "Bronze Partner", 
    investment: "₹50,000",
    pledgeValue: 50000,
    badge: "Official Supporter",
    color: "text-amber-500", 
    border: "border-amber-500/40", 
    badgeBg: "bg-amber-500/10", 
    csrSchoolCount: 1,
    highlight: "Essential CSR compliance & digital presence",
    benefits: [
      "Company logo on the official SAEINDIA chapter website",
      "Invitation to annual B-26 vehicle rollout & networking dinner",
      "Official Section 135 CSR impact certificate for school science kits",
      "Mention in team season newsletters & social media announcements"
    ]
  },
  { 
    id: "silver",
    name: "Silver Partner", 
    investment: "₹1,00,000",
    pledgeValue: 100000,
    badge: "Technical Partner",
    color: "text-slate-200", 
    border: "border-slate-300/40", 
    badgeBg: "bg-slate-300/10", 
    csrSchoolCount: 2,
    highlight: "Vehicle branding & talent recruitment access",
    benefits: [
      "All Bronze Partner benefits included",
      "Logo decaled on competition vehicle side body panels",
      "Priority recruitment access to member resumes & portfolios",
      "Featured recognition in AWIM district outreach events",
      "Sponsor display space during on-campus engineering exhibitions"
    ]
  },
  { 
    id: "gold",
    name: "Gold Partner", 
    investment: "₹2,50,000",
    pledgeValue: 250000,
    badge: "Principal Partner",
    color: "text-yellow-400", 
    border: "border-yellow-400/40", 
    badgeBg: "bg-yellow-400/10", 
    csrSchoolCount: 5,
    highlight: "High-visibility race paddocks & exclusive campus sessions",
    benefits: [
      "All Silver Partner benefits included",
      "Prominent branding on official team apparel & pit banners",
      "Exclusive campus recruitment webinar / technical talk hosted by team",
      "Product showcase & component testing validation case studies",
      "Adoption of 5 rural primary schools for AWIM STEM kits"
    ]
  },
  { 
    id: "title",
    name: "Title Sponsor", 
    investment: "₹5,00,000+",
    pledgeValue: 500000,
    badge: "Headline Partner",
    color: "text-apex-red font-black", 
    border: "border-apex-red/50", 
    badgeBg: "bg-apex-red/15", 
    csrSchoolCount: 10,
    highlight: "Headline naming rights & VIP trackside access",
    benefits: [
      "All Gold Partner benefits included",
      "Headline Title naming rights ('Team SAEINDIA powered by [Brand]')",
      "VIP trackside paddock passes & national competition briefings",
      "Primary central livery branding across nose cone & roll cage panels",
      "Adoption of 10 primary schools with comprehensive science toolkits",
      "Dedicated joint press release & executive interview feature"
    ]
  }
];

interface AwimSchool {
  id: number;
  name: string;
  district: string;
  state: string;
  kits: string;
  mentored: number;
  securedBy: number;
  x: number;
  y: number;
}

const awimSchools: AwimSchool[] = [
  { id: 1, name: "Gautham Model School, Kurnool", district: "Kurnool", state: "Andhra Pradesh", kits: "15 JetToy, 10 Skimmer", mentored: 120, securedBy: 50000, x: 195, y: 295 },
  { id: 2, name: "Zilla Parishad High School, Kurnool", district: "Kurnool", state: "Andhra Pradesh", kits: "25 JetToy", mentored: 180, securedBy: 100000, x: 215, y: 310 },
  { id: 3, name: "St. Joseph's English Medium School", district: "Kurnool", state: "Andhra Pradesh", kits: "12 JetToy, 8 Skimmer", mentored: 95, securedBy: 250000, x: 185, y: 325 },
  { id: 4, name: "Telangana Model School, Mahbubnagar", district: "Mahbubnagar", state: "Telangana", kits: "10 JetToy, 5 Skimmer", mentored: 75, securedBy: 250000, x: 205, y: 210 },
  { id: 5, name: "ZP High School, Anantapur", district: "Anantapur", state: "Andhra Pradesh", kits: "12 Skimmer", mentored: 80, securedBy: 500000, x: 175, y: 380 },
  { id: 6, name: "ZPHS Boys School, Nandyal", district: "Kurnool (Nandyal)", state: "Andhra Pradesh", kits: "15 JetToy", mentored: 110, securedBy: 500000, x: 255, y: 340 },
  { id: 7, name: "Giddalur Primary School, Prakasam", district: "Prakasam", state: "Andhra Pradesh", kits: "8 JetToy, 8 Skimmer", mentored: 70, securedBy: 500000, x: 305, y: 350 }
];

export default function JoinTab() {
  const [subTab, setSubTab] = useState<"recruit" | "sponsor">("recruit");

  // Recruitment Form States
  const [applicantName, setApplicantName] = useState<string>("");
  const [applicantRoll, setApplicantRoll] = useState<string>("");
  const [applicantEmail, setApplicantEmail] = useState<string>("");
  const [applicantPhone, setApplicantPhone] = useState<string>("");
  const [applicantBranch, setApplicantBranch] = useState<string>("Mechanical Engineering");
  const [applicantYear, setApplicantYear] = useState<string>("1st Year");
  const [applicantDomain, setApplicantDomain] = useState<string>("Chassis & Spaceframe Structural Design");
  const [applicantSecondaryDomain, setApplicantSecondaryDomain] = useState<string>("Suspension, Steering & Wheel Kinematics");
  const [applicantCoverText, setApplicantCoverText] = useState<string>("");
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [assignedReference, setAssignedReference] = useState<string>("");

  // Sponsor State - selected tier
  const [selectedTierId, setSelectedTierId] = useState<string>("gold");
  const [selectedSchool, setSelectedSchool] = useState<number | null>(1);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const activeTier = sponsorTiers.find(t => t.id === selectedTierId) || sponsorTiers[2];

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: applicantName,
          rollNumber: applicantRoll,
          email: applicantEmail,
          phone: applicantPhone,
          branch: applicantBranch,
          year: applicantYear,
          domain: applicantDomain,
          secondaryDomain: applicantSecondaryDomain,
          coverText: applicantCoverText
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAssignedReference(data.application?.referenceCode || `BAJA-APP-${Math.floor(1000 + Math.random() * 9000)}`);
        setApplicationSubmitted(true);
      } else {
        alert('Failed to submit application. Please verify parameters.');
      }
    } catch (error) {
      console.error('Error submitting application form:', error);
      alert('Network error. Check api status.');
    }
  };

  const handleBrochureDownload = () => {
    setDownloaded(true);
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const benefitsHTML = activeTier.benefits
      .map(b => `<li style="margin-bottom: 10px; color: #222; font-size: 13px;">✓ ${b}</li>`)
      .join('');
      
    printWindow.document.write(`
      <html>
        <head>
          <title>SAEINDIA IIITDM Kurnool - Sponsor Proposal Pledge</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #222; line-height: 1.6; }
            .header { border-bottom: 2px solid #E11D48; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo-text { font-size: 24px; font-weight: bold; color: #E11D48; }
            .meta { font-size: 12px; color: #666; text-align: right; }
            .title { font-size: 22px; text-transform: uppercase; margin-bottom: 20px; font-weight: 800; color: #111; }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #f9f9f9; padding: 20px; border-radius: 6px; }
            .detail-label { font-size: 11px; text-transform: uppercase; color: #666; font-weight: bold; }
            .detail-val { font-size: 18px; font-weight: bold; color: #111; margin-top: 4px; }
            .section-title { font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 15px; font-weight: bold; color: #E11D48; }
            .benefits-list { padding-left: 20px; margin-bottom: 40px; }
            .footer { border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px; font-size: 11px; color: #666; display: flex; justify-content: space-between; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo-text">SAEINDIA Collegiate Chapter</div>
              <div style="font-size: 12px; color: #666;">IIITDM Kurnool, Andhra Pradesh</div>
            </div>
            <div class="meta">
              <div>Date: ${new Date().toLocaleDateString('en-IN')}</div>
              <div>Proposal Ref: SAE-B26-SP-${activeTier.name.toUpperCase().replace(/\s+/g, '')}</div>
            </div>
          </div>
          
          <div class="title">Corporate Sponsorship Agreement &amp; Brand Partnership</div>
          
          <div class="details-grid">
            <div>
              <div class="detail-label">Partnership Tier</div>
              <div class="detail-val">${activeTier.name}</div>
            </div>
            <div>
              <div class="detail-label">Investment Commitment</div>
              <div class="detail-val" style="color: #E11D48;">${activeTier.investment}</div>
            </div>
            <div>
              <div class="detail-label">CSR School Adoption (Section 135)</div>
              <div class="detail-val" style="color: #10b981;">${activeTier.csrSchoolCount} Primary School(s)</div>
            </div>
            <div>
              <div class="detail-label">Tax Benefit Eligibility</div>
              <div class="detail-val">Eligible under Indian CSR Norms</div>
            </div>
          </div>
          
          <div class="section-title">Return On Investment (ROI) &amp; Branding Benefits</div>
          <ul class="benefits-list">
            ${benefitsHTML}
          </ul>
          
          <div class="section-title">Signatures &amp; Approvals</div>
          <div style="display: flex; justify-content: space-between; margin-top: 50px; padding-bottom: 50px;">
            <div style="width: 220px; border-top: 1px solid #222; text-align: center; padding-top: 8px; font-size: 12px;">
              Authorized Corporate Sponsor
            </div>
            <div style="width: 220px; border-top: 1px solid #222; text-align: center; padding-top: 8px; font-size: 12px;">
              SAEINDIA Chapter Operations Lead
            </div>
          </div>
          
          <div class="footer">
            <div>Official Email: saeindia@iiitk.ac.in</div>
            <div>© 2026 IIITDM Kurnool SAEINDIA Collegiate Chapter.</div>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Title */}
      <div className="space-y-4 text-center">
        <span className="inline-block px-3 py-1 bg-lift-blue/10 border border-lift-blue/30 text-lift-blue font-mono text-xs uppercase tracking-widest skew-x-3">
          Onboarding &amp; Partnerships
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          JOIN SAEINDIA OR SPONSOR OUR TEAM
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm font-sans">
          Apply to build next-generation off-road motorsport vehicles or partner with our collegiate chapter through CSR and corporate sponsorship packages.
        </p>
      </div>

      {/* Main Switcher Navigation */}
      <div className="flex justify-center border-b border-white/10 pb-4 gap-2">
        <button
          onClick={() => setSubTab("recruit")}
          className={`px-6 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
            subTab === "recruit" ? "bg-apex-red text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Candidate Recruitment
        </button>
        <button
          onClick={() => setSubTab("sponsor")}
          className={`px-6 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
            subTab === "sponsor" ? "bg-torque-orange text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Corporate Sponsorship Tiers
        </button>
      </div>

      {subTab === "recruit" ? (
        /* RECRUITMENT SECTION */
        <div className="space-y-12 animate-fadeIn">
          
          {/* Skill Requirements Matrix */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                DEPARTMENT DOMAINS &amp; SEATS
              </h3>
              <span className="font-mono text-xs text-slate-500 uppercase">Monsoon 2026 Cohort</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {skillMatrix.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${item.color} flex flex-col justify-between space-y-3`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="font-heading font-bold text-xs uppercase">{item.department}</strong>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-bold">{item.slots} Slots</span>
                    </div>
                    <ul className="space-y-1 font-sans text-[11px] text-slate-300">
                      {item.skills.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-current rounded-full" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-slate-400">
                    Tools: {item.tools.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form and Verifiable e-card panel */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Form panel */}
            <div className="lg:col-span-8 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 space-y-6 glass-panel">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <FileText size={20} className="text-apex-red" />
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider text-white">
                    SAE INDIA BAJA RECRUITMENT FORM
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                    Official Candidate Application // Monsoon 2026 Season
                  </p>
                </div>
              </div>

              {!applicationSubmitted ? (
                <form onSubmit={handleApplicationSubmit} className="space-y-5 font-mono text-xs">
                  {/* Row 1: Name and Roll Number */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">FULL NAME *</label>
                      <input 
                        type="text" 
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Student Full Name"
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">ROLL NUMBER / STUDENT ID *</label>
                      <input 
                        type="text" 
                        required
                        value={applicantRoll}
                        onChange={(e) => setApplicantRoll(e.target.value)}
                        placeholder="e.g. 23BCS045 or 24BME012"
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all uppercase"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">COLLEGE EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="e.g. rollnumber@iiitk.ac.in"
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">CONTACT PHONE NUMBER *</label>
                      <input 
                        type="tel" 
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: SEPARATE BRANCH AND YEAR OPTIONS */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">ACADEMIC BRANCH *</label>
                      <select 
                        value={applicantBranch}
                        onChange={(e) => setApplicantBranch(e.target.value)}
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all cursor-pointer"
                      >
                        <option value="Mechanical Engineering">Mechanical Engineering (Design &amp; Mfg)</option>
                        <option value="Electronics & Communication">Electronics &amp; Communication Engineering</option>
                        <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                        <option value="Artificial Intelligence & Data Science">AI &amp; Data Science</option>
                        <option value="Smart Manufacturing">Smart Manufacturing</option>
                        <option value="Automobile / Other Engineering">Automobile / Other Discipline</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">YEAR OF STUDY *</label>
                      <select 
                        value={applicantYear}
                        onChange={(e) => setApplicantYear(e.target.value)}
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all cursor-pointer"
                      >
                        <option value="1st Year">1st Year (B.Tech Freshman)</option>
                        <option value="2nd Year">2nd Year (B.Tech Sophomore)</option>
                        <option value="3rd Year">3rd Year (B.Tech Junior)</option>
                        <option value="4th Year">4th Year (B.Tech Senior)</option>
                        <option value="Post-Graduate">Post-Graduate (M.Tech / PhD)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: EXPANDED DOMAINS */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">PRIMARY DOMAIN PREFERENCE *</label>
                      <select 
                        value={applicantDomain}
                        onChange={(e) => setApplicantDomain(e.target.value)}
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all cursor-pointer"
                      >
                        <option value="Chassis & Spaceframe Structural Design">Chassis &amp; Spaceframe Structural Design</option>
                        <option value="Suspension, Steering & Wheel Kinematics">Suspension, Steering &amp; Wheel Kinematics</option>
                        <option value="Powertrain & Transmission (CVT & 4WD)">Powertrain &amp; Transmission (CVT &amp; 4WD)</option>
                        <option value="Braking Systems & Hydraulic Architecture">Braking Systems &amp; Hydraulic Architecture</option>
                        <option value="Electronics, DAQ Sensors & Wiring Harness">Electronics, DAQ Sensors &amp; Wiring Harness</option>
                        <option value="Vehicle Dynamics, FEA & CFD Simulation">Vehicle Dynamics, FEA &amp; CFD Simulation</option>
                        <option value="Fabrication, TIG Welding & Machining">Fabrication, TIG Welding &amp; Machining</option>
                        <option value="e-BAJA Division (Battery Management & EV)">e-BAJA Division (Battery Management &amp; EV)</option>
                        <option value="Sponsorship, Corporate CSR & Finance">Sponsorship, Corporate CSR &amp; Finance</option>
                        <option value="Media Production, Design & Public Relations">Media Production, Design &amp; Public Relations</option>
                        <option value="Cost Report & Technical Rulebook Compliance">Cost Report &amp; Technical Rulebook Compliance</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 block font-bold">SECONDARY DOMAIN (OPTIONAL)</label>
                      <select 
                        value={applicantSecondaryDomain}
                        onChange={(e) => setApplicantSecondaryDomain(e.target.value)}
                        className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red transition-all cursor-pointer"
                      >
                        <option value="None">None (Focus on Primary Only)</option>
                        <option value="Suspension, Steering & Wheel Kinematics">Suspension, Steering &amp; Wheel Kinematics</option>
                        <option value="Chassis & Spaceframe Structural Design">Chassis &amp; Spaceframe Structural Design</option>
                        <option value="Powertrain & Transmission (CVT & 4WD)">Powertrain &amp; Transmission (CVT &amp; 4WD)</option>
                        <option value="Braking Systems & Hydraulic Architecture">Braking Systems &amp; Hydraulic Architecture</option>
                        <option value="Electronics, DAQ Sensors & Wiring Harness">Electronics, DAQ Sensors &amp; Wiring Harness</option>
                        <option value="Vehicle Dynamics, FEA & CFD Simulation">Vehicle Dynamics, FEA &amp; CFD Simulation</option>
                        <option value="Fabrication, TIG Welding & Machining">Fabrication, TIG Welding &amp; Machining</option>
                        <option value="e-BAJA Division (Battery Management & EV)">e-BAJA Division (Battery Management &amp; EV)</option>
                        <option value="Sponsorship, Corporate CSR & Finance">Sponsorship, Corporate CSR &amp; Finance</option>
                        <option value="Media Production, Design & Public Relations">Media Production, Design &amp; Public Relations</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Experience brief */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 block font-bold">
                      TECHNICAL SKILLS, PRIOR PROJECTS &amp; STATEMENT OF INTEREST
                    </label>
                    <textarea 
                      rows={4}
                      value={applicantCoverText}
                      onChange={(e) => setApplicantCoverText(e.target.value)}
                      placeholder="Mention your familiarity with SolidWorks, ANSYS, MATLAB, Arduino/STM32, welding/lathe tools, or past robotics/motorsport competitions..."
                      className="w-full bg-carbon-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-apex-red font-sans text-xs transition-all"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-apex-red hover:bg-apex-red/90 text-white font-mono text-xs font-bold uppercase tracking-wider py-4 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-apex-red/20"
                  >
                    <Send size={15} />
                    <span>Submit Application to SAEINDIA BAJA Registry</span>
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center bg-carbon-900/60 border border-white/5 rounded-lg space-y-5 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-heading font-black text-xl text-white uppercase tracking-tight">Application Successfully Registered!</h4>
                    <p className="text-slate-300 font-sans text-xs max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{applicantName}</strong>. Your recruitment packet has been logged in our chapter database with registration code:
                    </p>
                    <div className="inline-block px-4 py-2 bg-carbon-900 border border-emerald-500/30 rounded font-mono text-emerald-400 font-bold text-sm tracking-wider">
                      {assignedReference}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 border-t border-white/5 pt-4 max-w-md mx-auto space-y-1">
                    <p>Branch: <span className="text-white">{applicantBranch}</span> | Year: <span className="text-white">{applicantYear}</span></p>
                    <p>Primary Domain: <span className="text-torque-orange">{applicantDomain}</span></p>
                  </div>
                  <button 
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setApplicantName("");
                      setApplicantRoll("");
                      setApplicantEmail("");
                      setApplicantPhone("");
                      setApplicantCoverText("");
                    }}
                    className="inline-block text-xs font-mono text-apex-red hover:underline cursor-pointer uppercase font-bold pt-2"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>

            {/* Application Information & Evaluation Pipeline */}
            <div className="lg:col-span-4 bg-titanium-700/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col justify-between glass-panel space-y-6">
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
                    RECRUITMENT TIMELINE
                  </h3>
                  <span className="font-mono text-xs text-slate-400">Selection Workflow</span>
                </div>

                <div className="space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full border border-carbon-900 flex items-center justify-center text-[10px] font-mono font-bold bg-emerald-500 text-white">
                      1
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs uppercase font-bold text-white block">Packet Evaluation</span>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        Online application screening by Subsystem Leads and Executive Board.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full border border-carbon-900 flex items-center justify-center text-[10px] font-mono font-bold bg-torque-orange text-white">
                      2
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs uppercase font-bold text-white block">Domain Aptitude Test</span>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        Domain-specific assessment covering fundamentals of mechanics, circuits, or management.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full border border-carbon-900 flex items-center justify-center text-[10px] font-mono font-bold bg-lift-blue text-white">
                      3
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs uppercase font-bold text-white block">Technical Interview</span>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        One-on-one discussion with domain heads covering problem-solving and vehicle design intuition.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full border border-carbon-900 flex items-center justify-center text-[10px] font-mono font-bold bg-purple-500 text-white">
                      4
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs uppercase font-bold text-white block">Workshop Onboarding</span>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        Safety orientation, CAD training workshops, and assignment to active B-26 vehicle sprints.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-carbon-900/60 p-4 border border-white/5 rounded-lg font-mono text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 led-pulse" />
                  <strong className="text-white uppercase text-xs">Applications Active</strong>
                </div>
                <p className="font-sans text-[11px] leading-relaxed">
                  Open to all engineering years. Direct questions to <span className="text-slate-300 font-mono">saeindia@iiitk.ac.in</span> or consult our workshop leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CORPORATE SPONSORSHIP SECTION (NO SLIDER - JUST BENEFITS) */
        <div className="space-y-12 animate-fadeIn text-left">
          
          {/* Header Description */}
          <div className="bg-titanium-700/40 border border-white/10 rounded-xl p-6 lg:p-8 glass-panel space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="font-mono text-xs text-torque-orange font-bold uppercase tracking-wider block">
                  Corporate Partnership Matrix
                </span>
                <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white mt-1">
                  SPONSORSHIP TIERS &amp; BRAND BENEFITS
                </h3>
              </div>
              <button
                onClick={handleBrochureDownload}
                className="flex items-center gap-2 bg-apex-red hover:bg-apex-red/90 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded transition-all cursor-pointer shadow-lg shadow-apex-red/20 self-start sm:self-auto"
              >
                <Download size={14} />
                <span>Download {activeTier.name} Agreement (PDF)</span>
              </button>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
              Partnering with SAEINDIA IIITDM Kurnool grants your company direct visibility at national motorsport championships, premier campus recruitment channels for top engineering talent, and verifiable CSR impact under Section 135 through our regional AWIM primary school adoption initiatives.
            </p>
          </div>

          {/* Tier Cards Grid (Direct Benefits View) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorTiers.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <div 
                  key={tier.id}
                  onClick={() => { setSelectedTierId(tier.id); setDownloaded(false); }}
                  className={`bg-titanium-700/50 border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected ? `${tier.border} shadow-xl scale-[1.02] bg-titanium-700/80 ring-1 ring-white/20` : "border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Active Indicator Top Bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-apex-red to-torque-orange" />
                  )}

                  <div className="space-y-5">
                    {/* Tier Header */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] uppercase font-bold tracking-wider ${tier.badgeBg} ${tier.color} border border-current/20`}>
                          {tier.badge}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">
                          {tier.csrSchoolCount} School{tier.csrSchoolCount > 1 ? "s" : ""} CSR
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-xl text-white uppercase tracking-tight">{tier.name}</h4>
                      <div className="font-heading font-extrabold text-2xl text-white">
                        {tier.investment}
                        <span className="text-slate-500 font-mono text-xs font-normal"> / season</span>
                      </div>
                      <p className="text-slate-400 font-sans text-xs leading-relaxed">{tier.highlight}</p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2.5 border-t border-white/5 pt-4">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                        Included Tier Benefits:
                      </span>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs font-sans text-slate-200">
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Select Button */}
                  <div className="pt-6 mt-6 border-t border-white/5">
                    <button
                      className={`w-full py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-apex-red text-white shadow-md shadow-apex-red/20" 
                          : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isSelected ? "✓ Selected Tier" : "Select Tier"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Tier Action Bar */}
          <div className="bg-carbon-900/90 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs text-slate-400 uppercase">Selected Agreement Package:</span>
              <h4 className="font-heading font-black text-lg text-white uppercase flex items-center justify-center sm:justify-start gap-2">
                <span className={`w-2 h-2 rounded-full ${activeTier.color.includes('apex-red') ? 'bg-apex-red' : 'bg-torque-orange'}`} />
                {activeTier.name} ({activeTier.investment})
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:saeindia@iiitk.ac.in?subject=Corporate%20Sponsorship%20Inquiry%20-%20SAEINDIA%20IIITDM%20Kurnool"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                Inquire via Email
              </a>
              <button
                onClick={handleBrochureDownload}
                className="px-6 py-3 bg-apex-red hover:bg-apex-red/90 text-white rounded font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-apex-red/20 cursor-pointer"
              >
                <Download size={14} />
                <span>Generate Official Proposal PDF</span>
              </button>
            </div>
          </div>

          {/* AWIM CSR School Impact Map */}
          <div className="bg-[#1E2025]/30 border border-white/10 rounded-xl p-6 lg:p-8 glass-panel space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-4">
              <div className="text-left">
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 led-pulse" />
                  AWIM CSR OUTREACH &amp; DISTRICT ADOPTIONS MAP
                </h3>
                <p className="text-slate-400 font-sans text-xs mt-1">
                  Primary schools funded through corporate partner CSR allocations. Click any school node to review metrics.
                </p>
              </div>
              <div className="bg-carbon-900/80 px-4 py-2 border border-white/5 rounded font-mono text-xs text-slate-300">
                Tier CSR Adoptions: <strong className="text-emerald-400">{awimSchools.filter(s => activeTier.pledgeValue >= s.securedBy).length} / {awimSchools.length} Schools Funded</strong>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Map Viewport - Column 1 */}
              <div className="lg:col-span-7 bg-carbon-900 border border-white/10 rounded-lg p-4 flex justify-center items-center relative overflow-hidden telemetry-grid scanlines select-none aspect-square max-w-[500px] mx-auto w-full">
                
                {/* Lat/Long Grid lines overlays */}
                <svg viewBox="0 0 500 480" className="w-full h-full overflow-visible">
                  {[80, 160, 240, 320, 400].map((yVal) => (
                    <line key={yVal} x1="20" y1={yVal} x2="480" y2={yVal} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                  ))}
                  {[80, 160, 240, 320, 400].map((xVal) => (
                    <line key={xVal} x1={xVal} y1="20" x2={xVal} y2="460" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
                  ))}

                  {/* Dual State Borders */}
                  <polygon 
                    points="160,120 250,110 310,160 320,180 300,260 210,270 140,240 125,180" 
                    fill="rgba(14, 165, 233, 0.02)" 
                    stroke="rgba(14, 165, 233, 0.2)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,2" 
                  />
                  <text x="210" y="150" fill="rgba(14, 165, 233, 0.15)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="4" textAnchor="middle">TELANGANA</text>

                  <polygon 
                    points="140,240 210,270 300,260 320,180 350,190 440,245 460,290 380,370 300,410 210,430 160,450 145,390 165,340 140,270" 
                    fill="rgba(249, 115, 22, 0.02)" 
                    stroke="rgba(249, 115, 22, 0.2)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,2" 
                  />
                  <text x="320" y="320" fill="rgba(249, 115, 22, 0.12)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="4" textAnchor="middle">ANDHRA PRADESH</text>

                  {/* Capital Cities Reference Nodes */}
                  <g opacity="0.5">
                    <circle cx="220" cy="180" r="3" fill="none" stroke="#38bdf8" strokeWidth="1" />
                    <circle cx="220" cy="180" r="1" fill="#38bdf8" />
                    <text x="220" y="172" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="middle">HYDERABAD</text>

                    <circle cx="200" cy="300" r="4" fill="none" stroke="#f43f5e" strokeWidth="1" />
                    <circle cx="200" cy="300" r="1.5" fill="#f43f5e" />
                    <text x="200" y="292" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KURNOOL (Epicenter)</text>

                    <circle cx="320" cy="290" r="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="320" cy="290" r="1" fill="#94a3b8" />
                    <text x="320" y="282" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">AMARAVATI</text>

                    <circle cx="420" cy="230" r="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="420" cy="230" r="1" fill="#94a3b8" />
                    <text x="420" y="222" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">VIZAG</text>
                  </g>

                  {/* School Pins */}
                  {awimSchools.map((school) => {
                    const isSecured = activeTier.pledgeValue >= school.securedBy;
                    const isSelected = selectedSchool === school.id;
                    
                    return (
                      <g 
                        key={school.id} 
                        onClick={() => setSelectedSchool(school.id)}
                        className="cursor-pointer group"
                      >
                        {isSecured && (
                          <circle 
                            cx={school.x} 
                            cy={school.y} 
                            r="9" 
                            fill="rgba(16, 185, 129, 0.25)" 
                            className="animate-ping origin-center" 
                            style={{ animationDuration: `${2 + school.id * 0.5}s` }}
                          />
                        )}
                        
                        {isSelected && (
                          <circle 
                            cx={school.x} 
                            cy={school.y} 
                            r="7" 
                            fill="none" 
                            stroke="#E11D48" 
                            strokeWidth="1.5" 
                            strokeDasharray="2,2" 
                          />
                        )}

                        <circle 
                          cx={school.x} 
                          cy={school.y} 
                          r="4" 
                          fill={isSecured ? "#10b981" : "#475569"} 
                          stroke="#0D0E10" 
                          strokeWidth="1.5"
                          className="transition-transform group-hover:scale-125"
                        />
                        
                        <text 
                          x={school.x} 
                          y={school.y - 7} 
                          fill={isSelected ? "#E11D48" : isSecured ? "#10b981" : "#94a3b8"} 
                          fontSize="7" 
                          fontFamily="monospace" 
                          fontWeight={isSelected ? "bold" : "normal"}
                          textAnchor="middle"
                        >
                          {school.district}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* School Details Card - Column 2 */}
              <div className="lg:col-span-5 bg-titanium-700/50 border border-white/10 rounded-lg p-6 space-y-5">
                {selectedSchool ? (() => {
                  const school = awimSchools.find(s => s.id === selectedSchool) || awimSchools[0];
                  const isSecured = activeTier.pledgeValue >= school.securedBy;

                  return (
                    <div className="space-y-4 font-mono text-xs">
                      <div className="flex justify-between items-start border-b border-white/5 pb-3">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Primary School Node #{school.id}</span>
                          <h4 className="font-heading font-black text-sm text-white uppercase mt-0.5">{school.name}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${isSecured ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-carbon-900 border-white/10 text-slate-500"}`}>
                          {isSecured ? "Adoption Funded" : "Pending Partner"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-carbon-900/60 p-2.5 rounded border border-white/5">
                          <span className="text-slate-500 text-[10px] block uppercase">District</span>
                          <strong className="text-white block">{school.district}</strong>
                        </div>
                        <div className="bg-carbon-900/60 p-2.5 rounded border border-white/5">
                          <span className="text-slate-500 text-[10px] block uppercase">State</span>
                          <strong className="text-white block">{school.state}</strong>
                        </div>
                        <div className="bg-carbon-900/60 p-2.5 rounded border border-white/5 col-span-2">
                          <span className="text-slate-500 text-[10px] block uppercase">Science Toolkits Provided</span>
                          <strong className="text-emerald-400 block">{school.kits}</strong>
                        </div>
                        <div className="bg-carbon-900/60 p-2.5 rounded border border-white/5 col-span-2">
                          <span className="text-slate-500 text-[10px] block uppercase">Students Mentored per Season</span>
                          <strong className="text-white block">{school.mentored} Elementary Students</strong>
                        </div>
                      </div>

                      <div className="bg-carbon-900/40 p-3 rounded border border-white/5 font-sans text-xs text-slate-300">
                        Corporate contributions under Indian CSR Section 135 directly supply these classroom toolkits and cover mentor transportation from the IIITDM Kurnool campus.
                      </div>
                    </div>
                  );
                })() : (
                  <div className="py-12 text-center text-slate-500 font-mono text-xs">
                    Select any pin on the map to view district science adoption details.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
