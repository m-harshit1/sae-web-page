export interface ScoreMetric {
  label: string;
  scored: number;
  max: number;
  color: string;
}

export interface YearAchievement {
  year: string;
  milestone: string;
  desc: string;
  status: "Target" | "Completed" | "Planned";
  scores?: ScoreMetric[];
  highlights: string[];
}

export const achievementsData: Record<string, YearAchievement> = {
  "2023": {
    year: "2023",
    milestone: "Club Founding & Registration",
    desc: "SAEINDIA Collegiate Chapter established at IIITDM Kurnool. Conducted chapter elections, enrolled 35 student members, and initiated primary BAJA rollcage CAD designs.",
    status: "Completed",
    highlights: [
      "Official Chapter Registration approved by SAEINDIA Southern Section",
      "Inducted Faculty Advisors Dr. S. Anand Kumar & Dr. Pankaj Kaushik",
      "Recruited the first core chassis, powertrain, and brakes teams"
    ],
    scores: [
      { label: "Design Concept Evaluation", scored: 68, max: 100, color: "bg-apex-red" },
      { label: "Initial CAD Compliance", scored: 72, max: 100, color: "bg-torque-orange" },
      { label: "Rulebook Aptitude Index", scored: 80, max: 100, color: "bg-lift-blue" }
    ]
  },
  "2024": {
    year: "2024",
    milestone: "Prototype & FEA Validation",
    desc: "Completed extensive multi-body dynamic modeling, frame finite element analyses, and fabrication shakedowns. Formulated our primary suspension configuration parameters.",
    status: "Completed",
    highlights: [
      "FEA structural checks approved with static safety factor of 2.1",
      "Acquired Ohlins custom triple-adjustable dampers for suspension setup",
      "Completed TIG welding training for frame fabrication members"
    ],
    scores: [
      { label: "Chassis Static Rigidity", scored: 110, max: 150, color: "bg-apex-red" },
      { label: "Cost Analysis Accuracy", scored: 68, max: 100, color: "bg-torque-orange" },
      { label: "Suspension Travel Scope", scored: 85, max: 100, color: "bg-lift-blue" },
      { label: "Rules Compliance Score", scored: 45, max: 50, color: "bg-emerald-400" }
    ]
  },
  "2025": {
    year: "2025",
    milestone: "Virtual Round Qualification",
    desc: "Competed in the national BAJA SAEINDIA virtual event evaluation phases. Qualified in the design, sales presentation, and rulebook compliance panels with outstanding scores.",
    status: "Completed",
    highlights: [
      "Qualified for National Physical Round with high rank in virtual design",
      "Completed full multi-body dynamic simulation runs in ADAMS/Car software",
      "Developed custom brakes design math calculator to optimize load transfers"
    ],
    scores: [
      { label: "Virtual Design Score", scored: 125, max: 150, color: "bg-apex-red" },
      { label: "Sales Presentation Rank", scored: 78, max: 100, color: "bg-torque-orange" },
      { label: "Virtual Cost Report", scored: 82, max: 100, color: "bg-lift-blue" },
      { label: "Engineering Design Board", scored: 88, max: 100, color: "bg-emerald-400" }
    ]
  },
  "2026": {
    year: "2026",
    milestone: "National Campaign & Race Execution",
    desc: "Assembled the B-26 ATV and shipped the vehicle to Indore for the BAJA SAEINDIA Nationals. Successfully cleared technical safety checks, static evaluations, and competed in dynamic runs.",
    status: "Completed",
    highlights: [
      "Passed rigorous mechanical technical inspection on first attempt",
      "Finished overall dynamic events and secured reliable endurance run statistics",
      "AWIM Outreach program presented as a key highlight to competition judges"
    ],
    scores: [
      { label: "Design Score", scored: 118, max: 150, color: "bg-apex-red" },
      { label: "Cost & BOM Report", scored: 75, max: 100, color: "bg-torque-orange" },
      { label: "Maneuverability Dynamic", scored: 72, max: 100, color: "bg-lift-blue" },
      { label: "Endurance Endurance Run", scored: 275, max: 400, color: "bg-emerald-400" },
      { label: "Innovation Evaluation", scored: 36, max: 50, color: "bg-purple-500" }
    ]
  },
  "2027": {
    year: "2027",
    milestone: "Target: Top 25 National Standings",
    desc: "Directing next-generation designs for the upcoming cycle. Integrating a lightweight rollcage design, generative upright components, and transitioning to high-efficiency EV parameters.",
    status: "Target",
    highlights: [
      "Optimize AISI 4130 spaceframe to target a 15% chassis weight reduction",
      "Establish an organic-shape Generative titanium wheel upright framework",
      "Secure Title sponsorship to fund advanced 4WD system components"
    ],
    scores: [
      { label: "Design Target Score", scored: 135, max: 150, color: "bg-apex-red" },
      { label: "Cost & BOM Target", scored: 90, max: 100, color: "bg-torque-orange" },
      { label: "Maneuverability Target", scored: 85, max: 100, color: "bg-lift-blue" },
      { label: "Endurance Target", scored: 340, max: 400, color: "bg-emerald-400" },
      { label: "Innovation Target", scored: 42, max: 50, color: "bg-purple-500" }
    ]
  }
};
