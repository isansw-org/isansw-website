"use client";
import React, { ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  speedSec?: number; // duration for one full loop
  gapClass?: string; // Tailwind gap between items
  className?: string; // extra classes for the outer container
};

export default function AutoScroller({
  children,
  speedSec = 50,
  gapClass = "gap-6",
  className = "",
}: Props) {
  // Normalize children and duplicate for seamless loop
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const strip = useMemo(() => [...items, ...items], [items]);

  return (
    <div className={`ascroller relative overflow-hidden ${className}`}>
      {/* edge fades (optional) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-50 to-transparent" />

      {/* track */}
      <div
        className={`ascroller-track flex ${gapClass} min-w-max will-change-transform`}
        style={
          {
            // Use a CSS var so CSS can read it
            ["--ascroller-speed" as any]: `${speedSec}s`,
          } as React.CSSProperties
        }
      >
        {strip.map((node, i) => (
          <div key={i} className="shrink-0">
            {node}
          </div>
        ))}
      </div>

      <style jsx global>{`
        /* animate the track */
        .ascroller .ascroller-track {
          animation: isa-scroll var(--ascroller-speed) linear infinite;
          animation-play-state: running;
        }

        /* pause when hovering the strip OR any of its children */
        .ascroller:hover .ascroller-track,
        .ascroller .ascroller-track:hover {
          animation-play-state: paused;
        }

        /* Seamless loop with duplicated content */
        @keyframes isa-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          } /* slide by one full copy */
        }
      `}</style>
    </div>
  );
}
