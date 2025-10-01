// app/BranchMapEmbed.tsx
"use client";
import dynamic from "next/dynamic";

// ✅ correct relative path (same folder level inside /app)
const MapScene = dynamic(() => import("./mapscene/Experience"), { ssr: false });

export default function BranchMapEmbed() {
  return (
    <div className="w-full">
      <MapScene />
    </div>
  );
}
