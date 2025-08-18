"use client";

import Navbar from "../../../components/common/navbar";
import Footer from "../../../components/common/footer";
import EventsHero from "./_components/eventshero"; // <- match your file casing
import EventRow from "./_components/container"; // <- if you kept 'container.tsx', adjust this import
import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";

// static import (avoids typos and supports blur placeholder)
import domienator from "@/public/image/domienator.png";

type EventItem = {
  month: string;
  day: number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string | StaticImageData;
  imageAlt?: string;
  href: string;
};

const EVENTS: EventItem[] = [
  {
    month: "MAR",
    day: 3,
    title: "Domienator",
    subtitle: "Isa’s Indomie Competition",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    image: domienator, // or "/image/domienator.png"
    imageAlt: "Participants at Domienator event",
    href: "/events/domienator",
  },
  // add more items here
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return EVENTS;
    return EVENTS.filter((e) =>
      (e.title + " " + (e.subtitle ?? "") + " " + e.description)
        .toLowerCase()
        .includes(q)
    );
  }, [searchTerm]);

  return (
    <>
      <Navbar />

      <main className="bg-amber-50 min-h-screen">
        <EventsHero imageSrc="/image/eventsHero.png" title="Events Page" />

        {/* Search + Filter Bar */}
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex justify-end gap-4 mt-4 mb-8">
            {/* Search Input */}
            <div className="flex items-center border-2 border-red-500 rounded-full px-4 py-2 w-full max-w-md text-lg">
              <input
                type="text"
                placeholder="Search Events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-transparent focus:outline-none placeholder-red-300 text-black"
              />
              <button className="ml-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Button */}
            <button className="shrink-0 flex items-center gap-2 bg-red-500 text-white font-bold rounded-full px-5 py-2 hover:bg-red-600 transition">
              Filter <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-black">Upcoming Events</h2>
          <div className="h-[3px] w-full bg-red-500/90" />
        </div>

        {/* Rows (container draws dividers) */}
        <div className="mx-auto max-w-6xl px-4 divide-y-[2px] divide-red-500/90">
          {filtered.map((ev) => (
            <EventRow key={ev.href} {...ev} showDivider={false} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
