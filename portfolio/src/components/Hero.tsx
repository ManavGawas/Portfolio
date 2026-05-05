"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ShadersSphere from "./canvas/ShadersSphere";

// Custom SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l12-9.725v15.438h-24v-15.438l12 9.725z"/></svg>
);

// LEFT PANE: Abstract Stylized Drone Core (Professional Overlays)
function RoboticAIVisual() {
  return (
    <div className="relative w-64 h-64 md:w-[26rem] md:h-[26rem] flex items-center justify-center group" style={{ transformStyle: "preserve-3d" }}>
      
      <motion.div 
        animate={{ rotateZ: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[110%] h-[110%] rounded-full border border-dashed border-cyan-500/20 opacity-40" 
        style={{ transform: "translateZ(-40px)", transformStyle: "preserve-3d" }}
      />
      
      <motion.div 
        animate={{ y: [-15, 15, -15] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center justify-center"
      >
        <div className="w-48 h-56 bg-gradient-to-b from-[#111] to-[#050505] rounded-t-[3rem] rounded-b-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col items-center pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-cyan-500/20 rounded-b-md"></div>
          
          <div className="w-36 h-12 bg-[#020202] rounded-2xl border-t border-b border-white/5 flex items-center px-4 overflow-hidden relative shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
            <motion.div
              animate={{ x: ["-100%", "250%", "-100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-full bg-cyan-400/80 blur-[8px] absolute left-0"
            />
            <motion.div 
               animate={{ x: ["-200%", "200%", "-200%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] z-10 mx-auto" 
            />
          </div>

          <div className="mt-auto mb-6 flex gap-3">
            <div className="w-2 h-10 bg-white/5 rounded-full border border-white/10 shadow-inner" />
            <div className="w-2 h-12 bg-cyan-500/20 rounded-full border border-cyan-500/30 shadow-inner" />
            <div className="w-2 h-10 bg-white/5 rounded-full border border-white/10 shadow-inner" />
          </div>
        </div>

        <motion.div animate={{ rotateZ: 360, rotateX: 75 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-72 h-72 border border-cyan-500/30 rounded-full" style={{ transformStyle: "preserve-3d" }} />
        <motion.div animate={{ rotateZ: -360, rotateY: 60 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute w-80 h-80 border border-purple-500/20 rounded-full" style={{ transformStyle: "preserve-3d" }} />
      </motion.div>

      {/* Professional Data Overlays */}
      <div className="absolute top-0 left-0 bg-black/70 backdrop-blur-md border border-white/5 px-3 py-1 rounded text-[9px] font-mono text-cyan-400" style={{ transform: "translateZ(20px)" }}>
        ROLE // SYSTEMS_ARCHITECT
      </div>
      <div className="absolute bottom-4 right-0 bg-black/70 backdrop-blur-md border border-white/5 px-3 py-1 rounded text-[9px] font-mono text-white/50" style={{ transform: "translateZ(30px)" }}>
        LOCATION // MUMBAI, IN
      </div>
    </div>
  );
}

// Right-Pane Spatial Bio Card
function SpatialBioCard() {
  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#050505]/60 backdrop-blur-xl p-8 shadow-2xl z-10 text-left spatial-stack">
      <div className="relative z-10">
        <h2 className="text-cyan-400 font-mono text-xs mb-4 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          Operator Profile
        </h2>
        <p className="text-white/80 text-lg leading-relaxed font-light">
          I am a Systems Architect and the Founder of Syncora Systems. Operating out of Mumbai, I specialize in engineering <span className="text-white font-medium">high-concurrency Go backends</span>, orchestrating event-driven architectures with Kafka, and building autonomous AI pipelines that eliminate human latency in B2B operations.
        </p>
        <p className="mt-5 text-white/40 text-xs font-mono tracking-widest uppercase">
          [ 0-TO-1 EXECUTION // PRIMITIVES OVER FRAMEWORKS ]
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (sectionRef.current) {
      rectRef.current = sectionRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    
    // Add requestAnimationFrame to throttle state updates
    requestAnimationFrame(() => {
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    });
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0); 
    rectRef.current = null;
  };

  return (
    <section 
      ref={sectionRef} 
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen flex flex-col items-center justify-center z-10 px-6 overflow-hidden perspective-[2000px] bg-transparent"
    >
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1, duration: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 hidden xl:flex z-20 pointer-events-none"
      >
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-cyan-400/50"></div>
        <div className="text-[10px] font-mono tracking-widest text-cyan-400 [writing-mode:vertical-rl] rotate-180 flex items-center gap-3">
          PORTFOLIO_INDEX // <span className="text-white/40">MANAV_GAWAS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1"></span>
        </div>
        <div className="w-[1px] h-32 bg-gradient-to-t from-transparent to-cyan-400/50"></div>
      </motion.div>

      <div className="absolute top-6 right-6 hidden md:flex items-center gap-6 z-50">
        <div className="flex gap-4">
          <a href="https://github.com/ManavGawas" target="_blank" className="text-white/40 hover:text-white transition-colors"><GithubIcon className="w-5 h-5" /></a>
          <a href="https://linkedin.com/in/manavgawas" target="_blank" className="text-white/40 hover:text-[#0077b5] transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
          <a href="mailto:mail@manavgawas.com" className="text-white/40 hover:text-cyan-400 transition-colors"><MailIcon className="w-5 h-5" /></a>
        </div>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <div className="flex items-center gap-2 text-white/30 cursor-default">
          <span className="text-xs font-mono tracking-widest">COMMAND_MENU</span>
          <kbd className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-sans">⌘K</kbd>
        </div>
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto z-10 spatial-stack mt-16 md:mt-0"
      >
        
        {/* UPPER SPLIT ROW: Visual + Divider + Text */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full" style={{ transformStyle: "preserve-3d" }}>
          
          {/* LEFT PANE */}
          <motion.div 
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
            className="w-full md:w-1/2 flex justify-center items-center"
          >
            <RoboticAIVisual />
          </motion.div>

          {/* MIDDLE DIVIDER */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            className="hidden md:flex flex-col items-center justify-center relative h-[28rem] w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
          >
            <motion.div 
              animate={{ y: ["-200%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 w-[3px] h-16 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
            />
          </motion.div>

          {/* THE FIX: RIGHT PANE (Name stacked cleanly above the Bio) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
            className="w-full md:w-1/2 flex flex-col items-start"
          >
            {/* Name strictly on the right side */}
            <h1 className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[5.5rem] font-extrabold tracking-tighter leading-[0.85] text-white mb-6 drop-shadow-2xl hover:text-cyan-50 transition-colors whitespace-nowrap">
              Manav Gawas
            </h1>
            
            <SpatialBioCard />
          </motion.div>

        </div>

        {/* LOWER ROW: Buttons below both panes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{ transform: "translateZ(120px)", transformStyle: "preserve-3d" }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full relative z-30 spatial-stack"
        >
          <a 
            href="/Manav_Gawas_Resume.pdf" target="_blank"
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Extract Specs (PDF)
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </a>

          <a 
            href="/syncora" 
            className="group relative px-8 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold rounded-full transition-all hover:bg-cyan-500/20 hover:scale-105 flex items-center justify-center w-full sm:w-auto backdrop-blur-sm"
          >
            Explore Syncora Systems
          </a>
        </motion.div>

      </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
        > 
          <span className="text-[10px] uppercase tracking-[0.4em] mb-3 font-mono text-cyan-400/80">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"></div>
        </motion.div>
    </section>
  );
}