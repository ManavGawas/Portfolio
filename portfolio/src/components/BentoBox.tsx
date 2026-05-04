"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Timer, BrainCircuit, Activity, Database, Cloud, Terminal, Cpu, Braces, Server, Code2 } from "lucide-react";

// Elite Spatial Card: Integrates 3D Tilt, Spotlight, AND Spatial Entry
function SpatialBentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, translateZ: -200 }}
      whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505]/60 backdrop-blur-xl transition-colors duration-500 hover:border-white/20 shadow-2xl spatial-stack cursor-crosshair ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.08), transparent 40%)`,
        }}
      />
      
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full spatial-stack">
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoBox() {
  const techStack = [
    { name: "Go", icon: Terminal }, { name: "Kafka", icon: Activity }, 
    { name: "Postgres", icon: Database }, { name: "AWS", icon: Cloud }, 
    { name: "Next.js", icon: Code2 }, { name: "Docker", icon: Server },
    { name: "Node.js", icon: Braces }, { name: "Supabase", icon: Database }
  ];

  return (
    <section className="relative w-full min-h-screen py-32 px-6 flex flex-col items-center z-10 bg-[#030303] overflow-hidden spatial-perspective spatial-stack perspective-1000">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-950/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-950/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="text-center mb-20 max-w-2xl mx-auto relative z-10">
        <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">
          About
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          Systems thinking meets <br/> relentless execution.
        </h3>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)] gap-6 spatial-stack">
        
        {/* Identity Card + System Primitives (Delay 0) */}
        <div className="md:col-span-2 md:row-span-2 spatial-stack">
          <SpatialBentoCard delay={0} className="h-full p-10 flex flex-col group shadow-2xl spatial-stack relative overflow-hidden">
            
            <div className="flex justify-between items-start mb-10">
              <h4 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">
                Architect. <br/>
                Founder. <br/>
                Competitor.
              </h4>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 overflow-hidden relative grayscale opacity-70 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 hidden sm:block shadow-[0_0_30px_rgba(34,211,238,0)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <img src="/gymmate-ss.png" alt="Profile" className="object-cover w-full h-full" />
              </div>
            </div>
            
            <p className="text-white/60 font-light leading-relaxed max-w-lg text-base md:text-lg border-l-2 border-cyan-500/30 pl-6 mb-12">
              Engineering velocity is defined by massive leverage. I don't just write code; I design high-concurrency routing systems and autonomous RevOps platforms that scale predictably.
            </p>

            {/* INTEGRATED SYSTEM PRIMITIVES */}
            <div className="mt-auto border-t border-white/10 pt-8 w-full">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">System Primitives</h4>
                  <p className="text-white/40 text-xs font-mono">Frameworks fade. Protocols endure.</p>
                </div>
              </div>
              
              {/* Native CSS mask for smooth fade-in/out on the edges of the scrolling marquee */}
              <div 
                className="w-full flex overflow-hidden relative z-10"
                style={{ 
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
                }}
              >
                <motion.div 
                  animate={{ x: [0, -1000] }} 
                  transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                  className="flex items-center gap-10 whitespace-nowrap pt-2"
                >
                  {[...techStack, ...techStack, ...techStack].map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors duration-300">
                        <Icon className="w-5 h-5"/> 
                        <span className="font-mono text-sm">{tech.name}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

          </SpatialBentoCard>
        </div>

        {/* Athlete Card (Delay 0.2) */}
        <div className="spatial-stack">
          <SpatialBentoCard delay={0.2} className="h-full p-8 shadow-2xl spatial-stack flex flex-col justify-center">
            <div className="p-3 bg-cyan-500/10 rounded-xl w-fit mb-6 border border-cyan-500/20">
              <Timer className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">The Discipline</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              State-Level Athlete. The exact same relentless mechanics, hypertrophy tracking, and pain-tolerance forged on the track now construct unbreakable cloud infrastructure.
            </p>
          </SpatialBentoCard>
        </div>

        {/* Education Card (Delay 0.4) */}
        <div className="spatial-stack">
          <SpatialBentoCard delay={0.4} className="h-full p-8 flex flex-col justify-center shadow-2xl spatial-stack">
            <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-6 border border-purple-500/20">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Theoretical Base</h4>
              <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-4">BSc Computer Science</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Formal specialization in deep Data Structures, AI, and distributed Cloud Computing at SVKM's Mithibai College.
              </p>
            </div>
          </SpatialBentoCard>
        </div>

      </div>
    </section>
  );
}