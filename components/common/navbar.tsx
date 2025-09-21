"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Navbar() {
  const [showContact, setShowContact] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!showContact) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowContact(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showContact]);

  // Backdrop click to close
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setShowContact(false);
    }
  };

  return (
    <>
      <nav className="bg-red-500 px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/image/isansw_Logo.png"
              alt="ISANSW"
              width={120}
              height={48}
              priority
              className="h-12 w-auto object-contain"
            />
            <span className="sr-only">ISANSW Home</span>
          </Link>
        </div>

        {/* Nav Links */}
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

          {/* CTV wording */}
          <button
            onClick={() => setShowContact(true)}
            className="bg-amber-50 text-red-600 font-bold px-4 py-1.5 rounded-full border-2 border-white hover:bg-gray-200 transition"
          >
            Connect with Us
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {showContact && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onMouseDown={onBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          {/* Gradient frame */}
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-400 p-[1px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            {/* Inner card */}
            <div
              ref={cardRef}
              className="relative rounded-2xl bg-neutral-50"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Close button (now clearly visible) */}
              <button
                onClick={() => setShowContact(false)}
                aria-label="Close contact modal"
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:border-red-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Header with logo */}
              <div className="flex items-center gap-3 px-6 pt-6">
                <Image
                  src="/image/isansw_Logo.png"
                  alt="ISANSW"
                  width={64}
                  height={64}
                  className="w-20 h-20 object-contain"
                />
                <h2 className="text-2xl font-bold text-red-600">
                  How to Reach Us
                </h2>
              </div>

              {/* Divider */}
              <div className="mx-6 mt-4 h-[2px] bg-gradient-to-r from-red-500 via-orange-400 to-transparent rounded-full" />

              {/* Body */}
              <div className="px-6 py-5 space-y-3 text-gray-900 pb-20">
                <p>
                  <span className="text-lg font-semibold text-gray-700">
                    Email:
                  </span>{" "}
                  info@isansw.org
                </p>
                <p>
                  <span className="text-lg font-semibold text-gray-700">
                    Phone:
                  </span>{" "}
                  +61 400 123 456
                </p>
                <p>
                  <span className="text-lg font-semibold text-gray-700">
                    Address:
                  </span>{" "}
                  Sydney, NSW, Australia
                </p>

                {/* Pinned bottom-right button */}
                <a
                  href="mailto:info@isansw.org"
                  className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
