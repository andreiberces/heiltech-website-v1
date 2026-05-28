"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import dynamic from "next/dynamic";

// Isolated client-only shader components — never mix with SSR
const RadarSweep = dynamic(() => import("./shaders/RadarSweep"), { ssr: false });
const NoiseField = dynamic(() => import("./shaders/NoiseField"), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22, delay: d },
  }),
};

const HEADLINE_WORDS = ["ELITE", "CYBER", "DEFENSE"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── Layer 0: WebGL noise field (animated atmosphere) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <NoiseField className="w-full h-full" />
      </div>

      {/* ── Layer 1: Tactical blueprint grid (structural) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,28,28,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(185,28,28,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto w-full px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

        {/* LEFT: copy */}
        <div className="lg:col-span-7 flex flex-col gap-8">

          <motion.div variants={FADE_UP} initial="hidden" animate="visible" custom={0.15}
            className="flex items-center gap-3">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-crimson border border-crimson/40 px-3 py-1 phosphor-red">
              // RESTRICTED — CLEARANCE LEVEL ALPHA //
            </span>
          </motion.div>

          <div className="flex flex-col gap-0">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.h1
                key={word}
                variants={FADE_UP}
                initial="hidden"
                animate="visible"
                custom={0.25 + i * 0.1}
                className="font-sans font-black tracking-tighter leading-[0.9] text-[clamp(3.5rem,10vw,8.5rem)] text-zinc-50"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.p variants={FADE_UP} initial="hidden" animate="visible" custom={0.6}
            className="max-w-[52ch] text-base leading-relaxed text-zinc-400">
            Military-grade cybersecurity protecting your most critical digital assets with precision,
            intelligence, and zero compromise. When failure is not an option.
          </motion.p>

          <motion.div variants={FADE_UP} initial="hidden" animate="visible" custom={0.75}
            className="flex flex-wrap items-center gap-4">
            <a href="#contact"
              className="group inline-flex items-center gap-3 bg-crimson px-7 py-3.5 font-mono text-xs tracking-widest text-zinc-50 hover:bg-crimson-dim transition-all duration-200 active:scale-[0.98]">
              GET SECURE
              <ArrowRight size={14} weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-xs tracking-widest text-zinc-400 border border-white/10 hover:border-white/25 hover:text-zinc-50 transition-all duration-200 active:scale-[0.98]">
              VIEW OPERATIONS
            </a>
          </motion.div>

          {/* Status bar — square indicators, no rounded */}
          <motion.div variants={FADE_UP} initial="hidden" animate="visible" custom={0.9}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full bg-emerald-500 opacity-75 phosphor-green"
                  style={{ animation: "pulse-ring 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span className="relative inline-flex h-2 w-2 bg-emerald-500 phosphor-green" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-500">
                SYSTEMS OPERATIONAL
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-zinc-700">|</span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">
              THREATS NEUTRALIZED: <span className="text-crimson phosphor-red">1,847</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-zinc-700">|</span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">
              UPTIME: <span className="text-zinc-300 phosphor-white">99.97%</span>
            </span>
          </motion.div>
        </div>

        {/* RIGHT: tactical HUD panel with live radar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
          className="lg:col-span-5 hidden lg:flex justify-end"
        >
          <div className="relative w-[420px]">
            {/* Outer panel border + corner brackets */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none">
              {["top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <span key={i} className={`absolute w-5 h-5 border-crimson ${cls}`} />
              ))}
            </div>

            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="font-mono text-[9px] tracking-[0.2em] text-crimson phosphor-red">
                SYS-ALPHA / SECTOR 7
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600">ENCRYPTED</span>
            </div>

            {/* ── LIVE RADAR (WebGL) ── */}
            <div className="w-full aspect-square bg-[#09090b]">
              <RadarSweep className="w-full h-full" />
            </div>

            {/* Threat intelligence overlay */}
            <div className="bg-[#09090b] border-t border-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] tracking-widest text-zinc-500">
                  [ THREAT INTELLIGENCE ]
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-crimson phosphor-red"
                    style={{ animation: "pulse-ring 1.4s ease-in-out infinite" }} />
                  <span className="font-mono text-[9px] tracking-widest text-crimson phosphor-red">
                    ACTIVE
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 border-b border-white/5 pb-3">
                {([
                  ["ACTIVE THREATS", "247",    false],
                  ["NEUTRALIZED",    "1,847",  true ],
                  ["PROTECTION",     "99.97%", false],
                  ["RESPONSE TIME",  "< 4ms",  false],
                ] as [string, string, boolean][]).map(([label, value, accent]) => (
                  <div key={label}>
                    <div className="font-mono text-[8px] tracking-wider text-zinc-600">{label}</div>
                    <div className={`font-mono text-sm font-bold ${accent ? "text-crimson phosphor-red" : "text-zinc-100 phosphor-white"}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              {/* Coordinates + footer */}
              <div className="flex justify-between pt-3">
                <span className="font-mono text-[8px] tracking-wider text-zinc-700">
                  LAT: 14.5995°N
                </span>
                <span className="font-mono text-[8px] tracking-wider text-zinc-700">
                  LNG: 120.9842°E
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 bg-[#09090b]">
              <span className="font-mono text-[8px] tracking-widest text-zinc-600">
                ENCRYPTION: AES-256 // REV 4.1
              </span>
              <span className="font-mono text-[8px] tracking-widest text-crimson phosphor-red">
                TLP: RED
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
