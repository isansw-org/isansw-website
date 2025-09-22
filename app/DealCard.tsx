"use client";
import Image from "next/image";

export type Deal = {
  brand: string;
  headline?: string;
  detail?: string;
  image: string;
};

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <div
      className="relative w-full min-h-[150px] rounded-3xl border-4 border-red-300
                 bg-gradient-to-b from-red-500 to-red-400 px-6 py-6 text-white
                 shadow-[0_14px_22px_rgba(0,0,0,0.2)]"
    >
      {/* inner edge */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/10" />

      {/* text */}
      <div className="pr-28">
        <p className="text-xl font-extrabold drop-shadow-sm">{deal.brand}</p>
        {deal.headline && (
          <p className="mt-2 text-sm font-semibold">{deal.headline}</p>
        )}
        {deal.detail && <p className="text-sm">{deal.detail}</p>}
      </div>

      {/* image bubble */}
      <div className="absolute right-5 top-1/2 h-24 w-24 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-amber-100/80">
        <Image
          src={deal.image}
          alt={deal.brand}
          width={200}
          height={200}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* bottom glow */}
      <div className="absolute -bottom-2 left-6 h-3 w-36 rounded-full bg-orange-300/60 blur-md" />
    </div>
  );
}
