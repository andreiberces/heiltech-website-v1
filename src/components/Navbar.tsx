"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#services" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" as const, stiffness: 120, damping: 20, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#09090b] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="HEIL TECH"
              style={{
                height: "38px",
                width: "auto",
                display: "block",
                // filter: "invert(1) hue-rotate(180deg) saturate(5)",
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-crimson transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="font-mono text-xs tracking-widest px-5 py-2.5 border border-crimson text-crimson hover:bg-crimson hover:text-zinc-50 transition-all duration-200"
            >
              GET SECURE
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-zinc-50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#09090b] border-b border-white/5 px-6 py-6 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-mono text-xs tracking-widest px-5 py-3 border border-crimson text-crimson text-center"
              onClick={() => setMobileOpen(false)}
            >
              GET SECURE
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
