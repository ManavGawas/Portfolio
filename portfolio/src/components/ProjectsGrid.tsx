"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Workflow, TerminalSquare, Activity, 
  ExternalLink, ShieldCheck, Globe, Lock, Server,
  ChevronLeft, ChevronRight
} from "lucide-react";

// Native SVG replacement since Lucide removed Brand Icons
const Github = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

function TerminalProjectCard({ project, index, isActive }: { project: any, index: number, isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (!isActive) return;
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !rectRef.current) return;
    const rect = rectRef.current;
    requestAnimationFrame(() => {
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex flex-col md:flex-row rounded-3xl border border-white/10 bg-[#030303]/90 backdrop-blur-xl group overflow-hidden will-change-transform ${isActive ? 'cursor-crosshair shadow-[0_0_80px_rgba(var(--glow-color),0.1)]' : 'cursor-pointer'}`}
      style={{ 
        ...({ '--glow-color': project.glowColor } as React.CSSProperties),
        rotateX: isActive ? rotateX : 0, 
        rotateY: isActive ? rotateY : 0, 
        transformStyle: "preserve-3d" 
      }}
    >
      {/* Visual Terminal Side Panel */}
      <div className="relative w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-6 flex flex-col bg-[#010101] overflow-hidden">
        
        {/* Subtle Ambient Glow Linked to Project - Only visible when active */}
        <div 
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent blur-[80px] rounded-full transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`} 
          style={{ backgroundImage: `radial-gradient(circle, rgb(${project.glowColor}) 0%, transparent 70%)` }}
        ></div>
        
        {/* Terminal Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 z-10">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-4 h-4 text-white/30" />
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">NODE_{index + 1}</span>
          </div>
          <div className="flex gap-1.5 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
          </div>
        </div>

        {/* Large Faded Icon */}
        <div className="flex-grow flex items-center justify-center relative my-4" style={{ transform: "translateZ(30px)" }}>
           <Icon className={`w-20 h-20 transition-colors duration-700 ${isActive ? 'text-white/[0.08]' : 'text-white/[0.02]'}`} />
        </div>

        {/* Faux Terminal Output */}
        <div className="mt-auto z-10 font-mono text-[9px] text-white/30 space-y-0.5 hidden md:block">
          <p className="text-green-400/50">~ $ ./deploy {project.id}</p>
          <p>&gt; Connection established.</p>
          <p>&gt; Status: <span className="text-cyan-400">OPTIMAL</span></p>
          {isActive && <p className="animate-pulse">_</p>}
        </div>
      </div>

      {/* Main Data Side Panel */}
      <div className={`p-5 md:p-6 flex-grow flex flex-col justify-center z-20 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`} style={{ transform: "translateZ(50px)" }}>
        
        <p className="text-[10px] font-mono text-cyan-400/80 bg-cyan-900/20 px-3 py-1 border border-cyan-500/20 rounded-full w-max tracking-widest mb-3">
          {project.category}
        </p>
        
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-2xl font-bold text-white tracking-tighter">
            {project.title}
          </h4>
          <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border flex items-center gap-1.5 flex-shrink-0 ml-4 ${
            project.status === 'PRIVATE_REPO' 
              ? 'text-yellow-400/80 bg-yellow-500/10 border-yellow-500/20' 
              : 'text-emerald-400/80 bg-emerald-500/10 border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'animate-pulse' : ''} ${
              project.status === 'PRIVATE_REPO' ? 'bg-yellow-400' : 'bg-emerald-400'
            }`}></span>
            {project.status}
          </span>
        </div>
        
        <p className="text-white/60 text-sm leading-relaxed font-light mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5" style={{ transform: "translateZ(60px)" }}>
          {project.tech.map((t: string, i: number) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-[10px] font-mono text-cyan-400/80 border border-cyan-500/20 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className={`mt-auto transition-all ${isActive ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`} style={{ transform: "translateZ(80px)" }}>
          {project.github ? (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black hover:bg-cyan-400 font-mono text-xs tracking-widest uppercase transition-all duration-500"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          ) : project.live ? (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 font-mono text-xs tracking-widest uppercase transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/30 font-mono text-xs tracking-widest uppercase cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Private
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "01",
      title: "Syncora Dark Pool",
      category: "QUANT_FINANCE",
      description: "High-frequency trading matching engine for off-exchange institutional liquidity. Implements zero-impact algorithmic order execution.",
      status: "LIVE_SYSTEM",
      icon: Activity,
      tech: ["C++", "Quantitative System Architecture", "High-Throughput Data Pipelines"],
      github: "https://github.com/ManavGawas/syncora-dark-pool",
      live: null,
      glowColor: "34, 211, 238" // Cyan
    },
    {
      id: "02",
      title: "Distributed Orchestrator",
      category: "SYS_ARCH",
      description: "Fault-tolerant node manager and task queue for distributed microservices. Features leader election and low-latency gRPC inter-node communication.",
      status: "DEPLOYED",
      icon: Server,
      tech: ["Golang", "gRPC", "Docker", "PostgreSQL", "Distributed Cloud Infrastructure"],
      github: "https://github.com/ManavGawas/Distributed-Systems-Orchestrator",
      live: null,
      glowColor: "168, 85, 247" // Purple
    },
    {
      id: "03",
      title: "Syncora Sentinel",
      category: "THREAT_DETECTION",
      description: "Autonomous telemetry pipeline and security monitor. Continuously analyzes network traffic and API payloads for real-time anomaly detection.",
      status: "SECURE",
      icon: ShieldCheck,
      tech: ["Golang", "API Integration", "Event-Driven Architecture", "Real-Time Data Streaming"],
      github: "https://github.com/ManavGawas/syncora-sentinel",
      live: null,
      glowColor: "34, 197, 94" // Green
    },
    {
      id: "04",
      title: "Autonomous Agents",
      category: "AI // WORKFLOWS",
      description: "Production repository hosting decoupled cognitive workflows. Built to automate outbound pipelines and map dialogue nodes with sub-500ms execution.",
      status: "LIVE_SYSTEM",
      icon: Workflow,
      tech: ["n8n", "Voiceflow", "Vapi", "PostgreSQL"],
      github: "https://github.com/ManavGawas/autonomous-agent-deployments",
      live: null,
      glowColor: "34, 211, 238" // Cyan
    },
    {
      id: "05",
      title: "ForeFitness Architecture",
      category: "TELEMETRY",
      description: "Hypertrophy and strength training progressive overload tracker. Features dynamic split scheduling and strict workout telemetry logging.",
      status: "STABLE",
      icon: Activity,
      tech: ["React Native", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/ManavGawas", 
      live: null,
      glowColor: "249, 115, 22" // Orange
    },
    {
      id: "06",
      title: "Viva Computech Portal",
      category: "IT_SOLUTIONS",
      description: "Corporate web presence and lead-capture portal. Optimized for extreme SEO performance and sub-100ms Largest Contentful Paint.",
      status: "PRIVATE_REPO",
      icon: Globe,
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      github: null, 
      live: "https://viva-computech.onrender.com",
      glowColor: "20, 184, 166" // Teal
    }
  ];

  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section id="projects" className="relative w-full py-24 md:py-32 bg-transparent z-10 overflow-hidden perspective-1000">
      
      {/* STATIC Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full relative z-10">
        
        {/* Header Block */}
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 inline-flex items-center gap-2">
              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase">Deployment Logs</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              System Installations.
            </h3>
          </div>
          
          {/* Elite Navigation Controls */}
          <div className="flex items-center gap-4 border border-white/10 bg-[#050505]/80 backdrop-blur-sm p-2 rounded-2xl w-max">
            <button 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-mono text-xs text-white/50 w-20 text-center tracking-widest">
              0{activeIndex + 1} <span className="text-white/20">/</span> 0{projects.length}
            </div>
            <button 
              onClick={handleNext} 
              disabled={activeIndex === projects.length - 1}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SMALLER Spatial Coverflow Carousel Track */}
        <div className="relative h-[55vh] min-h-[420px] max-h-[520px] w-full flex items-center justify-center">
          {projects.map((project, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;

            // Only render cards that are close to the active index for extreme performance
            if (Math.abs(offset) > 2) return null; 

            return (
              <motion.div
                key={project.id}
                onClick={() => !isActive && setActiveIndex(index)}
                initial={false}
                animate={{
                  x: `${offset * 105}%`, 
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.3,
                  rotateY: isActive ? 0 : offset < 0 ? 12 : -12, 
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 30, 
                  mass: 1 
                }}
                className="absolute w-[85vw] md:w-[600px] lg:w-[750px] h-full"
              >
                <TerminalProjectCard 
                  project={project} 
                  index={index} 
                  isActive={isActive} 
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}