"use client";
import Navbar from "../../../components/common/navbar"; 
import Footer from "../../../components/common/footer";
import EventsHero from "./_components/eventshero";
import EventRow from "./_components/container";
import { useState } from "react";
import { Search, Filter } from "lucide-react";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Navbar />
      <main className="bg-amber-50 min-h-screen p-5">
      <EventsHero imageSrc="/images/events-hero.jpg" title="Events Page" />
      {/* Search + Filter Bar */}
        <div className="flex justify-end mt-4 mb-8">
        {/* Search Input */}
        <div className="flex items-center border-2 border-red-500 rounded-full px-4 py-2 w-full max-w-md">
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
        <button className="flex items-center gap-2 bg-red-500 text-white font-bold rounded-full px-5 py-2 hover:bg-red-600 transition">
          Filter <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-black">Upcoming Events</h2>
        <div className="h-[3px] w-full bg-red-500/90" />
        </div>
      <EventRow
        month="MAR"
        day={3}
        title="Domienator"
        subtitle="Isa’s Indomie Competition"
        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        imageSrc="/images/events/domienator.jpg"
        imageAlt="Participants at Domienator event"
        href="/events/domienator"
      />
      <EventRow
        month="MAR"
        day={3}
        title="Domienator"
        subtitle="Isa’s Indomie Competition"
        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        imageSrc="/images/events/domienator.jpg"
        imageAlt="Participants at Domienator event"
        href="/events/domienator"
      />
    </main>

      <Footer />
    </>
  );
}
