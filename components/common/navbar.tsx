"use client";

import Image from "next/image";
import Link from "next/link";
//import isaLogo from "@/components/images/isa_logo.png";

export default function Navbar() {
  return (
    <nav className="bg-red-500 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/about" className="flex items-center">
          <Image
            src="/image/isansw_Logo.png" // from /public/image/...
            alt="ISANSW"
            width={120}
            height={48}
            priority
            className="h-12 w-auto object-contain"
          />
          <span className="sr-only">ISANSW Home</span>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-amber-50 font-semibold text-xl">
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/events" className="hover:underline">
          Events
        </Link>
        <Link href="/branches" className="hover:underline">
          Branches
        </Link>
        <Link href="/sponsors" className="hover:underline">
          Sponsors
        </Link>

        <Link
          href="/contact"
          className="bg-amber-50 text-red-600 font-bold px-4 py-1.5 rounded-full border-2 border-white hover:bg-gray-200 transition"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
