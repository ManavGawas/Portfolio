"use client";
import { motion } from "framer-motion";
import { Target, Zap, Users } from "lucide-react";

export default function SyncoraManifesto() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10 bg-transparent border-y border-white/5">
      <div className="max-w-5xl mx-auto w-full">
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-cyan-400"></div>
          <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase">
            The Startup // Syncora Systems
          </h2>
        </div>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-16 leading-tight"
        >
          B2B operations are bottlenecked by human latency. <span className="text-white/30">We are automating the revenue engine.</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          
          {/* Why this startup & Solution */}
          <div className="flex flex-col gap-4">
            <Target className="w-8 h-8 text-cyan-400 mb-2" />
            <h4 className="text-xl font-bold text-white">The Mission & Solution</h4>
            <p className="text-white/60 font-light leading-relaxed text-sm">
              Syncora was built to eliminate the operational friction in B2B workflows. We engineer autonomous, low-latency (&lt;300ms) AI voice agents that handle lead qualification, natural language date parsing, and Cal.com scheduling natively. We replace manual SDR hours with instantly scalable infrastructure.
            </p>
          </div>

          {/* Why this Tech Stack */}
          <div className="flex flex-col gap-4">
            <Zap className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-xl font-bold text-white">The Engineering Thesis</h4>
            <p className="text-white/60 font-light leading-relaxed text-sm">
              We chose Go (Goroutines) over Node.js for the core routing engine because event loops block under heavy concurrent AI streaming. Kafka absorbs enterprise traffic spikes, and Supabase guarantees military-grade RLS auth. We build primitives over frameworks to guarantee uptime.
            </p>
          </div>

          {/* Hiring / Open Source */}
          <div className="flex flex-col gap-4">
            <Users className="w-8 h-8 text-emerald-400 mb-2" />
            <h4 className="text-xl font-bold text-white">Syncora is Scaling</h4>
            <p className="text-white/60 font-light leading-relaxed text-sm mb-4">
              We are actively looking for high-agency developers and aggressive engineering interns who want to build 0-to-1 enterprise systems. If you write clean Go or understand low-level WebSocket optimization, we need to talk.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="text-emerald-400 font-mono text-xs tracking-widest uppercase border border-emerald-400/30 px-4 py-2 rounded hover:bg-emerald-400/10 transition-colors w-fit"
            >
              Apply / Join the Node
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}