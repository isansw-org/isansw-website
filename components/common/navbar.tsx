"use client";

import Image from "next/image";
import Link from "next/link";
//import isaLogo from "@/components/images/isa_logo.png";

export default function Navbar() {
  return (
    <nav className="bg-red-500 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/about">
          {/* 
          <div className="flex items-center space-x-2 inline-block p-2 border-4 rounded-2xl bg-white shadow-lg">
            <Image src={isaLogo} alt="ISANSW logo" width={120} height={50} />
          </div>
          */}
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-amber-50 font-semibold">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/events" className="hover:underline">Events</Link>
        <Link href="/branches" className="hover:underline">Branches</Link>
        <Link href="/sponsors" className="hover:underline">Sponsors</Link>

        <Link
          href="/contact"
          className="bg-white text-red-600 font-bold px-4 py-1.5 rounded-full border border-red-600 hover:bg-red-100 transition"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
