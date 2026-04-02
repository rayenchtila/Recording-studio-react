import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const stats = [
  { value: "50K+", label: "Artists" },
  { value: "$2M+", label: "Distributed" },
  { value: "180+", label: "Countries" },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* ── LAYER 1: MESH GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px' 
        }} 
      />

      {/* ── LAYER 2: FILM GRAIN ── */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-10"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />

      {/* ── LAYER 3: DYNAMIC LIGHT SWEEP ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute -inset-[100%] opacity-[0.07] animate-[spin_40s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.4) 180deg, transparent 360deg)",
            filter: "blur(150px)"
          }}
        />
      </div>

      {/* ── LAYER 4: Animated Canvas Particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-20"
      />

      {/* ── CONTENT ── */}
      <div className="relative z-30 flex flex-col items-center px-4 sm:px-6 md:px-10 text-center w-full">
        
        {/* Animated Badge */}
        <div className="mb-8 sm:mb-12 flex items-center gap-3 border border-white/10 rounded-full px-4 sm:px-6 py-2 text-[9px] sm:text-[10px] text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase font-black bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
          Global Distribution — 2026
        </div>

        {/* High-End Typography */}
        <h1
          className="font-black uppercase leading-[0.85] text-white tracking-tighter w-full"
          style={{
            fontSize: "clamp(3rem, 13vw, 10rem)",
            fontFamily: "'Georgia', serif",
          }}
        >
          <span className="block">Your Music.</span>
          <span
            className="block opacity-40 italic"
            style={{
              WebkitTextStroke: "1.5px white",
              color: "transparent",
            }}
          >
            Your Empire.
          </span>
        </h1>

        <p className="mt-8 sm:mt-12 text-gray-500 max-w-xs sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed font-medium tracking-wide px-2">
          The elite infrastructure for independent labels and creators. <br className="hidden md:block" />
          Take command of your digital legacy with 21 RECORDS.
        </p>

        

        {/* Premium CTAs */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full justify-center px-4">
          <NavLink
            to="/features"
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-[0.25em] hover:bg-gray-200 active:scale-95 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center"
          >
            See Features →
          </NavLink>
          
          <NavLink
            to="/pricing"
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 border border-white/10 text-white font-black rounded-2xl text-xs uppercase tracking-[0.25em] hover:bg-white/5 hover:border-white/40 transition-all duration-500 backdrop-blur-2xl text-center"
          >
            See Prices
          </NavLink>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 sm:mt-32 grid grid-cols-3 gap-6 sm:gap-16 md:gap-32 border-t border-white/5 pt-10 sm:pt-16 w-full max-w-5xl px-2">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center group">
              <span className="text-white font-black text-3xl sm:text-5xl md:text-7xl tracking-tighter transition-transform duration-500 group-hover:-translate-y-2">
                {s.value}
              </span>
              <span className="text-white/20 text-[9px] sm:text-[11px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase mt-2 sm:mt-3">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Architectural Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,1))" }}
      />
    </section>
  );
}
