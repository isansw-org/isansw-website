"use client";

import { ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode[];
  speedSec?: number;        // full-loop duration
  gapClass?: string;        // Tailwind gap between items
  pauseOnHover?: boolean;
  className?: string;       // container classes
};

export default function AutoScroller({
  children,
  speedSec = 28,
  gapClass = "gap-6",
  pauseOnHover = true,
  className = "",
}: Props) {
  // duplicate list for seamless loop
  const strip = useMemo(() => [...children, ...children], [children]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-50 to-transparent" />

      <div
        className={`flex ${gapClass} will-change-transform`}
        style={{ animation: `isa-scroll ${speedSec}s linear infinite` }}
      >
        {strip.map((node, i) => (
          <div key={i} className="shrink-0">
            {node}
          </div>
        ))}
      </div>

      <style jsx>{`
        ${pauseOnHover ? `
        div:hover > div[style*="isa-scroll"] { animation-play-state: paused; }
        ` : ``}
        @keyframes isa-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
