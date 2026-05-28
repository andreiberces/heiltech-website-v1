"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const SERVICES = [
  {
    code: "OPS-001",
    title: "VULNERABILITY\nASSESSMENT",
    body: "Comprehensive network, web, and API penetration testing. We map every attack surface, identify zero-day exposures, and deliver classified remediation reports your team can action immediately.",
    tags: ["NETWORK", "WEB APPS", "API", "ZERO-DAY"],
    large: true,
  },
  {
    code: "OPS-002",
    title: "COMPLIANCE\nAUDITING",
    body: "SOC 2 Type II, HIPAA, and ISO 27001 compliance verification with full audit trail documentation and evidence collection.",
    tags: ["SOC 2", "HIPAA", "ISO 27001"],
    large: false,
  },
  {
    code: "OPS-003",
    title: "ADVANCED CYBER\nDEFENSE",
    body: "AI-powered cyber ranges, continuous cloud posture hardening, and persistent threat intelligence feeds — active deterrence at scale.",
    tags: ["AI DEFENSE", "CLOUD", "RED TEAM"],
    large: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 22 } },
};

export default function Services() {
  return (
    <section id="services" className="w-full py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-crimson">// 03 /</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">OPERATIONS</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="font-sans font-black tracking-tighter leading-none text-[clamp(2.2rem,4.5vw,4rem)] text-zinc-50 mb-16"
        >
          ACTIVE
          <br />
          <span className="text-zinc-500">CAPABILITIES</span>
        </motion.h2>

        {/* Asymmetric grid: 3/5 left + 2/5 right */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5"
        >
          {/* OPS-001 — large left card */}
          <ServiceCard service={SERVICES[0]} className="md:col-span-3 md:row-span-2" />

          {/* OPS-002 and OPS-003 — stacked right */}
          <ServiceCard service={SERVICES[1]} className="md:col-span-2" />
          <ServiceCard service={SERVICES[2]} className="md:col-span-2" />
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 22 } },
      }}
      whileHover="hovered"
      className={`group relative bg-surface flex flex-col ${service.large ? "p-10 min-h-[480px]" : "p-8 min-h-[240px]"} ${className}`}
    >
      {/* Hover: red left border reveal */}
      <motion.div
        variants={{ hovered: { scaleY: 1 }, hidden: { scaleY: 0 }, show: { scaleY: 0 } }}
        className="absolute top-0 left-0 w-0.5 h-full bg-crimson origin-top"
        style={{ scaleY: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Code */}
      <div className="flex items-center justify-between mb-auto">
        <span className="font-mono text-[10px] tracking-[0.25em] text-crimson">
          {service.code}
        </span>
        <motion.div
          variants={{
            hovered: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -8 },
            show: { opacity: 0, x: -8 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <ArrowUpRight size={16} className="text-crimson" />
        </motion.div>
      </div>

      {/* Title */}
      <h3
        className={`font-sans font-black tracking-tight leading-[0.95] text-zinc-50 mt-8 whitespace-pre-line ${
          service.large ? "text-4xl" : "text-2xl"
        }`}
      >
        {service.title}
      </h3>

      {/* Body */}
      <p
        className={`text-zinc-500 leading-relaxed mt-4 ${
          service.large ? "text-base max-w-[50ch]" : "text-sm"
        }`}
      >
        {service.body}
      </p>

      {/* Tags + status */}
      <div className={`flex flex-wrap items-center gap-2 ${service.large ? "mt-10" : "mt-6"}`}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-widest text-zinc-600 border border-white/5 px-2 py-1"
          >
            {tag}
          </span>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 phosphor-green" />
          <span className="font-mono text-[9px] tracking-widest text-zinc-600">ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
}
