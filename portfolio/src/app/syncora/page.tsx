"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { 
  Cpu, Network, ShieldCheck, Zap, ArrowLeft, Terminal, Layers, Send, 
  Code2, BrainCircuit, CloudCog, PhoneCall, Database, Settings2, Activity, 
  FileText, PhoneForwarded, CreditCard, Server, Box, CheckCircle2
} from "lucide-react";
import Link from "next/link";

// Custom Syncora Logo
const SyncoraLogo = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 25L75 40V60L50 75L25 60V40L50 25Z" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="5" fill="#22d3ee"/>
  </svg>
);

// 3D Abstract Data Mesh for Hero
function SyncoraDataMesh() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
      <motion.div animate={{ rotateX: 360, rotateY: 180 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/20" style={{ transformStyle: "preserve-3d" }} />
      <motion.div animate={{ rotateX: -360, rotateY: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border-2 border-dashed border-purple-500/20" style={{ transformStyle: "preserve-3d" }} />
      
      <motion.div 
        animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 md:w-32 md:h-32 bg-[#050505] rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center justify-center relative overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <SyncoraLogo />
      </motion.div>

      <motion.div animate={{ y: [-100, 100], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0 }} className="absolute w-1 h-8 bg-cyan-400 blur-[2px] rounded-full left-[35%]" />
      <motion.div animate={{ y: [100, -100], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }} className="absolute w-1 h-12 bg-purple-400 blur-[2px] rounded-full right-[35%]" />
    </div>
  );
}

// 3D Spatial Feature Card for Capabilities
function SpatialFeatureCard({ title, desc, icon: Icon, delay }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-3xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 cursor-crosshair group shadow-xl hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-colors duration-500 hover:border-cyan-500/30 flex flex-col h-full"
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-inner">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
        <p className="text-white/50 text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function SyncoraPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Web3Forms & Terminal States
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scrambledPayload, setScrambledPayload] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    path: "",
    directive_role: "",
    linkedin: "",
    github_portfolio: "",
    payload: ""
  });

  // The Encryption & Submission Simulation Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isEncrypting) {
      const chars = "0123456789ABCDEF!@#$%^&*";
      
      // Visual Scrambling
      interval = setInterval(() => {
        setScrambledPayload((prev) => 
          Array(Math.max(formData.payload.length, 20)).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
        );
      }, 50);

      // Async Background Submission to Web3Forms
      const submitData = async () => {
        const payloadData = new FormData();
        
        // PASTE YOUR BUSINESS SYNCORA ACCESS KEY HERE
        payloadData.append("access_key", "1b8f8836-3394-460e-98a0-7633aee72c47"); 
        
        // Map form fields to Web3Forms required names
        payloadData.append("name", formData.id);
        payloadData.append("email", formData.path);
        payloadData.append("role_directive", formData.directive_role);
        payloadData.append("linkedin", formData.linkedin);
        payloadData.append("github_portfolio", formData.github_portfolio);
        payloadData.append("message", formData.payload);
        payloadData.append("subject", `Syncora Intake: ${formData.directive_role.toUpperCase()} - ${formData.id}`);

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: payloadData,
          });
          const data = await response.json();
          
          if (data.success) {
            clearInterval(interval);
            setIsEncrypting(false);
            setIsSuccess(true);
            setFormData({ id: "", path: "", directive_role: "", linkedin: "", github_portfolio: "", payload: "" });
          } else {
            console.error("Transmission failed", data);
            clearInterval(interval);
            setIsEncrypting(false);
            alert("System Error: Technical Packet submission failed.");
          }
        } catch (error) {
          console.error("Network error", error);
          clearInterval(interval);
          setIsEncrypting(false);
          alert("Network Error: Link to Syncora mainframe dropped.");
        }
      };

      submitData();
    }
    return () => clearInterval(interval);
  }, [isEncrypting, formData]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.payload) return;
    setIsEncrypting(true);
    setIsSuccess(false);
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-transparent w-full selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Navigation & Branding */}
      <div className="absolute top-8 left-6 md:left-12 z-50 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] items-center">
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <ArrowLeft className="w-4 h-4" /> Portfolio
        </Link>
        <div className="flex items-center gap-3">
          <SyncoraLogo />
          <span className="text-white font-bold tracking-tight text-lg hidden sm:block">SYNCORA</span>
        </div>
      </div>

      {/* HERO: The Manifesto & Positioning */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 z-10 pt-32 lg:pt-0 perspective-1000">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-cyan-900/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-900/20 blur-[150px] rounded-full"></div>
        </motion.div>

        <div className="w-full lg:w-[55%] flex flex-col items-start relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 inline-flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">The Infrastructure Layer for Enterprise Voice AI</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[0.9] text-white mb-8 drop-shadow-2xl">
            Autonomous <br/> Revenue Engines.
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/60 text-lg font-light leading-relaxed max-w-2xl border-l-2 border-cyan-500/30 pl-6 mb-8 space-y-4">
            <p>
              <strong className="text-white">The Market Gap:</strong> Competitors are building fragile "AI Calling Apps" wrapped around ChatGPT that crash under concurrent load. 
            </p>
            <p>
              <strong className="text-white">The Syncora Moat:</strong> We operate Voice Infrastructure Middleware. Built on Golang, our routing layer utilizes the exact architectural principles of high-frequency trading (HFT) engines. We don't sell bots; we sell a multi-tenant telecom gateway that allows enterprises to rip out human SDR floors and replace them with sub-500ms intelligent agents capable of <span className="text-cyan-400 font-medium">mid-call API execution</span>.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="w-full lg:w-[45%] mt-16 lg:mt-0 relative z-20">
          <SyncoraDataMesh />
        </motion.div>
      </section>

      {/* CLIENT CAPABILITIES (God-Level Dashboard) */}
      <section className="relative w-full py-32 px-6 z-10 bg-transparent border-t border-white/5 perspective-1000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">Client Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Enterprise-Level Pipeline Control</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpatialFeatureCard 
              title="Visual Agent Forge" 
              desc="Build AI agents, assign voice clones, and tune personality sliders (Stability, Style) without writing a single line of code." 
              icon={Settings2} delay={0} 
            />
            <SpatialFeatureCard 
              title="Knowledge Base (RAG)" 
              desc="Drag-and-drop 50-page PDF sales playbooks. The AI absorbs it instantly to handle complex technical objections live." 
              icon={FileText} delay={0.1} 
            />
            <SpatialFeatureCard 
              title="Custom Tool Mapping" 
              desc="Map agents to internal databases. If a prospect asks about inventory, the agent silently queries Shopify and answers seamlessly." 
              icon={Database} delay={0.2} 
            />
            <SpatialFeatureCard 
              title="Campaign Deployment" 
              desc="Upload a CSV of 10,000 cold leads, press 'Deploy,' and watch the autonomous engine dial all 10,000 in under an hour." 
              icon={Zap} delay={0.3} 
            />
            <SpatialFeatureCard 
              title="Live Call Barging" 
              desc="Click into an active call, read the real-time transcript, and 'Barge In' to take over the audio if a massive whale is ready to close." 
              icon={PhoneCall} delay={0.4} 
            />
            <SpatialFeatureCard 
              title="Post-Call Intelligence" 
              desc="Dashboard auto-generates transcripts, Lead Scores out of 10, and tracks the exact micro-cent API cost per individual call." 
              icon={Activity} delay={0.5} 
            />
          </div>
        </div>
      </section>

      {/* SAAS FEATURES (Under the Hood SLA) */}
      <section className="relative w-full py-32 px-6 z-10 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/3">
            <h2 className="text-sm font-mono text-purple-400 tracking-[0.2em] uppercase mb-4">Under The Hood</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">SaaS Infrastructure.</h3>
            <p className="text-white/50 text-lg leading-relaxed">
              True enterprise SaaS isn't just about AI; it's about telecom bridging, billing, and data compliance.
            </p>
          </div>
          
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            <div className="flex gap-4">
              <PhoneForwarded className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Bring Your Own Telecom (BYOT)</h4>
                <p className="text-white/50 text-sm">Enterprise clients plug existing Twilio/Vonage SIP trunks into Syncora, keeping their numbers and carrier rates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Network className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Dynamic Provisioning</h4>
                <p className="text-white/50 text-sm">Programmatically buy and provision local area code numbers directly via the Syncora dashboard API.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Multi-Tenant Isolation (RLS)</h4>
                <p className="text-white/50 text-sm">Physical database locks ensuring absolute data privacy and Fortune 500 compliance via PostgreSQL.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Layers className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Async CRM Processing</h4>
                <p className="text-white/50 text-sm">Real-time extraction of variables routed directly into HubSpot/Salesforce with zero data loss.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CreditCard className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Automated Billing Engine</h4>
                <p className="text-white/50 text-sm">Stripe integration tracks total exact minutes spoken per organization, billed at a premium markup monthly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Activity className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Sub-500ms Audio Pipeline</h4>
                <p className="text-white/50 text-sm">Deep integration with Vapi, Deepgram Nova-2, and ElevenLabs Turbo v2.5 to completely eliminate the "AI pause".</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & RECRUITMENT */}
      <section className="relative w-full py-32 px-6 z-10 bg-transparent border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Tech Stack & Context */}
          <div className="w-full lg:w-[45%] text-left sticky top-32">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Actively Recruiting
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">FAANG-Grade Stack.</h3>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Competitors use Make.com and Bubble. We don't. We are an engineering-led culture looking for absolute elite talent to scale our architecture.
            </p>

            <div className="space-y-3 mb-10">
              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center gap-4">
                <Terminal className="w-6 h-6 text-cyan-400 shrink-0" />
                <div><h4 className="text-white font-bold">The Routing Core: Go</h4><p className="text-white/40 text-xs">Goroutines handle 100k+ WebSockets instantly.</p></div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center gap-4">
                <Database className="w-6 h-6 text-purple-400 shrink-0" />
                <div><h4 className="text-white font-bold">The DB: Postgres / Supabase</h4><p className="text-white/40 text-xs">Real-time subscriptions and military-grade auth.</p></div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center gap-4">
                <Server className="w-6 h-6 text-emerald-400 shrink-0" />
                <div><h4 className="text-white font-bold">The Broker: Apache Kafka</h4><p className="text-white/40 text-xs">Absorbs 50,000 concurrent call payload shocks.</p></div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center gap-4">
                <CloudCog className="w-6 h-6 text-orange-400 shrink-0" />
                <div><h4 className="text-white font-bold">DevOps: Kubernetes & AWS EKS</h4><p className="text-white/40 text-xs">Auto-scales Go servers dynamically under load.</p></div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] p-8 md:p-10 rounded-3xl bg-[#080808]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.05)] relative"
          >
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-mono text-sm tracking-widest uppercase">Operator_Intake_Form</span>
            </div>

            {isSuccess ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center border border-green-500/20 bg-green-500/5 rounded-lg p-6">
                <CheckCircle2 className="w-10 h-10 text-green-400 mb-3" />
                <p className="text-green-400 text-sm font-bold tracking-wider">STATUS: 200 OK</p>
                <p className="text-white/60 text-xs mt-2 max-w-xs leading-relaxed">
                  Technical packet encrypted, transmitted, and routed directly to Manav Gawas.
                </p>
                <button onClick={() => setIsSuccess(false)} className="mt-6 text-xs text-cyan-400 hover:underline">Start New Session</button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Alias / Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      placeholder="John Doe" 
                      disabled={isEncrypting}
                      className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors disabled:opacity-50" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Secure Comms (Email)</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.path}
                      onChange={(e) => setFormData({...formData, path: e.target.value})}
                      placeholder="john@domain.com" 
                      disabled={isEncrypting}
                      className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors disabled:opacity-50" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Target Directive</label>
                    <select 
                      required 
                      value={formData.directive_role}
                      onChange={(e) => setFormData({...formData, directive_role: e.target.value})}
                      disabled={isEncrypting}
                      className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="" disabled>Select Role...</option>
                      <option value="go">Go Systems Engineer</option>
                      <option value="ai">AI / RAG Architect</option>
                      <option value="devops">K8s / Infra Orchestrator</option>
                      <option value="fs">Next.js Frontend Engineer</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Professional Network</label>
                    <input 
                      required 
                      type="url" 
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      placeholder="LinkedIn URL" 
                      disabled={isEncrypting}
                      className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors disabled:opacity-50" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Proof of Work (GitHub / Portfolio)</label>
                  <input 
                    required 
                    type="url" 
                    value={formData.github_portfolio}
                    onChange={(e) => setFormData({...formData, github_portfolio: e.target.value})}
                    placeholder="https://github.com/your-profile" 
                    disabled={isEncrypting}
                    className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors disabled:opacity-50" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">Primary Deployment</label>
                  {isEncrypting ? (
                    <div className="w-full h-32 bg-[#030303] border border-white/10 rounded-lg p-3 text-green-400 text-xs font-mono break-all overflow-hidden opacity-70">
                      {scrambledPayload}
                    </div>
                  ) : (
                    <textarea 
                      required 
                      value={formData.payload}
                      onChange={(e) => setFormData({...formData, payload: e.target.value})}
                      placeholder="Describe your most complex recent project. What was the exact technical problem you solved, and how did you architect the solution?" 
                      disabled={isEncrypting}
                      className="w-full bg-[#030303] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors resize-y min-h-[100px] disabled:opacity-50" 
                    />
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isEncrypting}
                  className="mt-6 w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg py-4 font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                >
                  {isEncrypting ? "Transmitting..." : "Submit Technical Packet"} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* Terminal Footer */}
      <section className="relative w-full py-16 px-6 z-10 border-t border-white/5 bg-[#010101]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <SyncoraLogo />
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase mt-4 mb-1">Syncora Systems // Est. 2026</p>
          <p className="text-white/20 text-[10px]">Engineered by Manav Gawas. Mumbai, IN.</p>
        </div>
      </section>

    </main>
  );
}