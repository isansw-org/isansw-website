"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [showContact, setShowContact] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const contactCardRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showContact && !showMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowContact(false);
        setShowMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showContact, showMobile]);

  useEffect(() => {
    if (showMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showMobile]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setShowMobile(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onContactBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      contactCardRef.current &&
      !contactCardRef.current.contains(e.target as Node)
    ) {
      setShowContact(false);
    }
  };
  const onMobileBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      mobilePanelRef.current &&
      !mobilePanelRef.current.contains(e.target as Node)
    ) {
      setShowMobile(false);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <nav className="sticky top-0 z-40 bg-red-600 backdrop-blur supports-[backdrop-filter]:bg-red-500/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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

          {/* NavBar Links */}
          <div className="hidden items-center gap-6 text-amber-50 md:flex">
            <Link
              href="/about"
              className="text-lg font-semibold hover:underline"
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-lg font-semibold hover:underline"
            >
              Events
            </Link>
            <Link
              href="/branches"
              className="text-lg font-semibold hover:underline"
            >
              Branches
            </Link>
            <Link
              href="/sponsors"
              className="text-lg font-semibold hover:underline"
            >
              Sponsors
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="rounded-full border-2 border-white bg-amber-50 px-4 py-1.5 font-bold text-red-600 transition hover:bg-gray-200"
            >
              Connect with Us
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobile(true)}
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-amber-50 hover:bg-red-600 md:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {showMobile && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          onMouseDown={onMobileBackdrop}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Panel */}
          <div
            ref={mobilePanelRef}
            className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-white shadow-xl transition-transform duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/image/isansw_Logo.png"
                  alt="ISANSW"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <span className="text-lg font-bold text-red-600">Menu</span>
              </div>
              <button
                onClick={() => setShowMobile(false)}
                aria-label="Close menu"
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col gap-1 px-2 py-2">
              <MobileLink href="/about" onClick={() => setShowMobile(false)}>
                About
              </MobileLink>
              <MobileLink href="/events" onClick={() => setShowMobile(false)}>
                Events
              </MobileLink>
              <MobileLink href="/branches" onClick={() => setShowMobile(false)}>
                Branches
              </MobileLink>
              <MobileLink href="/sponsors" onClick={() => setShowMobile(false)}>
                Sponsors
              </MobileLink>

              <button
                onClick={() => {
                  setShowMobile(false);
                  setShowContact(true);
                }}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                Connect with Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact overlay */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onMouseDown={onContactBackdrop}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-400 p-[1px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            <div
              ref={contactCardRef}
              className="relative rounded-2xl bg-neutral-50"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContact(false)}
                aria-label="Close contact modal"
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-3 px-6 pt-6">
                <Image
                  src="/image/isansw_Logo.png"
                  alt="ISANSW"
                  width={64}
                  height={64}
                  className="h-20 w-auto object-contain"
                />
                <h2 className="text-2xl font-bold text-red-600">
                  How to Reach Us
                </h2>
              </div>

              <div className="mx-6 mt-4 h-[2px] rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-transparent" />

              <div className="space-y-3 px-6 pb-20 pt-5 text-gray-900">
                <p>
                  <span className="text-lg font-semibold text-gray-700">
                    Email:
                  </span>{" "}
                  medkomppiansw@gmail.com
                </p>
                <p>
                  <span className="text-lg font-semibold text-gray-700">
                    Based On:
                  </span>{" "}
                  Sydney, NSW, Australia
                </p>

                <a
                  href="mailto:info@isansw.org"
                  className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
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

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-red-50 hover:text-red-700"
    >
      {children}
    </Link>
  );
}
