"use client";

import { motion } from "framer-motion";
import { Server, Activity, ShieldAlert, ExternalLink, Map, Dumbbell } from "lucide-react";

// Custom Github Icon
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const deploymentsData = [
  {
    id: "viva",
    date: "Q1 2026",
    status: "Production",
    title: "0-to-1 Business Portal & REST APIs",
    company: "Viva Computech",
    description: "Operated with a founder's perspective to spearhead the 0-to-1 development of the company's first full-stack business portal. Engineered the entire digital presence and automated client acquisition channels.",
    tech: ["Express.js", "MongoDB", "Render", "REST APIs"],
    icon: Server,
    github: null, 
    highlights: [
      "Automated the capture, validation, and storage of customer inquiries, eliminating manual data entry.",
      "Ensured 100% responsive UI/UX and successfully managed the production deployment on Render for high availability."
    ]
  },
  {
    id: "rideshare",
    date: "2025",
    status: "Architecture",
    title: "Geospatial Ride-Sharing Engine",
    company: "Core Infrastructure",
    description: "Designed a high-throughput backend architecture for a real-time ride-sharing application, focusing on geospatial querying and state synchronization.",
    tech: ["Node.js", "WebSockets", "PostGIS", "Redis"],
    icon: Map,
    github: "https://github.com/ManavGawas",
    highlights: [
      "Implemented real-time bidirectional WebSocket communication for live driver-rider location tracking.",
      "Optimized routing algorithms and geospatial database queries for rapid driver matching."
    ]
  },
  {
    id: "impactloop",
    date: "2025",
    status: "Deployed",
    title: "ImpactLoop: Volunteer Platform",
    company: "SmartVolunteer",
    description: "Built a complex two-sided coordination platform featuring an NGO management dashboard, shift tracking, and automated certificate generation.",
    tech: ["Next.js", "TypeScript", "Supabase"],
    icon: Activity,
    github: "https://github.com/ManavGawas",
    highlights: [
      "Engineered geofencing check-ins to verify volunteer attendance on-site.",
      "Leveraged Supabase for real-time database subscriptions and strict auth policies."
    ]
  },
  {
    id: "gymmate",
    date: "2025",
    status: "Mobile",
    title: "GymMate: Fitness Intelligence",
    company: "ForceFitness",
    description: "Developed a cross-platform mobile application utilizing Flutter and Firebase for comprehensive physical activity monitoring.",
    tech: ["Flutter", "Firebase", "Dart"],
    icon: Dumbbell,
    github: "https://github.com/ManavGawas",
    highlights: [
      "Integrated workout tracking, calendar planning, and dynamic charting.",
      "Implemented Text-to-Speech (TTS) and video guidance for workout execution."
    ]
  },
  {
    id: "dwlr",
    date: "2025",
    status: "Hackathon",
    title: "Real-Time IoT & ML Forecasting",
    company: "Smart India Hackathon",
    description: "Engineered a low-latency groundwater monitoring dashboard simulating live IoT data streams.",
    tech: ["React.js", "Socket.IO", "Python ML"],
    icon: Activity,
    github: "https://github.com/ManavGawas",
    highlights: [
      "Built a high-throughput pipeline utilizing Socket.IO for real-time telemetry.",
      "Integrated machine learning forecasting models and rapid-decline alert systems."
    ]
  },
  {
    id: "cyber",
    date: "2024",
    status: "Research",
    title: "Cybersecurity Risk Model",
    company: "ML Architecture",
    description: "Built and tuned advanced machine learning models to classify user cybersecurity risk levels on a custom dataset.",
    tech: ["Python", "Scikit-Learn", "SMOTE"],
    icon: ShieldAlert,
    github: "https://github.com/ManavGawas",
    highlights: [
      "Trained Support Vector Machine (SVM), Random Forests, and K-NN models.",
      "Achieved ~94% accuracy and 100% high-risk recall on threat detection."
    ]
  }
];

export default function Deployments() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        
        {/* LEFT COLUMN: Sticky Narrative */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">
              Act III // Execution
            </h2>
            <h3 className="text-5xl font-bold tracking-tighter text-white leading-tight mb-6">
              Production <br /> Deployments.
            </h3>
            <p className="text-white/40 font-light leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-4">
              Code is a liability until it is shipped. My focus is on 0-to-1 engineering, turning theoretical architectures into high-availability production systems that drive measurable business ROI.
            </p>
            <a 
              href="https://github.com/ManavGawas" 
              target="_blank"
              className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10"
            >
              <GithubIcon className="w-5 h-5" />
              <span className="text-sm font-mono">View full repository graph</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Case Studies */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {deploymentsData.map((deployment, index) => {
            const Icon = deployment.icon;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={deployment.id} 
                className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-white/10 pb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight mb-1">{deployment.title}</h4>
                    <span className="text-cyan-400 font-mono text-sm">{deployment.company}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
                      <span className={`w-2 h-2 rounded-full ${deployment.status === 'Production' || deployment.status === 'Deployed' ? 'bg-green-400 animate-pulse' : 'bg-cyan-400'}`}></span>
                      <span className="text-xs font-mono text-white/70 uppercase">{deployment.status} // {deployment.date}</span>
                    </div>
                    {deployment.github && (
                      <a href={deployment.github} target="_blank" className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                        <GithubIcon className="w-3 h-3" /> View Source <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-white/70 font-light leading-relaxed mb-6">
                  {deployment.description}
                </p>

                <ul className="flex flex-col gap-3 mb-8">
                  {deployment.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                      <div className="mt-1"><Icon className="w-4 h-4 text-cyan-400/50" /></div>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {deployment.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono text-white/40 bg-white/5 border border-white/5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}