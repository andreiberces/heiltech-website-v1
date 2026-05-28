const ITEMS = [
  "VULNERABILITY ASSESSMENT",
  "PENETRATION TESTING",
  "SOC 2 TYPE II COMPLIANCE",
  "ZERO-DAY EXPLOIT DEFENSE",
  "CLOUD POSTURE HARDENING",
  "AI-DRIVEN CYBER RANGES",
  "HIPAA AUDITING",
  "ISO 27001 CERTIFICATION",
  "RED TEAM OPERATIONS",
  "INCIDENT RESPONSE",
];

const SEPARATOR = (
  <span className="font-mono text-crimson mx-6 text-xs select-none">◆</span>
);

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="w-full overflow-hidden border-y border-white/5 bg-surface py-3">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">
              {item}
            </span>
            {SEPARATOR}
          </span>
        ))}
      </div>
    </div>
  );
}
