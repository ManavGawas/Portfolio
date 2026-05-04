"use client";

import { motion } from "framer-motion";
import { Search, Database, Cpu, Cog, Server, Activity, Terminal, Cloud, Layers } from "lucide-react";

const pipelineNodes = [
  { id: "sdr", label: "SDR Agents", desc: "Edge Intercept", icon: Search, delay: 0 },
  { id: "routing", label: "Go Router", desc: "Goroutine Concurrency", icon: Cpu, delay: 0.2 },
  { id: "kafka", label: "Kafka Brokers", desc: "Redpanda Event Stream", icon: Activity, delay: 0.4 },
  { id: "eks", label: "Orchestration", desc: "AWS EKS Cluster", icon: Cog, delay: 0.6 },
  { id: "db", label: "Persistence", desc: "Primary PostgreSQL", icon: Database, delay: 0.8 }
];

const systemSpecs = [
  {
    category: "Languages & Core",
    icon: Terminal,
    items: ["Go (High-Concurrency)", "Python (AI/ML Pipelines)", "TypeScript (Full-Stack)"]
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    items: ["AWS (EKS, EC2, S3)", "Docker & Kubernetes", "Terraform / CI-CD"]
  },
  {
    category: "Messaging & Routing",
    icon: Activity,
    items: ["Apache Kafka", "gRPC Protocol", "Real-time WebSockets"]
  },
  {
    category: "Database Systems",
    icon: Database,
    items: ["PostgreSQL (Primary)", "Supabase (PostgREST)", "Redis (Caching)"]
  },
  {
    category: "AI & Vector Search",
    icon: BrainCircuit, // Using standard Layers as fallback if BrainCircuit isn't in your lucide version
    items: ["LangChain & LLMs", "Vector DBs (Pinecone)", "Semantic Routing"]
  },
  {
    category: "Client Architecture",
    icon: LayoutTemplate, // Using standard Server/Layers as fallback
    items: ["Next.js (Edge Rendered)", "React & Framer Motion", "Flutter (Mobile Native)"]
  }
];

// Fallback icons if specific ones fail
function BrainCircuit(props: any) { return <Layers {...props} />; }
function LayoutTemplate(props: any) { return <Server {...props} />; }


export default function ArchitectureMap() {
  return (
    <section className="relative w-full py-32 px-6 z-10 bg-[#030303] overflow-hidden spatial-stack perspective-1000">
      
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-950/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="text-center mb-20 max-w-3xl mx-auto relative z-10">
        <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">
          System Architecture
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          The Enterprise Blueprint.
        </h3>
      </div>

      {/* The Master Blueprint Console */}
      <div className="relative w-full max-w-6xl mx-auto rounded-3xl bg-[#050505]/80 border border-white/10 shadow-2xl overflow-hidden spatial-stack">
        
        {/* Architectural Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        ></div>

        {/* TOP HALF: The Pipeline Flow */}
        <div className="relative z-10 p-10 md:p-16 border-b border-white/5">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Live Data Topology</span>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 w-full">
            
            {/* The Connecting Animated Data Stream */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] -translate-y-1/2 z-0 hidden md:block overflow-hidden bg-white/5 rounded-full">
               <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-[50%] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              />
            </div>

            {/* The Nodes */}
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: node.delay }}
                  className="relative z-10 flex flex-col items-center group w-full md:w-auto"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-4 shadow-xl transition-colors group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5"
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400/80 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                  <div className="text-center">
                    <h4 className="text-white font-bold text-sm tracking-tight mb-1">{node.label}</h4>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{node.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM HALF: System Specifications Panel */}
        <div className="relative z-10 bg-[#080808] p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {systemSpecs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-3">
                    <Icon className="w-5 h-5 text-cyan-400/60" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{spec.category}</h4>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {spec.items.map((item, j) => (
                      <li key={j} className="text-xs font-mono text-white/50 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}