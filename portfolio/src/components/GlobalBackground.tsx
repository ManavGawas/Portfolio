"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  
  // We use state to hold our randomly generated mathematics.
  // This prevents React Hydration errors between server and client.
  const [engine, setEngine] = useState({ 
    monoliths: [] as any[], 
    particles: [] as any[], 
    dataBeams: [] as any[] 
  });

  useEffect(() => {
    // 1. Generate 3D Dark Monoliths (Simulating extreme depth of field)
    const monoliths = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      width: Math.random() * 80 + 40,
      height: Math.random() * 150 + 100,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      // Pushing elements deep into the Z-axis for physical 3D space
      z: Math.random() * -800 - 200, 
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      duration: Math.random() * 30 + 30, // Extremely slow, majestic rotation
      // Blur increases the further back the object is
      blur: Math.random() * 6 + 2 
    }));

    // 2. Generate Ambient Quantum Dust
    const particles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1
    }));

    // 3. Generate Vertical Data Beams (High-speed system traces)
    const dataBeams = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      height: Math.random() * 150 + 50,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 7,
      color: Math.random() > 0.5 ? 'from-cyan-500/40' : 'from-purple-500/40'
    }));

    setEngine({ monoliths, particles, dataBeams });
    setMounted(true);
  }, []);

  // Return a pure black void until the math is calculated
  if (!mounted) return <div className="fixed inset-0 bg-[#010101] z-[-1]" />;

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-[100dvh] z-[-1] bg-[#010101] overflow-hidden pointer-events-none"
      style={{ perspective: '1200px' }} // The crucial property that enables true 3D space
    >
      {/* --- AMBIENT LIGHTING EXPOSURE --- */}
      <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vw] bg-cyan-900/10 blur-[150px] rounded-full transform-gpu"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full transform-gpu"></div>

      {/* --- THE FLOOR: Perspective Wireframe Grid --- */}
      <div 
        className="absolute bottom-[-20%] left-[-50%] w-[200vw] h-[60vh] opacity-20 transform-gpu"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.1) 1px, transparent 1px),
                            linear-gradient(to top, rgba(34,211,238,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: 'rotateX(80deg) translateZ(-100px)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
        }}
      />

      {/* --- THE MONOLITHS (3D Dark Glass Architecture) --- */}
      {engine.monoliths.map((mono) => (
        <motion.div
          key={`mono-${mono.id}`}
          className="absolute border border-white/[0.03] bg-[#050505]/40 transform-gpu will-change-transform"
          style={{
            width: mono.width,
            height: mono.height,
            left: mono.left,
            top: mono.top,
            filter: `blur(${mono.blur}px)`, // Depth of Field effect
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.01)'
          }}
          initial={{ 
            rotateX: mono.rotateX, 
            rotateY: mono.rotateY, 
            translateZ: mono.z 
          }}
          animate={{ 
            rotateX: mono.rotateX + 180, 
            rotateY: mono.rotateY + 180 
          }}
          transition={{ 
            duration: mono.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}

      {/* --- HIGH-SPEED DATA BEAMS --- */}
      {engine.dataBeams.map((beam) => (
        <motion.div
          key={`beam-${beam.id}`}
          className={`absolute w-[1px] bg-gradient-to-b ${beam.color} to-transparent transform-gpu will-change-transform`}
          style={{
            height: beam.height,
            left: beam.left,
            top: '-200px'
          }}
          animate={{
            y: ['0vh', '120vh']
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: "linear",
            delay: beam.delay
          }}
        />
      ))}

      {/* --- ASCENDING QUANTUM DUST --- */}
      {engine.particles.map((particle) => (
        <motion.div
          key={`dust-${particle.id}`}
          className="absolute rounded-full bg-cyan-400 transform-gpu will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(34,211,238,0.5)`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* --- VIGNETTE & SCANLINES (The Terminal Lens) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#010101_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiAvPgo8L3N2Zz4=')] opacity-30 pointer-events-none mix-blend-overlay"></div>
      
    </div>
  );
}