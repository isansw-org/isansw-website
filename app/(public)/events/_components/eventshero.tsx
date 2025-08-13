// app/(public)/events/_components/EventsHero.tsx
"use client";

import Image from "next/image";

type Props = {
  title?: string;
  imageSrc: string; // e.g. "/images/events/bg.jpg"
};

export default function EventsHero({ title = "Events Page", imageSrc }: Props) {
  return (
    <div className="relative isolate h-[42vh] min-h-[300px] w-full overflow-hidden rounded-[12px]">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/75 via-red-500/70 to-orange-400/70" />

      {/* Center card */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative w-full max-w-3xl rounded-[24px] bg-white/55 p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-2 ring-white/70 backdrop-blur-md">
          {/* Corner dots */}
          {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
            (pos, i) => (
              <span
                key={i}
                className={`pointer-events-none absolute ${pos} inline-block h-4 w-4 rounded-full bg-white/85 ring-1 ring-white/70`}
              />
            )
          )}
          <h1 className="text-4xl font-bold tracking-tight text-red-600">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
