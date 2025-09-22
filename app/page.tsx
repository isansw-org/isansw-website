import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";
import Image from "next/image";
import Link from "next/link";
import AutoCarousel from "./carousel";
import EventTicket, { EventItem } from "./eventticket";
import AutoScroller from "./AutoScroller";
import DealCard, { Deal } from "./DealCard";
import MembershipAndNewsletter from "./MembershipAndNewsletter";
import EventsPager from "./EventsPager";
import DealsCarousel from "./DealsCarousel";

const events: EventItem[] = [
  {
    id: "1",
    title: "DOMIENATOR",
    subtitle: "~ISA’s Indomie Competition~",
    date: "03/05/2025",
    image: "/image/domienator.png",
    href: "/events/domienator",
  },
  {
    id: "2",
    title: "DOMIENATOR",
    subtitle: "~ISA’s Indomie Competition~",
    date: "03/05/2025",
    image: "/image/domienator.png",
    href: "/events/domienator",
  },
  {
    id: "3",
    title: "DOMIENATOR",
    subtitle: "~ISA’s Indomie Competition~",
    date: "03/05/2025",
    image: "/image/domienator.png",
    href: "/events/domienator",
  },
];

const deals: Deal[] = [
  {
    brand: "Yo-Chi",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/yochi_Logo.jpeg",
  },
  {
    brand: "Yo-Chi",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/yochi_Logo.jpeg",
  },
  {
    brand: "Yo-Chi",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/yochi_Logo.jpeg",
  },
  {
    brand: "Yo-Chi",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/yochi_Logo.jpeg",
  },
];

const sponsors = [
  "/image/little_IndoTown.png",
  "/image/dapurSate.png",
  "/image/kenanganCoffee.png",
  "/image/bintangBro.png",
  "/image/sweetRepublic.png",
  "/image/dedyCafe.png",
  "/image/viciousCycle.jfif",
  "/image/ayamGoreng99.png",
  "/image/squidPocha.png",
  "/image/wooTea.png",
  "/image/escapeHunt.jpg",
  "/image/quizRoom.jpg",
  "/image/virtualRoom.png",
  "/image/geprekInAustralia.jfif",
  "/image/innitCafe.png",
];

export default function Home() {
  return (
    <section className="bg-amber-50">
      <Navbar />

      {/* Hero / Landing Block */}
      <div className="flex justify-center h-screen items-center">
        <div className="text-lg text-center grid space-y-4">
          <h1 className="font-semibold text-4xl pb-4">ISANSW</h1>
          <p>
            Get started by making changes to the <code>app</code> directory.
          </p>
          <p>
            Go to <code>/admin</code> to access the admin dashboard.
          </p>
        </div>
      </div>

      {/* WHO ARE WE Section */}
      <section className="bg-amber-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl border-2 border-red-300 bg-red-50/30 p-2 shadow-sm">
              <div className="overflow-hidden rounded-2xl ring-4 ring-red-200/60">
                <Image
                  src="/image/ISAPIC.jpg" // update with your real path
                  alt="ISANSW community group photo"
                  width={900}
                  height={700}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-red-600 md:text-4xl">
              WHO ARE WE?
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-800">
              We support the well-being of{" "}
              <span className="font-semibold text-red-600">
                Indonesian students in Australia
              </span>{" "}
              and help them cultivate their potential while embracing
              Indonesia&apos;s cultural values in the context of{" "}
              <span className="font-semibold italic">a globalized world.</span>
            </p>
            <Link
              href="/committees"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:translate-y-[-1px] hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
      <AutoCarousel
        images={[
          { src: "/image/homePic1.jpg" },
          { src: "/image/homePic2.jpg" },
          { src: "/image/homePic3.jpg" },
          { src: "/image/homePic4.jpg" },
          { src: "/image/homePic5.jpg" },
        ]}
        height={200}
        width={280}
        speedSec={26} // slower/faster
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-red-600">
          🎉 Upcoming ISA Events 🎉
        </h2>

        <EventsPager events={events} perPage={3} />
      </section>

      {/* 3D CTA Section*/}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-b from-red-600 to-orange-400 p-1 shadow-xl ring-1 ring-black/10">
          {/* Header */}
          <div className="rounded-t-3xl px-6 py-5 text-white">
            <h3 className="mt-2 text-2xl font-extrabold text-center">
              ISA Branch Across NSW
            </h3>
            <p className="mt-1.5 text-center text-lg opacity-90">
              Get to know our partner universities and connect with your local
              student community.
            </p>
          </div>

          {/* Image preview -> links to branches */}
          <Link href="/branches" className="block p-6 group">
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl ring-4 ring-orange-300/50">
              {/* Preview image */}
              <Image
                src="/image/NSW_branches.png"
                alt="Interactive NSW Map (coming soon)"
                width={1280}
                height={720}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />

              {/* Overlay (hidden until hover) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-md bg-white/90 px-6 py-2 text-sm font-semibold text-gray-800 shadow">
                  Click to view ISA NSW Map →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---- Hot Deals ---- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="inline-flex items-center gap-2 rounded-full border-4 border-red-300 bg-red-600 px-4 py-2 text-white shadow-md">
          <span>🔥</span>
          <p className="text-lg font-extrabold">Hot Deals for Students</p>
        </div>

        <div className="mt-8">
          {/* new carousel */}
          <DealsCarousel deals={deals} autoMs={3500} />
        </div>

        <div className="mt-10 flex justify-center">
          <button className="rounded-full bg-red-600 px-6 py-3 text-white shadow transition hover:-translate-y-0.5">
            View More Student Deals
          </button>
        </div>
      </section>

      {/* ---- Sponsors ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-2xl font-extrabold text-red-600">
          Powered by Our Sponsors
        </h3>
        <p className="mt-2 text-stone-700">
          Sharing the spirit of Indonesia in the heart of Sydney.
        </p>

        <div className="mt-6">
          <AutoScroller speedSec={80} className="py-6" gapClass="gap-10">
            {sponsors.map((src, i) => (
              <div
                key={i}
                className="flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow ring-1 ring-black/5"
              >
                <Image
                  src={src}
                  alt="Sponsor logo"
                  width={96}
                  height={96}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </AutoScroller>
        </div>
      </section>
      <MembershipAndNewsletter />
      <Footer />
    </section>
  );
}
