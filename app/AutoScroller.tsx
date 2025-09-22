"use client";

import React, { ReactNode, useMemo } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  speedSec?: number; // full-loop duration
  gapClass?: string; // Tailwind gap between items
  pauseOnHover?: boolean;
  className?: string; // container classes
};

export default function AutoScroller({
  children,
  speedSec = 50,
  gapClass = "gap-6",
  pauseOnHover = true,
  className = "",
}: Props) {
  // Normalize children to array
  const items = useMemo(() => React.Children.toArray(children), [children]);
  // Duplicate list for seamless loop
  const strip = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={`relative overflow-hidden ${pauseOnHover ? "group" : ""} ${className}`}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-50 to-transparent" />

      {/* track */}
      <div
        className={`flex ${gapClass} will-change-transform min-w-max ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{ animation: `isa-scroll ${speedSec}s linear infinite` }}
      >
        {strip.map((node, i) => (
          <div key={i} className="shrink-0">
            {node}
          </div>
        ))}
      </div>

      {/* make keyframes GLOBAL so the name matches your inline style */}
      <style jsx global>{`
        @keyframes isa-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Optional: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation-duration: 0.001s 
            animation-iteration-count: 1 
          }
        }
      `}</style>
    </div>
  );
}
