"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);

  // Unmount completely after animation to free up the DOM
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500); 
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100vh" }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }} // Snaps up after 1.2s
      className="fixed top-0 left-0 w-screen h-screen z-[99999] bg-[#030303] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-md px-6 font-mono">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-cyan-400 animate-pulse rounded-sm"></div>
          {/* THE FIX: Personal Branding */}
          <h2 className="text-cyan-400 text-sm tracking-widest uppercase">M.GAWAS // SYSTEM INITIALIZATION</h2>
        </div>
        
        {/* THE FIX: Personalized Boot Logs */}
        <div className="text-white/40 text-xs flex flex-col gap-1 mb-8 h-16 overflow-hidden">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>[0.001] Booting personal portfolio daemon...</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>[0.042] Mounting professional history logs...</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>[0.105] Rendering 3D spatial environments...</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>[0.231] Establishing architectural blueprints...</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-cyan-400 font-bold">[0.400] OPERATOR AUTHENTICATED. INITIATING HANDOFF.</motion.p>
        </div>

        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circInOut" }}
            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
}