"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  /** Date bits (keep your current API) */
  month: string; // e.g. "MAR"
  day: string | number; // e.g. 3 or "03"

  /** Content */
  title: string;
  subtitle?: string;
  description: string;

  /** Optional image */
  image?: string | StaticImageData;
  imageAlt?: string;

  /** Primary CTA */
  href: string;
  ctaLabel?: string; // default: "View Event Details"

  /** Layout/Styling */
  showDivider?: boolean; // default: true
  reverseOnDesktop?: boolean; // default: false (image/content order)
  className?: string; // wrapper custom classes
};

/** Small helper: treat http(s) as external */
const isExternal = (href: string) => /^https?:\/\//i.test(href);

export default function EventRow({
  month,
  day,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  href,
  ctaLabel = "View Event Details",
  showDivider = true,
  reverseOnDesktop = false,
  className = "",
}: Props) {
  const formattedDay = String(day).padStart(2, "0");

  const hasImage =
    image !== undefined &&
    !(typeof image === "string" && image.trim().length === 0);

  const imgSrc: string | StaticImageData = hasImage
    ? (image as string | StaticImageData)
    : "/image/placeholder.png";

  const external = isExternal(href);

  return (
    <section className={`bg-amber-50 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div
          className={[
            "grid grid-cols-1 items-start gap-6 md:gap-8",
            // 72px date col, then image, then content
            "md:grid-cols-[72px_minmax(260px,1fr)_minmax(320px,1.1fr)]",
            reverseOnDesktop
              ? "md:[grid-template-columns:72px_minmax(320px,1.1fr)_minmax(260px,1fr)]"
              : "",
          ].join(" ")}
        >
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

            {/* Internal vs External auto-handling */}
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-2xl font-bold text-black hover:text-red-600 transition"
              >
                {ctaLabel} <ArrowRight className="h-6 w-6" />
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-2xl font-bold text-black hover:text-red-600 transition"
              >
                {ctaLabel} <ArrowRight className="h-6 w-6" />
              </Link>
            )}
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
