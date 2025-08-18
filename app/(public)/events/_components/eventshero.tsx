// app/(public)/events/_components/EventsHero.tsx
"use client";

import Image from "next/image";

type Props = {
  title?: string;
  imageSrc: string; // e.g. "/images/events/bg.jpg"
};

export default function EventsHero({ title = "Events Page", imageSrc }: Props) {
  return (
    <div className="relative isolate h-[42vh] min-h-[300px] w-full overflow-hidden">
      {/* Background image */}
      <Image src={imageSrc} alt="" fill priority className="object-cover" />

      {/* Center card */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative w-[min(92%,960px)] rounded-[24px] bg-white/80 p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-3 ring-white backdrop-blur-lg">
          {/* Corner dots */}
          {[
            "top-3 left-3",
            "top-3 right-3",
            "bottom-3 left-3",
            "bottom-3 right-3",
          ].map((pos, i) => (
            <span
              key={i}
              className={`pointer-events-none absolute ${pos} inline-block h-4 w-4 rounded-full bg-white`}
            />
          ))}
          <h1 className="text-4xl font-bold tracking-tight text-red-600">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
