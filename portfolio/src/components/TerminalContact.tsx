"use client";

import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Copy, CheckCircle2 } from "lucide-react";

export default function TerminalContact() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ id: "", path: "", payload: "" });
  const [scrambledPayload, setScrambledPayload] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
        
        // PASTE YOUR PERSONAL GMAIL ACCESS KEY HERE
        payloadData.append("access_key", "668aa5a9-23f5-49c7-b67d-247f1abb47bc"); 
        
        // Map your form fields to Web3Forms required names
        payloadData.append("name", formData.id);
        payloadData.append("email", formData.path);
        payloadData.append("message", formData.payload);
        // Optional: Add a subject line for your inbox
        payloadData.append("subject", "Syncora Terminal Payload Received");

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
            setFormData({ id: "", path: "", payload: "" }); // clear form
          } else {
            console.error("Transmission failed", data);
            clearInterval(interval);
            setIsEncrypting(false);
            alert("System Error: Transmission failed. Please try again.");
          }
        } catch (error) {
          console.error("Network error", error);
          clearInterval(interval);
          setIsEncrypting(false);
          alert("Network Error: Transmission failed.");
        }
      };

      // Trigger the real submission while the visual scramble plays
      submitData();
    }
    return () => clearInterval(interval);
  }, [isEncrypting, formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.payload) return;
    setIsEncrypting(true);
    setIsSuccess(false);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center z-10 bg-[#030303] border-t border-white/5">
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">
          Contact
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          Initialize connection.
        </h3>
      </div>

      {/* The Terminal Window */}
      <div className="w-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/50 font-mono">
        
        {/* macOS Window Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#050505]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-xs text-white/40 flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" /> root@syncora:~
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: The Form */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
            <h4 className="text-cyan-400 mb-6 font-bold flex items-center gap-2">
              <span className="text-white/30">[1]</span> Encrypted Message Drop
            </h4>
            
            <div className="text-white/40 text-xs mb-8 space-y-1">
              <p>// Initialize secure payload broadcast.</p>
              <p>// Connection verified. E2E tunneling active.</p>
            </div>

            {isSuccess ? (
              <div className="h-48 flex flex-col items-center justify-center text-center border border-green-500/20 bg-green-500/5 rounded-lg p-6">
                <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
                <p className="text-green-400 text-sm">STATUS: 200 OK</p>
                <p className="text-white/60 text-xs mt-2">Payload encrypted and transmitted to Manav Gawas</p>
                <button onClick={() => setIsSuccess(false)} className="mt-6 text-xs text-cyan-400 hover:underline">Start New Session</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-cyan-400 text-sm whitespace-nowrap">{"> Enter Recruiter ID:"}</label>
                  <input 
                    type="text" 
                    required
                    suppressHydrationWarning
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    placeholder="name_or_alias" 
                    className="flex-1 bg-transparent border-b border-white/20 pb-1 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm placeholder:text-white/20"
                    disabled={isEncrypting}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-cyan-400 text-sm whitespace-nowrap">{"> Input Return Path:"}</label>
                  <input 
                    type="email" 
                    required
                    suppressHydrationWarning
                    value={formData.path}
                    onChange={(e) => setFormData({...formData, path: e.target.value})}
                    placeholder="email_address" 
                    className="flex-1 bg-transparent border-b border-white/20 pb-1 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm placeholder:text-white/20"
                    disabled={isEncrypting}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-cyan-400 text-sm whitespace-nowrap">{"> Compile Payload Array:"}</label>
                  <textarea 
                    required
                    suppressHydrationWarning
                    value={formData.payload}
                    onChange={(e) => setFormData({...formData, payload: e.target.value})}
                    placeholder="const message = '...';" 
                    className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm placeholder:text-white/20 min-h-24 resize-y font-mono"
                    disabled={isEncrypting}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">{">"}</span>
                  <button 
                    type="submit" 
                    suppressHydrationWarning
                    disabled={isEncrypting}
                    className="flex items-center gap-2 px-4 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors rounded text-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                  > 
                    required
                    value={formData.path}
                    onChange={(e) => setFormData({...formData, path: e.target.value})}
                    placeholder="email_address" 
                    className="flex-1 bg-transparent border-b border-white/20 pb-1 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm placeholder:text-white/20"
                    disabled={isEncrypting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-cyan-400 text-sm">{"> Input Payload:"}</label>
                  {isEncrypting ? (
                    <div className="w-full h-32 bg-[#050505] border border-white/10 rounded-lg p-3 text-green-400 text-xs break-all overflow-hidden opacity-70">
                      {scrambledPayload}
                    </div>
                  ) : (
                    <textarea 
                      required
                      value={formData.payload}
                      onChange={(e) => setFormData({...formData, payload: e.target.value})}
                      placeholder="Transmit your message here..." 
                      className="w-full h-32 bg-[#050505] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none placeholder:text-white/20"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/30 text-xs animate-pulse">
                    {isEncrypting ? "Awaiting server handshake..." : "Waiting for execution..."}
                  </span>
                  <button 
                    type="submit" 
                    disabled={isEncrypting}
                    className="flex items-center gap-2 px-4 py-2 border border-cyan-500/50 text-cyan-400 text-xs hover:bg-cyan-500/10 transition-colors rounded disabled:opacity-50"
                  >
                    <TerminalIcon className="w-3 h-3" />
                    ENCRYPT & TRANSMIT
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Server Endpoints (Contact Info) */}
          <div className="p-6 md:p-8">
            <h4 className="text-cyan-400 mb-6 font-bold flex items-center gap-2">
              <span className="text-white/30">[2]</span> Server Endpoints
            </h4>

            <div className="text-white/40 text-xs mb-6 space-y-1">
              <p>// Publicly accessible DNS routing.</p>
              <p>// Active listeners on standard ports.</p>
            </div>

            <p className="text-white/70 text-sm mb-4">$ cat /sys/config/contact_nodes.yaml</p>

            <div className="bg-[#050505] border border-white/5 rounded-lg p-4 space-y-4">
              
              {[
                { label: "MAIL_PROTOCOL", value: "gawasmanav469@gmail.com", key: "mail" },
                { label: "VOICE_GATEWAY", value: "+91 9702582512", key: "phone" },
                { label: "GITHUB_REPO", value: "github.com/ManavGawas", key: "github" },
                { label: "LINKEDIN_NODE", value: "linkedin.com/in/manavgawas", key: "linkedin" }
              ].map((endpoint) => (
                <div key={endpoint.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 group">
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <span className="text-cyan-400 text-xs shrink-0">{endpoint.label}:</span>
                    <span className="text-white text-sm truncate">{endpoint.value}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(endpoint.value, endpoint.key)}
                    className="text-white/30 hover:text-white transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedKey === endpoint.key ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
              
            </div>

            {/* System Status Bar */}
            <div className="mt-12 border border-white/5 bg-[#050505] rounded-lg p-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white/50">SYSTEM_STATUS</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-white/30 mt-2 uppercase tracking-widest">
                <span>CPU: 4%</span>
                <span>MEM: 1.2GB/64GB</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer Copyright */}
      <div className="mt-24 text-center pb-8">
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Syncora Systems // Manav Gawas
        </p>
      </div>
    </section>
  );
}