export interface TeamMember {
  name: string;
  role: string;
  subteam: string;
  image?: string;
  email?: string;
  linkedin?: string;
  initials: string;
}

export const facultyAdvisors: TeamMember[] = [
  { name: "Dr. S. Anand Kumar", role: "Primary Faculty Advisor", subteam: "Academic Advisory", initials: "AK", email: "anand@iiitk.ac.in" },
  { name: "Dr. Pankaj Kaushik", role: "Faculty Co-supervisor", subteam: "Academic Advisory", initials: "PK", email: "pankaj@iiitk.ac.in" }
];

// Official Chapter Office Bearers (SAEINDIA Collegiate Chapter Leadership)
export const chapterOfficers: TeamMember[] = [
  { name: "Harshit Mishra", role: "President", subteam: "Chapter Officers", initials: "HM", email: "harshit.mishra@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Ramakrishna Sen", role: "Vice President", subteam: "Chapter Officers", initials: "RS", email: "ramakrishna.sen@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Vineet Sharma", role: "Treasurer", subteam: "Chapter Officers", initials: "VS", email: "vineet.sharma@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Pranjal Mishra", role: "Secretary", subteam: "Chapter Officers", initials: "PM", email: "pranjal.mishra@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Shanu Jha", role: "Membership Chair", subteam: "Chapter Officers", initials: "SJ", email: "shanu.jha@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Jatin Sharma", role: "Publicity Chair", subteam: "Chapter Officers", initials: "JS", email: "jatin.sharma@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Prashant Kumar", role: "Reception Chair", subteam: "Chapter Officers", initials: "PK", email: "prashant.kumar@iiitk.ac.in", linkedin: "https://linkedin.com" },
  { name: "Karthikeya", role: "Program Chair", subteam: "Chapter Officers", initials: "KT", email: "karthikeya@iiitk.ac.in", linkedin: "https://linkedin.com" }
];

// Backward-compatibility aliases
export const officeBearers = chapterOfficers;
export const executiveBoard: TeamMember[] = chapterOfficers.slice(0, 4);
export const coreLeadership: TeamMember[] = chapterOfficers.slice(4);

export const subsystemLeads: TeamMember[] = [
  { name: "V. Akash", role: "Chassis & Roll Cage Lead", subteam: "Chassis", initials: "VA", email: "akash.v@iiitk.ac.in" },
  { name: "Vineet Sharma", role: "Suspension & Kinematics Lead", subteam: "Suspension", initials: "VS", email: "vineet.sharma@iiitk.ac.in" },
  { name: "Ramakrishna Sen", role: "Drivetrain & Transmission Lead", subteam: "Powertrain", initials: "RS", email: "ramakrishna.sen@iiitk.ac.in" },
  { name: "Samarth Sakhale", role: "Brakes & Steering Lead", subteam: "Brakes", initials: "SS", email: "samarth.sakhale@iiitk.ac.in" },
  { name: "Sneha Nair", role: "Electrical & DAQ Lead", subteam: "Electrical", initials: "SN", email: "sneha.nair@iiitk.ac.in" }
];

export const managementTeam: TeamMember[] = [
  { name: "Priya Patel", role: "Sponsorship & Corporate Relations Lead", subteam: "Management", initials: "PP", email: "priya.patel@iiitk.ac.in" },
  { name: "Aman Sharma", role: "Finance & Inventory Officer", subteam: "Management", initials: "AS", email: "aman.sharma@iiitk.ac.in" },
  { name: "Rohan Verma", role: "Public Relations & Media Manager", subteam: "Management", initials: "RV", email: "rohan.verma@iiitk.ac.in" }
];

export interface Alumnus {
  name: string;
  batch: string;
  company: string;
  position: string;
  location: string;
  linkedin: string;
  team: string;
  initials: string;
}

// Chapter Inception: 2025 — Zero alumni currently (Inaugural cohorts graduating 2027/2028)
export const alumniData: Alumnus[] = [];

export interface BajaMember {
  name: string;
  role: string;
  subsystem: "Chassis" | "Powertrain" | "Suspension" | "Brakes" | "Electronics" | "Management";
  responsibility: string;
  initials: string;
  email: string;
  accent: string;
}

export const bajaTeam: BajaMember[] = [
  {
    name: "Harshit Mishra",
    role: "Team Captain / Powertrain Lead",
    subsystem: "Powertrain",
    responsibility: "Honda GX430T engine tuning, CVT ratio optimization (3:1 to 0.43:1), and custom 4WD driveline integration.",
    initials: "HM",
    email: "harshit.mishra@iiitk.ac.in",
    accent: "border-apex-red/40 bg-apex-red/10 text-apex-red"
  },
  {
    name: "Ramakrishna Sen",
    role: "Vice Captain / Drivetrain Lead",
    subsystem: "Powertrain",
    responsibility: "Custom gearbox reduction packaging, differential spool setup, CV axles, and wheel torque distribution (166.2 Nm).",
    initials: "RS",
    email: "ramakrishna.sen@iiitk.ac.in",
    accent: "border-torque-orange/40 bg-torque-orange/10 text-torque-orange"
  },
  {
    name: "Vineet Sharma",
    role: "Vehicle Dynamics & Suspension Lead",
    subsystem: "Suspension",
    responsibility: "Front and rear double wishbone kinematics, anti-squat / anti-dive geometry, and custom Ohlins 3-way damper valving.",
    initials: "VS",
    email: "vineet.sharma@iiitk.ac.in",
    accent: "border-lift-blue/40 bg-lift-blue/10 text-lift-blue"
  },
  {
    name: "V. Akash",
    role: "Chassis & Roll Cage Lead",
    subsystem: "Chassis",
    responsibility: "AISI 4030 Chromoly tubular roll cage fabrication, ANSYS FEA impact load modeling (30 kN front brace, SF > 2.0).",
    initials: "VA",
    email: "akash.v@iiitk.ac.in",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
  },
  {
    name: "Samarth Sakhale",
    role: "Brakes & Steering Lead",
    subsystem: "Brakes",
    responsibility: "Dual-circuit hydraulic master cylinder balancing (78:22 bias), SS410 laser-cut rotors, and custom rack & pinion steering.",
    initials: "SS",
    email: "samarth.sakhale@iiitk.ac.in",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-400"
  },
  {
    name: "Sneha Nair",
    role: "Electronics, DAQ & Safety Lead",
    subsystem: "Electronics",
    responsibility: "Brake over-travel safety switches, emergency kill switch circuit, Hall-effect telemetry node, and live pit data acquisition.",
    initials: "SN",
    email: "sneha.nair@iiitk.ac.in",
    accent: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
  },
  {
    name: "Priya Patel",
    role: "BAJA Team Manager & Logistics",
    subsystem: "Management",
    responsibility: "BAJA SAEINDIA rulebook compliance auditing, technical inspection readiness, and national competition logistics.",
    initials: "PP",
    email: "priya.patel@iiitk.ac.in",
    accent: "border-purple-500/40 bg-purple-500/10 text-purple-400"
  },
  {
    name: "Aman Sharma",
    role: "Cost & Manufacturing Lead",
    subsystem: "Management",
    responsibility: "Bill of Materials (BOM) defense, engineering cost report, CNC part machining, and workshop tool scheduling.",
    initials: "AS",
    email: "aman.sharma@iiitk.ac.in",
    accent: "border-rose-500/40 bg-rose-500/10 text-rose-400"
  }
];
