"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  month: string;       // e.g. "MAR"
  day: string | number;// e.g. "03"
  title: string;       // e.g. "Domienator"
  subtitle?: string;   // e.g. "Isa’s Indomie Competition"
  description: string;
  imageSrc: string;    // /images/your-event.jpg
  imageAlt: string;
  href: string;        // link to event page
};

export default function EventRow({
  month,
  day,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  href,
}: Props) {
  return (
    <section className="bg-amber-50">

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-[72px_minmax(260px,1fr)_minmax(320px,1.1fr)] gap-8 items-start">
          {/* Date */}
          <div className="pt-2 text-3xl font-bold leading-none tracking-tight text-black">
            <div className="uppercase">{month}</div>
            <div className="mt-2">{String(day).padStart(2, "0")}</div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-300">
            {/* replace the gray box with the real image */}
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold text-black">{title}</h3>
            {subtitle && (
              <p className="mt-2 text-xl italic text-neutral-800">{subtitle}</p>
            )}

            <p className="mt-6 text-xl leading-8 text-black/90">
              {description}
            </p>

            <hr className="my-8 border-t-2 border-black/70" />

            <Link
              href={href}
              className="inline-flex items-center gap-2 text-2xl font-bold text-black hover:text-red-600 transition"
            >
              View Event Details <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* bottom line */}
      <div className="h-[3px] w-full bg-red-500/90" />
    </section>
  );
}
