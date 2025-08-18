import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-500 text-amber-50">
      {/* Top section */}
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-lg">
        {/* Logo */}
        <div className="flex items-start">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/image/isansw_Logo.png"
              alt="ISANSW"
              width={320}
              height={128}
              className="h-20 md:h-24 lg:h-28 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl md:text-2xl mb-3">Quick Links</h3>
          <ul className="space-y-2 text-amber-50/90">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="/branches" className="hover:underline">
                Branches
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:underline">
                Sponsors
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-xl md:text-2xl mb-3">Contact Us</h3>
          <ul className="space-y-2 text-amber-50/90">
            <li>
              <Link href="/contact" className="hover:underline">
                Inquiry
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:underline">
                Contact Our Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-2 border-white rounded-2xl" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-base md:text-lg">
        <p className="text-amber-50/90">
          © {new Date().getFullYear()} ISANSW. All rights reserved.{" "}
          <span className="mx-2">•</span>
          Made by <span className="font-semibold">Webmaster 2025</span>
        </p>

        <div className="flex items-center gap-6">
          <div className="space-x-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms and Conditions
            </Link>
          </div>

          {/* Socials */}
          <div className="ml-4 flex items-center gap-4">
            <a
              href="https://www.instagram.com/isa_nsw/"
              aria-label="Instagram"
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://x.com/ppiansw"
              aria-label="X (Twitter)"
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
            >
              <Twitter size={22} />
            </a>
            <a
              href="https://www.facebook.com/ppiansw/"
              aria-label="Facebook"
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.linkedin.com/company/indonesian-student-association-new-south-wales/"
              aria-label="LinkedIn"
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
