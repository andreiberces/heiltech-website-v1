"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  XLogo,
  ArrowRight,
  Envelope,
  Phone,
} from "@phosphor-icons/react";

const SOCIAL = [
  { Icon: FacebookLogo, label: "Facebook", href: "#" },
  { Icon: InstagramLogo, label: "Instagram", href: "#" },
  { Icon: TiktokLogo, label: "TikTok", href: "#" },
  { Icon: XLogo, label: "X / Twitter", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="w-full bg-void border-t border-white/5">
      {/* Main contact block */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] text-crimson">// 05 /</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">CONTACT</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: branding + contact */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-crimson text-sm tracking-widest">//</span>
                <span className="font-mono font-bold tracking-[0.2em] text-zinc-50 text-sm uppercase">
                  HEILTECH DEFENSE
                </span>
                <span className="font-mono text-crimson text-sm tracking-widest">//</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[42ch]">
                Defending the digital frontier since 2019. Precision-engineered security for
                enterprises that operate without margin for error.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@heiltechdefense.com"
                className="flex items-center gap-3 group"
              >
                <Envelope size={16} className="text-zinc-600 group-hover:text-crimson transition-colors" />
                <span className="font-mono text-xs tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  info@heiltechdefense.com
                </span>
              </a>
              <a
                href="tel:09178769092"
                className="flex items-center gap-3 group"
              >
                <Phone size={16} className="text-zinc-600 group-hover:text-crimson transition-colors" />
                <span className="font-mono text-xs tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  0917-876-9092
                </span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/8 flex items-center justify-center text-zinc-600 hover:text-zinc-200 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: newsletter + CTA */}
          <div className="lg:col-span-7 lg:pl-16 flex flex-col justify-center gap-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 22 }}
                className="font-sans font-black tracking-tighter leading-none text-[clamp(2rem,4vw,3.5rem)] text-zinc-50 mb-4"
              >
                READY TO
                <br />
                <span className="text-crimson">SECURE</span> YOUR
                <br />
                PERIMETER?
              </motion.h2>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[44ch]">
                Subscribe for intelligence briefings on emerging threats, compliance updates,
                and elite defense tactics.
              </p>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              {!submitted ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="flex-1 bg-surface border border-white/8 px-5 py-3.5 font-mono text-xs tracking-widest text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-crimson/50 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-crimson px-6 py-3.5 font-mono text-xs tracking-widest text-zinc-50 hover:bg-crimson-dim transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
                  >
                    SUBSCRIBE
                    <ArrowRight size={12} weight="bold" />
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-3.5 border-b border-emerald-500/40"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-500 phosphor-green" />
                  <span className="font-mono text-xs tracking-widest text-emerald-400">
                    SUBSCRIPTION CONFIRMED — BRIEFINGS INCOMING
                  </span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[9px] tracking-widest text-zinc-700">
            © 2026 HEILTECH SOLUTIONS — ALL RIGHTS RESERVED
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[9px] tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="font-mono text-[9px] tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors">
              TERMS OF SERVICE
            </a>
            <span className="font-mono text-[9px] tracking-widest text-crimson/50">
              TLP: RED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
