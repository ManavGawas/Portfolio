"use client";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
      {/* Ambient Glows - ADDED GPU ACCELERATION */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[150px] rounded-full transform-gpu will-change-transform"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 blur-[150px] rounded-full transform-gpu will-change-transform"></div>

      {/* SVG Repeating Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] transform-gpu" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='10' width='140' height='140' rx='32' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Crect x='90' y='90' width='140' height='140' rx='32' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`, 
          backgroundSize: '160px 160px' 
        }}
      />
      
      {/* Large Floating Squircles - ADDED GPU ACCELERATION */}
      <div className="absolute top-[5%] left-[10%] w-64 h-64 bg-white/[0.01] border border-white/[0.03] rounded-[40px] rotate-12 transform-gpu"></div>
      <div className="absolute top-[20%] right-[15%] w-96 h-96 bg-white/[0.01] border border-white/[0.03] rounded-[48px] -rotate-6 transform-gpu"></div>
      <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-white/[0.01] border border-white/[0.03] rounded-[40px] rotate-45 transform-gpu"></div>
      <div className="absolute bottom-[25%] right-[10%] w-72 h-72 bg-white/[0.01] border border-white/[0.03] rounded-[32px] -rotate-12 transform-gpu"></div>
    </div>
  );
}