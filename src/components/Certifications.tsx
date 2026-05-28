"use client";

import { motion } from "framer-motion";
import { SealCheck } from "@phosphor-icons/react";

const CERTS = [
  { code: "SOC-2", label: "SOC 2 TYPE II", sublabel: "AICPA COMPLIANT" },
  { code: "HIPAA", label: "HIPAA", sublabel: "HEALTH DATA SECURITY" },
  { code: "ISO-27001", label: "ISO 27001", sublabel: "INFO SECURITY MGMT" },
  { code: "NIST-CSF", label: "NIST CSF", sublabel: "CYBERSECURITY FRAMEWORK" },
  { code: "PCI-DSS", label: "PCI DSS", sublabel: "PAYMENT CARD SECURITY" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 22 } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="w-full py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-crimson">// 04 /</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">CLEARANCE</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 22 }}
              className="font-sans font-black tracking-tighter leading-none text-[clamp(2rem,3.5vw,3.2rem)] text-zinc-50"
            >
              COMPLIANCE
              <br />
              <span className="text-zinc-500">FRAMEWORKS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 22, delay: 0.1 }}
              className="mt-6 text-sm leading-relaxed text-zinc-500 max-w-[38ch]"
            >
              Every engagement is verified against industry-leading compliance standards —
              ensuring your operations meet the most stringent regulatory requirements.
            </motion.p>
          </div>

          {/* Right: cert badges */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-px bg-white/5"
          >
            {CERTS.map((cert) => (
              <motion.div
                key={cert.code}
                variants={item}
                whileHover={{ backgroundColor: "rgba(185,28,28,0.04)" }}
                className="bg-void p-6 flex flex-col gap-3 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <SealCheck
                    size={22}
                    weight="fill"
                    className="text-crimson/70 group-hover:text-crimson transition-colors duration-200"
                  />
                  <span className="font-mono text-[8px] tracking-widest text-zinc-700">
                    {cert.code}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-sm font-bold tracking-wider text-zinc-200 group-hover:text-zinc-50 transition-colors">
                    {cert.label}
                  </div>
                  <div className="font-mono text-[9px] tracking-wider text-zinc-600 mt-1">
                    {cert.sublabel}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="w-1 h-1 bg-emerald-500 phosphor-green" />
                  <span className="font-mono text-[8px] tracking-widest text-zinc-600">
                    VERIFIED
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
