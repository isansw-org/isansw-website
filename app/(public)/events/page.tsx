"use client";

import Navbar from "../../../components/common/navbar";
import Footer from "../../../components/common/footer";
import EventsHero from "./_components/eventshero";
import EventRow from "./_components/container";
import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import type { StaticImageData } from "next/image";
import domienator from "@/public/image/domienator.png";

type EventItem = {
  month: string;
  day: number | string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string | StaticImageData;
  imageAlt?: string;
  href: string;
};

const EVENTS: EventItem[] = [
  {
    month: "May",
    day: 3,
    title: "Domienator",
    subtitle: "ISA’s Indomie Competition",
    description:
      "Compete, cheer, and slurp your way to glory with friends from across NSW!",
    image: domienator,
    imageAlt: "Participants at Domienator event",
    href: "https://www.instagram.com/p/DIsUyuATcjb/",
  },
  {
    month: "May",
    day: 10,
    title: "Jejak Senja",
    subtitle: "Scenic Afternoon Hike",
    description: "Looking for an escape from deadlines, noise, and city rush?",
    image: "/image/jejaksenja.png",
    imageAlt: "Jejak Senja",
    href: "https://www.instagram.com/p/DI8nhVpBucO/",
  },
  {
    month: "Aug",
    day: 28,
    title: "NSW Cup",
    subtitle: "ISA's Sports Competition",
    description:
      "The NSW Cup is back, ISA’s biggest annual sports showdown featuring billiards, Valorant, basketball, badminton & mini soccer. ",
    image: "/image/nswCup.png",
    imageAlt: "NSW Cup",
    href: "https://www.instagram.com/p/DLrb11oBiZ9/",
  },
];

export default function EventsPage() {
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
          <div className="mt-4 mb-8 flex justify-end gap-4">
            {/* Search Input */}
            <div className="flex w-full max-w-md items-center rounded-full border-2 border-red-500 px-4 py-2 text-lg">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-transparent text-black placeholder-red-300 focus:outline-none"
                aria-label="Search events"
              />
              {/* Decorative button */}
              <button
                type="button"
                className="ml-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-bold text-white transition hover:bg-red-600"
            >
              Filter <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-3xl font-bold text-black">Past Events</h2>
          <div className="h-[3px] w-full bg-red-500/90" />
        </div>

        {/* Rows */}
        <div className="mx-auto max-w-6xl px-4">
          {filtered.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-red-300 bg-white/60 p-8 text-center text-stone-700">
              No events matched “{searchTerm}”. Try a different keyword.
            </div>
          ) : (
            <div className="divide-y-[2px] divide-red-500/90">
              {filtered.map((ev) => (
                <EventRow
                  key={`${ev.month}-${ev.day}-${ev.title}`}
                  {...ev}
                  showDivider={false}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
