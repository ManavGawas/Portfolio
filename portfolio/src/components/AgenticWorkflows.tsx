"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Workflow, Mic, BrainCircuit, Database, Webhook, Cpu } from "lucide-react";

// The Interactive 3D Node Map Visual
function NodeGraphVisual() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center perspective-[1500px]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)", backgroundSize: "40px 40px", transform: "rotateX(60deg) translateZ(-100px)", transformStyle: "preserve-3d" }}></div>

      <div className="relative w-full max-w-sm h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Central Node: n8n / Orchestrator */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
          className="absolute z-30 w-20 h-20 bg-[#0a0a0a] rounded-2xl border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center"
        >
          <Workflow className="w-8 h-8 text-cyan-400" />
          <div className="absolute -bottom-6 text-[10px] font-mono text-cyan-400 tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">n8n_CORE</div>
        </motion.div>

        {/* Node: Voiceflow / Vapi */}
        <motion.div 
          animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(40px) translateX(-100px) translateY(-60px)", transformStyle: "preserve-3d" }}
          className="absolute z-20 w-16 h-16 bg-[#0a0a0a] rounded-2xl border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center"
        >
          <Mic className="w-6 h-6 text-purple-400" />
          <div className="absolute -top-6 text-[10px] font-mono text-purple-400 tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">VAPI_SIP</div>
        </motion.div>

        {/* Node: LLM / Prompt Logic */}
        <motion.div 
          animate={{ y: [-8, 8, -8] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(60px) translateX(100px) translateY(-50px)", transformStyle: "preserve-3d" }}
          className="absolute z-20 w-16 h-16 bg-[#0a0a0a] rounded-2xl border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center"
        >
          <BrainCircuit className="w-6 h-6 text-emerald-400" />
          <div className="absolute -top-6 text-[10px] font-mono text-emerald-400 tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">LLM_LOGIC</div>
        </motion.div>

        {/* Node: RAG / Pinecone */}
        <motion.div 
          animate={{ y: [12, -12, 12] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(20px) translateX(0px) translateY(90px)", transformStyle: "preserve-3d" }}
          className="absolute z-10 w-16 h-16 bg-[#0a0a0a] rounded-2xl border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center"
        >
          <Database className="w-6 h-6 text-blue-400" />
          <div className="absolute -bottom-6 text-[10px] font-mono text-blue-400 tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md">RAG_VECTOR</div>
        </motion.div>

        {/* Animated Connecting Data Streams */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
          <motion.path d="M 120 100 Q 192 150 192 200" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="2" strokeDasharray="5 5" />
          <motion.path d="M 264 110 Q 192 150 192 200" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="2" strokeDasharray="5 5" />
          <motion.path d="M 192 200 Q 192 250 192 290" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="2" strokeDasharray="5 5" />
          
          {/* Moving particles on lines */}
          <circle r="3" fill="#22d3ee" className="animate-[dash_3s_linear_infinite]" style={{ offsetPath: "path('M 120 100 Q 192 150 192 200')" }} />
          <circle r="3" fill="#10b981" className="animate-[dash_3s_linear_infinite_reverse]" style={{ offsetPath: "path('M 264 110 Q 192 150 192 200')" }} />
        </svg>
      </div>
    </div>
  );
}

export default function AgenticWorkflows() {
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const capabilities = [
    {
      title: "Workflow Orchestration",
      icon: Webhook,
      tech: ["n8n", "Make", "Webhooks"],
      desc: "Architecting complex, multi-step automation pipelines. Intercepting API payloads and routing them dynamically without writing brittle boilerplate code."
    },
    {
      title: "Voice AI Middleware",
      icon: Mic,
      tech: ["Vapi", "Voiceflow", "ElevenLabs"],
      desc: "Deploying sub-500ms voice agents. Building visual conversational flows in Voiceflow and bridging them to telecom trunks via Vapi for real-time execution."
    },
    {
      title: "Cognitive Processing",
      icon: BrainCircuit,
      tech: ["Prompt Engineering", "LLMs", "LangChain"],
      desc: "Advanced prompt architecture designed to enforce strict JSON outputs, manage agentic decision trees, and prevent LLM hallucination during enterprise tasks."
    },
    {
      title: "Memory & Retrieval (RAG)",
      icon: Database,
      tech: ["Vector DBs", "Embeddings", "Semantic Search"],
      desc: "Injecting custom data into AI brains. Architecting Retrieval-Augmented Generation pipelines so agents can query internal PDFs and databases mid-conversation."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full py-32 px-6 z-10 bg-transparent overflow-hidden perspective-[2000px] spatial-stack border-t border-white/5"
    >
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="text-center mb-20 max-w-3xl mx-auto relative z-10">
        <h2 className="text-sm font-mono text-purple-400 tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          Cognitive Architecture
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          Agentic Workflows & AI.
        </h3>
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center spatial-stack"
      >
        
        {/* LEFT PANE: The 3D Node Visual */}
        <div className="w-full lg:w-[45%] rounded-3xl border border-white/10 bg-[#050505]/60 backdrop-blur-xl overflow-hidden shadow-2xl relative" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <div className="absolute top-4 left-4 flex items-center gap-2 z-40">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">Live Node Topology</span>
          </div>
          <NodeGraphVisual />
        </div>

        {/* RIGHT PANE: Capabilities Grid */}
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-6" style={{ transformStyle: "preserve-3d" }}>
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                className="p-6 rounded-2xl bg-[#080808] border border-white/5 hover:border-purple-500/30 transition-colors group shadow-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{cap.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed mb-4">{cap.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cap.tech.map((t, j) => (
                    <span key={j} className="px-2 py-1 text-[9px] font-mono text-purple-300/80 bg-purple-900/30 border border-purple-500/20 rounded shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}