"use client";

import Image from "next/image";
import Link from "next/link";

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string; // e.g. "/events/domienator.jpg"
  href?: string;
};

export default function EventTicket({ e }: { e: EventItem }) {
  return (
    <div
      className="relative w-[260px] rounded-3xl bg-gradient-to-b from-red-600 to-orange-400 p-4 
                 text-white shadow-xl ring-1 ring-black/10 transform transition 
                 duration-300 ease-in-out hover:scale-105 hover:opacity-100 group-hover:opacity-60"
    >
      {/* Poster */}
      <div className="overflow-hidden rounded-2xl bg-white">
        <div className="relative">
          <Image
            src={e.image}
            alt={e.title}
            width={600}
            height={800}
            priority
            className="h-[280px] w-full rounded-[14px] object-cover"
          />
          {/* inner border inside the picture */}
          <div className="pointer-events-none absolute inset-[6px] rounded-[10px] ring-2 ring-white/25" />
        </div>
      </div>

      {/* Body */}
      <div className="pt-4">
        {/* thin solid divider */}
        <div className="my-2 border-t-2 border-white/70" />

        {/* Title & subtitle */}
        <h3 className="text-3xl font-extrabold tracking-wide text-center leading-tight">
          {e.title}
        </h3>
        <p className="mt-1 text-base italic opacity-90 text-left leading-snug">
          {e.subtitle}
        </p>

        {/* Date */}
        <p className="mt-7 text-sm font-semibold text-white/95 text-right pr-1">
          {e.date}
        </p>

        {/* dashed divider */}
        <div className="my-3 border-t-2 border-dashed border-white/70" />

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between">
          {e.href ? (
            <Link
              href={e.href}
              className="rounded-lg bg-white px-3 py-1 text-lg font-bold text-orange-400 
                         transition-colors duration-200 hover:bg-gray-200"
            >
              Learn More
            </Link>
          ) : (
            <span />
          )}

          {/* Barcode */}
          <div className="h-6 w-12 overflow-hidden">
            <div className="flex h-full w-full space-x-[2px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-full w-[2px] bg-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
