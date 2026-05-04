"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Terminal, Zap, ChevronRight } from "lucide-react";

// Deep 3D Spatial Card Component
function SpatialTimelineCard({ data, index }: { data: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  // Intense tilt angles for extreme 3D feel
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isSyncora = data.id === "syncora";
  const themeColor = isSyncora ? "cyan" : "purple";
  const glowClass = isSyncora ? "shadow-[0_0_50px_rgba(34,211,238,0.15)]" : "shadow-[0_0_50px_rgba(168,85,247,0.15)]";
  const borderHoverClass = isSyncora ? "group-hover:border-cyan-500/50" : "group-hover:border-purple-500/50";
  const textClass = isSyncora ? "text-cyan-400" : "text-purple-400";
  const bgGlowClass = isSyncora ? "bg-cyan-500/20" : "bg-purple-500/20";
  const Icon = isSyncora ? Zap : Terminal;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full rounded-3xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl p-8 md:p-12 cursor-crosshair group ${glowClass} ${borderHoverClass} transition-colors duration-500`}
    >
      {/* Dynamic 3D Glare */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, ${isSyncora ? 'rgba(34,211,238,0.1)' : 'rgba(168,85,247,0.1)'} 0%, transparent 60%)`,
          transform: "translateZ(1px)"
        }}
      />

      {/* Decorative Background Node */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"
        style={{ backgroundColor: isSyncora ? '#0891b2' : '#7e22ce', transform: "translateZ(-20px)" }}
      />

      {/* LAYER 1: Header Context (Pops out slightly) */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${bgGlowClass} border border-white/10`}>
              <Icon className={`w-5 h-5 ${textClass}`} />
            </div>
            <span className={`${textClass} font-mono text-sm tracking-widest uppercase`}>{data.company}</span>
          </div>
          <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{data.role}</h4>
        </div>
        <div className="px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 w-fit text-xs font-mono text-white/60 shadow-inner flex items-center gap-2 h-fit">
          <span className={`w-2 h-2 rounded-full ${isSyncora ? 'bg-cyan-400 animate-pulse' : 'bg-white/30'}`}></span>
          {data.period}
        </div>
      </div>

      {/* LAYER 2: Main Description (Pops out moderately) */}
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="relative z-20 mb-8">
        <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
          {data.description}
        </p>
        
        <div className="mt-6 space-y-4">
          {data.highlights.map((highlight: string, i: number) => (
            <div key={i} className="flex gap-4 text-sm md:text-base text-white/60 items-start">
              <ChevronRight className={`w-5 h-5 ${textClass} shrink-0 mt-0.5`} />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LAYER 3: Tech Stack (Pops out to the extreme front) */}
      <div style={{ transform: "translateZ(80px)" }} className="relative z-30 pt-6 flex flex-wrap gap-3">
        {data.tech.map((t: string, i: number) => (
          <span 
            key={i} 
            className="px-4 py-2 text-xs font-mono text-white/80 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl group-hover:border-white/20 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically for the minimap line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineData = [
    {
      id: "syncora",
      role: "Founder & Architect",
      company: "Syncora Systems",
      period: "Feb 2026 — Present",
      description: "Pivoted to establish Syncora, architecting autonomous B2B revenue engines. Designing high-concurrency routing systems to eliminate human latency in enterprise operations.",
      highlights: [
        "Engineering sub-300ms AI Voice Agents capable of natural language parsing and automated CRM mutations.",
        "Establishing strict Row-Level Security (RLS) architectures for multi-tenant data isolation."
      ],
      tech: ["Go", "Kafka", "React", "Supabase", "AI Agents"]
    },
    {
      id: "viva",
      role: "Full-Stack Developer",
      company: "Viva Computech",
      period: "Jan 2026 — Feb 2026",
      description: "Spearheaded the 0-to-1 development of the company's full-stack digital business portal, operating with a focus on client acquisition flows and system availability.",
      highlights: [
        "Automated the capture, validation, and storage of customer inquiries, eliminating manual data entry.",
        "Deployed optimized REST APIs via Express/MongoDB on Render, ensuring stable and responsive UI/UX."
      ],
      tech: ["Express.js", "MongoDB", "React", "Render"]
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 z-10 bg-[#030303] spatial-stack perspective-1000">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* LEFT PANE: The Sticky Console */}
        <div className="lg:w-1/3 relative z-20">
          {/* Sticks right under the top of the viewport */}
          <div className="sticky top-32 flex flex-col">
            
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Corporate
            </h2>
            <h3 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-12 drop-shadow-lg">
              Professional <br/> Experience
            </h3>

            {/* Glowing 3D Minimap */}
            <div className="relative pl-6 border-l-2 border-white/5 h-48 ml-2">
              {/* Dynamic Laser Line */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              />
              
              <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
              <p className="text-sm font-mono text-white/50 -mt-1 uppercase tracking-widest">Initialization</p>
              
              <div className="absolute bottom-0 left-[-7px] w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-purple-500"></div>
              <p className="absolute bottom-0 text-sm font-mono text-white/50 -mb-1 uppercase tracking-widest">Deployment</p>
            </div>

          </div>
        </div>

        {/* RIGHT PANE: The Massive 3D Scrolling Cards */}
        <div className="lg:w-2/3 flex flex-col gap-16 md:gap-32 pb-32 spatial-stack">
          {timelineData.map((data, index) => (
            <SpatialTimelineCard key={data.id} data={data} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}