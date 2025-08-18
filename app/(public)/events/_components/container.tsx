"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  month: string; // e.g. "MAR"
  day: string | number; // e.g. 3 or "03"
  title: string;
  subtitle?: string;
  description: string;
  image?: string | StaticImageData; // <-- optional; string or static import
  imageAlt?: string; // optional; defaults to title
  href: string; // link to event page
  showDivider?: boolean; // default: true
};

export default function EventRow({
  month,
  day,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  href,
  showDivider = true,
}: Props) {
  const formattedDay = String(day).padStart(2, "0");

  // Treat empty strings as "no image"
  const hasImage =
    image !== undefined &&
    !(typeof image === "string" && image.trim().length === 0);

  // Optional fallback (ensure the file exists if you use it)
  const fallback = "/image/placeholder.png";
  const imgSrc = hasImage ? (image as string | StaticImageData) : fallback;

  return (
    <section className="bg-amber-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[72px_minmax(260px,1fr)_minmax(320px,1.1fr)] gap-6 md:gap-8 items-start">
          {/* Date */}
          <div className="pt-2 text-3xl font-bold leading-none tracking-tight text-black">
            <div className="uppercase">{month}</div>
            <div className="mt-2">{formattedDay}</div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-300">
            {hasImage ? (
              <Image
                src={imgSrc}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-neutral-600">
                No image
              </div>
            )}
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

      {/* Optional container-width divider */}
      {showDivider && (
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-[2px] w-full bg-red-500/90" />
        </div>
      )}
    </section>
  );
}
