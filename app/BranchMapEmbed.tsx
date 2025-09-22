// app/_components/BranchMapEmbed.tsx
"use client";
import dynamic from "next/dynamic";

// import your existing map scene; disable SSR if it uses WebGL/three.js
const MapScene = dynamic(() => import("../mapscene/MapScene"), { ssr: false });

export default function BranchMapEmbed() {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl ring-4 ring-orange-300/50">
      <MapScene />
    </div>
  );
}
