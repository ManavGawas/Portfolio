"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Cpu, Workflow, Layers, TerminalSquare, Activity, 
  ExternalLink, ShieldCheck, Network, Globe, Lock 
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

// Unique Terminal-Style 3D Card
function TerminalProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    
    // Add requestAnimationFrame to throttle state updates
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative w-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md cursor-crosshair group shadow-2xl hover:shadow-[0_0_40px_rgba(var(--glow-color),0.15)] transition-all duration-500 overflow-hidden`}
      style={{ 
        ...({ '--glow-color': project.glowColor } as React.CSSProperties),
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
    >
      {/* Top Terminal Bar */}
      <div className="w-full bg-transparent border-b border-white/5 px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <TerminalSquare className="w-4 h-4 text-white/30" />
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">NODE_{index + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1.5 ${
            project.status === 'PRIVATE_REPO' 
              ? 'text-yellow-400/80 bg-yellow-500/10 border-yellow-500/20' 
              : 'text-emerald-400/80 bg-emerald-500/10 border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              project.status === 'PRIVATE_REPO' ? 'bg-yellow-400' : 'bg-emerald-400'
            }`}></span>
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex-grow flex flex-col z-20" style={{ transform: "translateZ(30px)" }}>
        <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          <Icon className="w-6 h-6 text-white/80 group-hover:text-white" />
        </div>
        
        <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {project.title}
        </h4>
        
        <p className="text-white/50 text-sm leading-relaxed font-light mb-8 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6" style={{ transform: "translateZ(40px)" }}>
          {project.tech.map((t: string, i: number) => (
            <span 
              key={i} 
              className="px-2 py-1 text-[10px] font-mono text-white/60 bg-white/5 border border-white/10 rounded group-hover:border-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic Footer Button (GitHub vs Live Link) */}
      <div className="px-6 pb-6 pt-0 z-20" style={{ transform: "translateZ(50px)" }}>
        {project.github ? (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-mono text-xs tracking-widest uppercase transition-all"
          >
            <Github className="w-4 h-4" />
            View Source Architecture
          </a>
        ) : project.live ? (
          <a 
            href={project.live} 
            target="_blank" 
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-widest uppercase transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Deployment
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 border border-white/10 text-white/30 font-mono text-xs tracking-widest uppercase cursor-not-allowed">
            <Lock className="w-4 h-4" />
            Architecture Private
          </div>
        )}
      </div>

      {/* Subtle Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-transparent transition-colors duration-500 pointer-events-none z-0" />
    </motion.div>
  );
}

export default function ProjectsGrid() {
  const projects = [
    {
      title: "Autonomous Agent Architectures",
      description: "A production repository hosting decoupled cognitive workflows. Built to automate outbound pipelines, intercept API webhooks, and map dialogue nodes with sub-500ms voice execution.",
      status: "LIVE_SYSTEM",
      icon: Workflow,
      tech: ["n8n", "Voiceflow", "Vapi", "PostgreSQL"],
      github: "https://github.com/ManavGawas/autonomous-agent-deployments",
      live: null,
      glowColor: "34, 211, 238" // Cyan
    },
    {
      title: "Spatial Ride Sharing Engine",
      description: "High-concurrency spatial routing backend for a ride-sharing topology. Utilizes geospatial indexing for sub-second driver-to-rider matching and WebSockets for live telemetry.",
      status: "SCALED",
      icon: Network,
      tech: ["Node.js", "Redis", "PostgreSQL", "WebSockets"],
      github: "https://github.com/ManavGawas", 
      live: null,
      glowColor: "59, 130, 246" // Blue
    },
    {
      title: "CyberSecurity Assessment",
      description: "An automated vulnerability scanning and compliance reporting engine. Orchestrates payload delivery and parses security logs to generate actionable threat intelligence metrics.",
      status: "SECURE",
      icon: ShieldCheck,
      tech: ["Python", "Bash", "OWASP", "Docker"],
      github: "https://github.com/ManavGawas", 
      live: null,
      glowColor: "244, 63, 94" // Rose/Red
    },
    {
      title: "ForeFitness Architecture",
      description: "A comprehensive hypertrophy and strength training progressive overload tracker. Features dynamic split scheduling (PPL, Upper/Lower) and strict workout telemetry logging.",
      status: "STABLE",
      icon: Activity,
      tech: ["React Native", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/ManavGawas", 
      live: null,
      glowColor: "249, 115, 22" // Orange
    },
    {
      title: "ImpactLoop Volunteer App",
      description: "A social-impact resource allocation platform. Matches volunteers to local directives using algorithmic scheduling and gamified contribution tracking layers.",
      status: "DEPLOYED",
      icon: Layers,
      tech: ["Next.js", "Supabase", "Tailwind CSS"],
      github: "https://github.com/ManavGawas", 
      live: null,
      glowColor: "234, 179, 8" // Yellow
    },
    {
      title: "Viva Computech Portal",
      description: "Corporate web presence and lead-capture portal for a hardware and IT solutions provider. Optimized for extreme SEO performance and sub-100ms Largest Contentful Paint (LCP).",
      status: "PRIVATE_REPO",
      icon: Globe,
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      github: null, // Private repo triggers the live link button
      live: "https://viva-computech.onrender.com",
      glowColor: "20, 184, 166" // Teal
    }
  ];

  return (
    <section id="projects" className="relative w-full py-32 px-6 z-10 bg-transparent overflow-hidden perspective-1000 border-t border-white/5">
      
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 inline-flex items-center gap-2">
            <Activity className="w-3 h-3 text-white/50" />
            <span className="text-white/50 font-mono text-[10px] tracking-[0.2em] uppercase">Deployment Logs</span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            System Installations.
          </h3>
          <p className="mt-4 text-white/40 max-w-xl font-light text-sm md:text-base">
            Review the source code and architectural patterns of my active deployments. No boilerplate. Strictly production-grade logic.
          </p>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <TerminalProjectCard key={index} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}