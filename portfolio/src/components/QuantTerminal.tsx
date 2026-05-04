"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Search, X, FolderGit2, Cpu, 
  Workflow, Network, Mail, FileDown, 
  Settings, Activity, Eye, ShieldAlert,
  CheckCircle2, Copy, Clock,
  Skull, User
} from "lucide-react";
import { useRouter } from "next/navigation";

// Native SVG replacement since Lucide removed Brand Icons
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type Command = {
  id: string;
  title: string;
  cliName: string;
  icon: any;
  category: "Navigation" | "System" | "Actions" | "Classified";
};

type HistoryEntry = {
  id: number;
  cmd: string;
  rawCmd: string;
};

export default function QuantTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // CLI State
  const [cliInput, setCliInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Toggle Palette (Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // TOTAL Scroll Lock (Locks body, html, and prevents mobile bounce)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Prevents mobile touch scrolling
      document.documentElement.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => { 
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = ""; 
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-scroll the terminal pane
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // --- EXTENDED COMMAND DIRECTORY ---
  const commands: Command[] = [
    { id: "home", title: "cd ~ (Home)", cliName: "home", icon: Terminal, category: "Navigation" },
    { id: "projects", title: "cd ./projects", cliName: "projects", icon: FolderGit2, category: "Navigation" },
    { id: "syncora", title: "cd ./syncora", cliName: "syncora", icon: Cpu, category: "Navigation" },
    { id: "contact", title: "Initiate Handshake (Contact)", cliName: "contact", icon: Mail, category: "Actions" },
    { id: "github", title: "Access GitHub Repositories", cliName: "github", icon: Workflow, category: "Actions" },
    { id: "linkedin", title: "Access Professional Network", cliName: "linkedin", icon: LinkedinIcon, category: "Actions" },
    { id: "resume", title: "Download Manifest (Resume)", cliName: "resume", icon: FileDown, category: "Actions" },
    { id: "status", title: "Run System Diagnostics", cliName: "status", icon: Activity, category: "System" },
    { id: "network", title: "Ping Active Endpoints", cliName: "network", icon: Network, category: "System" },
    { id: "time", title: "Get System Time (NTP)", cliName: "time", icon: Clock, category: "System" },
    { id: "whoami", title: "Print Current User Context", cliName: "whoami", icon: User, category: "System" },
    { id: "clear", title: "Clear Terminal Logs", cliName: "clear", icon: Settings, category: "System" },
    { id: "sudo", title: "Sudo Root Override", cliName: "sudo", icon: ShieldAlert, category: "Classified" },
    { id: "matrix", title: "Toggle Visual Matrix", cliName: "matrix", icon: Eye, category: "Classified" },
    { id: "hack", title: "Execute Breach Protocol", cliName: "hack", icon: Skull, category: "Classified" },
  ];

  // --- COMMAND EXECUTION LOGIC ---
  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setCliInput("");
      return;
    }

    let parsedCmd = "not_found";

    // Routing & External Links
    if (cmd === "home" || cmd === "cd ~") {
      parsedCmd = "home";
      router.push("/");
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "projects") {
      parsedCmd = "projects";
      router.push("/");
      setTimeout(() => document.getElementById("projects")?.scrollIntoView({behavior: "smooth"}), 100);
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "syncora") {
      parsedCmd = "syncora";
      router.push("/syncora");
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "contact") {
      parsedCmd = "contact";
      router.push("/");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({behavior: "smooth"}), 100);
      setTimeout(() => setIsOpen(false), 1000);
    } else if (cmd === "github") {
      parsedCmd = "github";
      window.open("https://github.com/ManavGawas", "_blank");
    } else if (cmd === "linkedin") {
      parsedCmd = "linkedin";
      window.open("https://linkedin.com/in/manavgawas", "_blank");
    } else if (cmd === "resume") {
      parsedCmd = "resume";
      window.open("/resume.pdf", "_blank");
    } 
    // Terminal Internals
    else if (cmd === "status") parsedCmd = "status";
    else if (cmd === "network") parsedCmd = "network";
    else if (cmd === "time") parsedCmd = "time";
    else if (cmd === "whoami") parsedCmd = "whoami";
    else if (cmd === "sudo") parsedCmd = "sudo";
    else if (cmd === "hack") parsedCmd = "hack";
    else if (cmd === "matrix") {
      parsedCmd = "matrix";
      document.body.classList.toggle("matrix-mode");
    } else if (cmd === "help") parsedCmd = "help";

    // Push to history
    setHistory(prev => [...prev, { id: Date.now(), cmd: parsedCmd, rawCmd }]);
    setCliInput("");
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // --- DYNAMIC OUTPUT RENDERER ---
  const renderOutput = (cmd: string) => {
    switch (cmd) {
      case "help":
        return (
          <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-1 mt-2 mb-2">
            <span className="text-white">home</span><span className="text-white/60">Navigate to Root</span>
            <span className="text-white">projects</span><span className="text-white/60">View Systems Blueprint</span>
            <span className="text-white">syncora</span><span className="text-white/60">Enter Syncora Gateway</span>
            <span className="text-white">contact</span><span className="text-white/60">Initiate Handshake</span>
            <span className="text-white">github</span><span className="text-white/60">Access Code Repositories</span>
            <span className="text-white">linkedin</span><span className="text-white/60">Access Professional Network</span>
            <span className="text-white">status</span><span className="text-white/60">Run System Diagnostics</span>
            <span className="text-white">network</span><span className="text-white/60">Ping Server Endpoints</span>
            <span className="text-white">time</span><span className="text-white/60">Fetch NTP System Time</span>
            <span className="text-white">whoami</span><span className="text-white/60">Print Current User Context</span>
            <span className="text-white">clear</span><span className="text-white/60">Clear Terminal Screen</span>
            <span className="text-white">sudo</span><span className="text-white/60">[REDACTED]</span>
            <span className="text-white">hack</span><span className="text-white/60">[REDACTED]</span>
          </div>
        );
      case "home": return "> Executing routing protocol. Redirecting to root node...";
      case "projects": return "> Accessing project manifests. Scrolling viewport...";
      case "syncora": return "> Tunneling to Syncora Systems. Please wait...";
      case "contact": return "> Opening secure communications channel...";
      case "github": return "> Launching GitHub repositories in new thread...";
      case "linkedin": return "> Connecting to professional network node...";
      case "resume": return "> Downloading technical manifest (resume.pdf)...";
      case "time": return `> Fetching NTP server data...\nCurrent system time: ${new Date().toString()}\nLocation: Mumbai, IN`;
      case "whoami": return "guest_user (unverified).\n> Suggestion: Upgrade to ROOT by submitting an Encrypted Message Drop in the Contact section.";
      case "status":
        return (
          <div className="border border-white/5 bg-[#050505] rounded-lg p-4 my-3 max-w-sm">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/50">SYSTEM_STATUS</span>
              <span className="text-green-400">ONLINE</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse"></div>
            </div>
            <div className="flex justify-between text-[10px] text-white/30 mt-2 uppercase tracking-widest">
              <span>CPU: 4%</span>
              <span>MEM: 1.2GB/64GB</span>
            </div>
          </div>
        );
      case "network":
        return (
          <div className="bg-[#050505] border border-white/5 rounded-lg p-4 space-y-3 my-3 max-w-sm">
            {[
              { label: "MAIL_PROTOCOL", value: "gawasmanav469@gmail.com", key: "mail" },
              { label: "VOICE_GATEWAY", value: "+91 9702582512", key: "phone" },
              { label: "B2B_ENDPOINT", value: "manav@syncora.systems", key: "syncora" }
            ].map((endpoint) => (
              <div key={endpoint.key} className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-cyan-400 text-[10px]">{endpoint.label}:</span>
                  <span className="text-white text-xs">{endpoint.value}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(endpoint.value, endpoint.key)}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  {copiedKey === endpoint.key ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        );
      case "sudo": return "WARNING: UNAUTHORIZED ACCESS DETECTED.\n> Initiating lockdown protocol...\n> Tracing IP address...\nNice try. Permission denied.";
      case "hack": return "> Initiating breach protocol...\n> Bypassing mainframe firewall...\n> Injecting SQL payload...\n[ERROR] Firewall triggered. Access denied. Incident reported to Syncora Security.";
      case "matrix": return "> Overriding CSS payload...\nMatrix visual protocols toggled. Wake up, Neo.";
      case "not_found": return "bash: command not found. Type 'help' for available commands.";
      default: return "";
    }
  };

  const filteredCommands = search 
    ? commands.filter(cmd => cmd.title.toLowerCase().includes(search.toLowerCase()) || cmd.category.toLowerCase().includes(search.toLowerCase()))
    : commands;

  const categories = Array.from(new Set(filteredCommands.map(c => c.category)));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 w-screen h-[100dvh] overflow-hidden overscroll-none">
        {/* Backdrop overlay - Heavy blur to hide background completely */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-[#000000] z-[-1]"
        />

        {/* Command Palette Modal - strictly bounded by max-h-full */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-full"
        >
          {/* Header & Button Search (Fixed at top) */}
          <div className="flex items-center px-4 border-b border-white/10 bg-[#050505] shrink-0">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input 
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or execute script..."
              className="w-full bg-transparent text-white px-4 py-4 focus:outline-none text-sm placeholder:text-white/30"
            />
            <button onClick={() => setIsOpen(false)} className="p-1 shrink-0 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Command Button List (Flexible middle area) */}
          <div className="flex-1 overflow-y-auto min-h-0 p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-sm">
                No commands found matching "{search}"
              </div>
            ) : (
              categories.map(category => (
                <div key={category} className="mb-4">
                  <div className="px-3 py-2 text-[10px] text-white/30 tracking-widest uppercase font-bold flex items-center gap-2">
                    {category}
                    <div className="h-px flex-1 bg-white/5"></div>
                  </div>
                  {filteredCommands.filter(c => c.category === category).map(cmd => (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd.cliName)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-left text-white/70 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <cmd.icon className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors shrink-0" />
                        <span className="text-sm truncate">{cmd.title}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/30 tracking-widest border border-white/5 group-hover:border-white/10 shrink-0">
                        {cmd.cliName}
                      </span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* THE INTERACTIVE TERMINAL UI (Fixed at bottom) */}
          <div 
            className="shrink-0 h-[240px] md:h-[280px] bg-[#020202] border-t border-white/10 p-4 font-mono text-xs flex flex-col relative shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] cursor-text overflow-hidden"
            onClick={() => cliInputRef.current?.focus()}
          >
            {/* Fake Mac Header */}
            <div className="shrink-0 flex items-center gap-2 mb-3 border-b border-white/5 pb-2 bg-[#020202]">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-white/30 text-[10px] tracking-widest uppercase">system_stdout // Interactive</span>
            </div>

            {/* Scrollable Terminal Output */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {history.length === 0 && (
                <div className="text-white/40 mb-3">Syncora OS v2.0.4. Type 'help' to see active commands.</div>
              )}
              
              {/* Terminal History Log */}
              {history.map((entry) => (
                <div key={entry.id} className="mb-3">
                  <div className="text-white/50">
                    <span className="text-green-400">guest@syncora:~$</span> <span className="text-white">{entry.rawCmd}</span>
                  </div>
                  <div className="text-cyan-400 mt-1 whitespace-pre-wrap leading-relaxed">
                    {renderOutput(entry.cmd)}
                  </div>
                </div>
              ))}

              {/* Active CLI Input */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-400 shrink-0">guest@syncora:~$</span>
                <input
                  ref={cliInputRef}
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") executeCommand(cliInput) }}
                  className="flex-1 bg-transparent text-white outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={terminalEndRef} className="h-2" />
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}