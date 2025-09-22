"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DealCard, { Deal } from "./DealCard"; // ← adjust path if needed

type Props = {
  deals: Deal[];
  autoMs?: number; // autoplay interval
  startIndex?: number;
};

export default function DealsCarousel({
  deals,
  autoMs = 3500,
  startIndex = 0,
}: Props) {
  const [index, setIndex] = useState(startIndex);
  const [perView, setPerView] = useState(3); // desktop default
  const [anim, setAnim] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  // responsive items per view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // duplicate items so we can loop seamlessly
  const loopDeals = useMemo(() => deals.concat(deals), [deals]);

  // autoplay (pause on hover)
  useEffect(() => {
    if (!autoMs) return;
    const id = setInterval(() => {
      if (!hoverRef.current) setIndex((i) => i + 1);
    }, autoMs);
    return () => clearInterval(id);
  }, [autoMs]);

  // when we reach the duplicate tail, snap back without animation
  useEffect(() => {
    if (index % deals.length === 0 && index !== 0) {
      const snap = setTimeout(() => {
        setAnim(false);
        setIndex(0);
        // re-enable animation next tick
        requestAnimationFrame(() => setAnim(true));
      }, 20);
      return () => clearTimeout(snap);
    }
  }, [index, deals.length]);

  // translate percentage
  const translatePct = (-100 / perView) * index;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* track */}
      <div
        ref={trackRef}
        className={`flex ${anim ? "transition-transform duration-500 ease-out" : ""}`}
        style={{ transform: `translateX(${translatePct}%)` }}
      >
        {loopDeals.map((deal, i) => (
          <div
            key={`${deal.brand}-${i}`}
            className="shrink-0 px-3"
            style={{ width: `${100 / perView}%` }}
          >
            <DealCard deal={deal} />
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        aria-label="Previous deals"
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
      >
        ‹
      </button>
      <button
        aria-label="Next deals"
        onClick={() => setIndex((i) => i + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
      >
        ›
      </button>

      {/* dots */}
      <div className="mt-8 mb-2 flex justify-center gap-3">
        {Array.from({ length: Math.max(1, deals.length) }).map((_, i) => {
          const isActive = index % deals.length === i;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to set ${i + 1}`}
              className={`h-4 w-4 rounded-full ring-2 ring-red-600 transition 
            ${isActive ? "bg-red-600" : "bg-transparent hover:bg-red-600/20"}`}
            />
          );
        })}
      </div>
    </div>
  );
}
