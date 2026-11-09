export interface TeamMember {
  id?: string;
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

// Official Chapter Office Bearers (The only officially appointed officers)
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
export const subsystemLeads: TeamMember[] = [];
export const managementTeam: TeamMember[] = [];

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
    responsibility: "Front and rear double wishbone kinematics, anti-squat / anti-dive geometry, and custom 3-way damper valving.",
    initials: "VS",
    email: "vineet.sharma@iiitk.ac.in",
    accent: "border-lift-blue/40 bg-lift-blue/10 text-lift-blue"
  },
  {
    name: "Pranjal Mishra",
    role: "Chassis & Roll Cage Lead",
    subsystem: "Chassis",
    responsibility: "AISI 4030 Chromoly tubular roll cage fabrication, structural triangulation, and ANSYS FEA impact compliance (SF > 2.0).",
    initials: "PM",
    email: "pranjal.mishra@iiitk.ac.in",
    accent: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
  },
  {
    name: "Shanu Jha",
    role: "Brakes & Driver Ergonomics Lead",
    subsystem: "Brakes",
    responsibility: "Dual-circuit hydraulic master cylinder balancing (78:22 bias), pedal box ergonomics, and emergency braking lockup validation.",
    initials: "SJ",
    email: "shanu.jha@iiitk.ac.in",
    accent: "border-amber-500/40 bg-amber-500/10 text-amber-400"
  },
  {
    name: "Jatin Sharma",
    role: "Electronics, DAQ & Publicity Lead",
    subsystem: "Electronics",
    responsibility: "Over-travel brake switches, kill-switch wiring harness, telemetry data logging node, and media documentation.",
    initials: "JS",
    email: "jatin.sharma@iiitk.ac.in",
    accent: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
  },
  {
    name: "Prashant Kumar",
    role: "Safety, Scrutineering & Pit Manager",
    subsystem: "Management",
    responsibility: "BAJA SAEINDIA technical inspection compliance, driver safety gear audit, pit stop tools, and paddock reception logistics.",
    initials: "PK",
    email: "prashant.kumar@iiitk.ac.in",
    accent: "border-purple-500/40 bg-purple-500/10 text-purple-400"
  },
  {
    name: "Karthikeya",
    role: "Program & Race Telemetry Coordinator",
    subsystem: "Management",
    responsibility: "Track trial timing, endurance race fuel stint planning, AWIM program outreach, and dynamic trial schedules.",
    initials: "KT",
    email: "karthikeya@iiitk.ac.in",
    accent: "border-rose-500/40 bg-rose-500/10 text-rose-400"
  }
];
