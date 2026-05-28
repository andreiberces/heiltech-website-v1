"use client";

import dynamic from "next/dynamic";

const SignalWave = dynamic(
  () => import("./shaders/SignalWave"),
  { ssr: false }
);

export default function SignalDivider() {
  return (
    <div className="w-full h-20 bg-[#09090b] border-y border-white/5">
      <SignalWave className="w-full h-full" />
    </div>
  );
}
