"use client";

import { motion } from "framer-motion";
import { Quotes } from "@phosphor-icons/react";

const FADE_UP = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22, delay },
  },
});

export default function About() {
  return (
    <section className="w-full py-28 relative overflow-hidden">
      {/* Section rule */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] text-crimson">// 02 /</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">INTEL BRIEF</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: image panel */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://picsum.photos/seed/ctrlroom9/700/875"
                alt="Operations control room"
                className="w-full h-full object-cover grayscale contrast-125 brightness-50"
              />
              {/* Flat dark overlay — no gradient */}
              <div className="absolute inset-0 bg-[rgba(9,9,11,0.55)]" />
              {/* Tactical grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(185,28,28,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(185,28,28,0.1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500">OPS CENTER</span>
                <span className="font-mono text-[9px] tracking-wider text-crimson">CLASSIFIED</span>
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div
              variants={FADE_UP(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2 className="font-sans font-black tracking-tighter leading-[0.92] text-[clamp(2.5rem,5vw,4.5rem)] text-zinc-50">
                TACTICAL CYBER
                <br />
                <span className="text-crimson">EXPERTISE</span>
              </h2>
            </motion.div>

            <motion.p
              variants={FADE_UP(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-base leading-relaxed text-zinc-400 max-w-[56ch]"
            >
              We deliver classified-grade cybersecurity solutions built for organizations that
              cannot afford failure. Every assessment, audit, and defense protocol is executed
              with military precision — protecting your critical infrastructure from adversaries
              at every threat level.
            </motion.p>

            <motion.p
              variants={FADE_UP(0.28)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-base leading-relaxed text-zinc-400 max-w-[56ch]"
            >
              From zero-day vulnerability analysis to full-scale incident response, Heiltech
              Defense operates as an extension of your security team — invisible until needed,
              decisive when it matters.
            </motion.p>

            {/* Testimonial */}
            <motion.div
              variants={FADE_UP(0.38)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative border-l-2 border-crimson/60 pl-6 py-2"
            >
              <Quotes
                size={20}
                weight="fill"
                className="text-crimson/40 mb-3"
              />
              <blockquote className="text-lg font-medium text-zinc-200 leading-relaxed max-w-[48ch]">
                "Unmatched protection and expertise. Heiltech hardened our entire infrastructure
                in under 30 days — no other firm came close."
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-surface-up border border-white/10 flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-crimson">JC</span>
                </div>
                <div>
                  <div className="font-mono text-xs tracking-wider text-zinc-300">J. CRUZ</div>
                  <div className="font-mono text-[10px] tracking-wider text-zinc-600">
                    CHIEF SECURITY OFFICER
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
