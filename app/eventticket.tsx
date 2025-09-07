// app/_components/EventTicket.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;   // e.g. "03/05/2025"
  image: string;  // /public path
  href?: string;
};

export default function eventticket({ e }: { e: EventItem }) {
  return (
    <div className="relative w-[260px] rounded-3xl bg-gradient-to-b from-red-600 to-orange-400 p-3 text-white shadow-xl ring-1 ring-black/10">
      {/* Poster */}
      <div className="overflow-hidden rounded-2xl bg-white">
        <Image
          src={e.image}
          alt={e.title}
          width={400}
          height={300}
          className="h-[180px] w-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="pt-4">
        <h3 className="text-xl font-extrabold tracking-wide">{e.title}</h3>
        <div className="my-2 h-[2px] w-14 rounded bg-white/70" />
        <p className="min-h-[48px] text-sm/5 text-white/90">{e.subtitle}</p>
      </div>

      {/* Ticket bar */}
      <div className="relative mt-4 rounded-2xl bg-white/10 px-3 py-3">
        {/* notches */}
        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-amber-50" />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-amber-50" />

        <div className="flex items-center justify-between gap-2">
          <Link
            href={e.href ?? "#"}
            className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow hover:translate-y-[-1px] focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Learn More →
          </Link>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-white/80">
              {e.date}
            </p>
            <div className="mt-1 h-1 w-16 rounded bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
