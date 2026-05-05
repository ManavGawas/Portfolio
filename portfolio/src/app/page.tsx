"use client";

import { motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectsGrid from "@/components/ProjectsGrid";
import ArchitectureMap from "@/components/ArchitectureMap";
import AgenticWorkflows from "@/components/AgenticWorkflows"; // <-- NEW IMPORT
import BentoBox from "@/components/BentoBox";
import TerminalContact from "@/components/TerminalContact";
import QuantTerminal from "@/components/QuantTerminal";

// FocusFade fades sections in and out based on viewport
function FocusFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
      viewport={{ amount: 0.05, margin: "0px 0px -50px 0px" }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 w-full"
      style={{ willChange: "opacity, filter, transform" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent w-full selection:bg-cyan-500/30 overflow-clip">
      
      {/* BootSequence is a fixed overlay */}
      <BootSequence />
      
      {/* Hero is fully loaded instantly behind the boot screen */}
      <Hero />
      
      <FocusFade>
        <CareerTimeline />
      </FocusFade>
      
      <FocusFade>
        <ProjectsGrid />
      </FocusFade>

      <FocusFade>
        <ArchitectureMap />
      </FocusFade>

      {/* THE FIX: Added Cognitive Architecture Section Here */}
      <FocusFade>
        <AgenticWorkflows />
      </FocusFade>

      <FocusFade>
        <BentoBox />
      </FocusFade>

      <FocusFade>
        <TerminalContact />
      </FocusFade>

      <QuantTerminal />
    </main>
  );
}