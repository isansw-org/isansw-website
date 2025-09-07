"use client";

import Image from "next/image";

type Props = {
  images: { src: string; alt?: string }[];
  height?: number;   // px
  width?: number;    // px
  speedSec?: number; // seconds per loop
};

export default function AutoCarousel({
  images,
  height = 180,
  width = 260,
  speedSec = 28,
}: Props) {
  // Duplicate the list so the animation can loop seamlessly
  const strip = [...images, ...images];

  return (
    <section className="bg-amber-50">
      <div className="group relative mx-auto max-w-6xl overflow-hidden py-10">
        {/* subtle gradient mask on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-50 to-transparent" />

        <div
          className="flex gap-6 will-change-transform"
          style={{
            animation: `isansw-scroll ${speedSec}s linear infinite`,
          }}
        >
          {strip.map((img, i) => (
            <div
              key={i}
              style={{ width, height }}
              className="shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5"
            >
              <Image
                src={img.src}
                alt={img.alt ?? "gallery image"}
                width={width}
                height={height}
                className="h-full w-full object-cover"
                priority={i < 4}
              />
            </div>
          ))}
        </div>

        {/* Pause on hover */}
        <style jsx>{`
          .group:hover div[style*="isansw-scroll"] {
            animation-play-state: paused;
          }
          @keyframes isansw-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
