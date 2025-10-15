"use client";

import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";
import Image from "next/image";
import Link from "next/link";
import AutoCarousel from "./carousel";
import { EventItem } from "./eventticket";
import AutoScroller from "./AutoScroller";
import { Deal } from "./DealCard";
import MembershipAndNewsletter from "./MembershipAndNewsletter";
import EventsPager from "./EventsPager";
import DealsCarousel from "./DealsCarousel"; //test

const events: EventItem[] = [
  {
    id: "1",
    title: "DOMIENATOR",
    subtitle: "~ISA’s Indomie Competition~",
    date: "03/05/2025",
    image: "/image/domienator.png",
    href: "/events",
  },
  {
    id: "2",
    title: "Jejak Senja",
    subtitle: "~Exploring Sydney's Scenes~",
    date: "10/05/2025",
    image: "/image/jejaksenja.png",
    href: "/events",
  },
  {
    id: "3",
    title: "NSW Cup",
    subtitle: "~ISA’s Sports Competition~",
    date: "28/08/2025",
    image: "/image/nswCup.png",
    href: "/events",
  },
];

const deals: Deal[] = [
  {
    brand: "Kenangan Coffee",
    headline: "Discount: 10% off",
    detail: "total bill when dining",
    image: "/image/kenangancoffee.jpg",
  },
  {
    brand: "Bintang Bro",
    headline: "Discount: 10% off",
    detail:
      "total bill and Buy 3 main meals, get 1 free. (only at Westfield City Mall)",
    image: "/image/bintangbrofood.png",
  },
  {
    brand: "Sweet Republic",
    headline: "Discount: 10% off",
    detail:
      "total bill (Free selected toppings and sauces, only on Mon - Fri, 2:30 - 4:00 pm)",
    image: "/image/sweetrepublicfood.jpeg",
  },
  {
    brand: "Dedy's Cafe",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/dedyscafefood.jpeg",
  },
  {
    brand: "Vicious Cycle",
    headline: "Discount: 20% off",
    detail: "for 5, 10, or 20 class credit packages",
    image: "/image/viciouscycleimage.jpg",
  },
  {
    brand: "Ayam Goreng 99",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/ayamgoreng99food.png",
  },
  {
    brand: "Squid Pocha",
    headline: "Discount: 10% off",
    detail: "total bill on (SUN - THU)",
    image: "/image/squidpochafood.jpeg",
  },
  {
    brand: "PANDA",
    headline: "Free entry",
    detail: "for PPIA members before 11pm",
    image: "/image/pandaimage.png",
  },
  {
    brand: "WooTea",
    headline: "Discount: 10% off",
    detail: "total bill",
    image: "/image/wooteadrink.png",
  },
  {
    brand: "EscapeHunt",
    headline: "Discount: 15% off",
    detail: "total bill with code (PPIA15)",
    image: "/image/escapehuntplace.jpg",
  },
  {
    brand: "Quiz Room",
    headline: "Discount: 15% off",
    detail: "total bill with code (PPIA15)",
    image: "/image/quizroomplace.jpg",
  },
  {
    brand: "Virtual Room",
    headline: "Discount: 15% off",
    detail: "total bill with code (PPIA15)",
    image: "/image/virtualroomplace.jpeg",
  },
  {
    brand: "Geprek in Sydney",
    headline: "FREE",
    detail: "Teh kotak with (min purchase of 1 Geprek Bowl)",
    image: "/image/geprekInAustralia.jpg",
  },
  {
    brand: "Innit Cafe & Bar",
    headline: "Discount: 10% off",
    detail: "all food and drinks anytime and anyday (Excluding the bar side)",
    image: "/image/innitcafefood.jpeg",
  },
  {
    brand: "Kangen Indo",
    headline: "Discount: 10% off base",
    detail: "(free pangsit with every purchase)",
    image: "/image/kangenindofood.png",
  },
  {
    brand: "Truffles",
    headline: "Discount: 10% off",
    detail: "total bill + additional 5% off with google review",
    image: "/image/trufflesfood.jpeg",
  },
  {
    brand: "Miezilla",
    headline: "Discount: 15% off",
    detail: "total bill (need to show PPIA Card)",
    image: "/image/miezillafood.jpeg",
  },
  {
    brand: "Hairzone Sydney",
    headline: "Discount: 15% off",
    detail: "on all services",
    image: "/image/hairzoneimage.jpeg",
  },
  {
    brand: "nailed by ella",
    headline: "Discount: 10% off",
    detail: "on any Gel X designs",
    image: "/image/nailsbyellaimage.jpeg",
  },
  {
    brand: "Q Billiards",
    headline: "Discount: 10% off",
    detail: "table hire, food and beverage items from 'Qafe'",
    image: "/image/qbilliardimage.jpg",
  },
];

const sponsors = [
  { src: "/image/little_IndoTown.png", name: "Little IndoTown" },
  { src: "/image/dapurSate.png", name: "Dapur Sate" },
  { src: "/image/kenanganCoffee.png", name: "Kenangan Coffee" },
  { src: "/image/bintangBro.png", name: "Bintang Bro" },
  { src: "/image/sweetRepublic.png", name: "Sweet Republic" },
  { src: "/image/dedyCafe.png", name: "Dedy Cafe" },
  { src: "/image/viciousCycle.jpg", name: "Vicious Cycle" },
  { src: "/image/ayamGoreng99.png", name: "Ayam Goreng 99" },
  { src: "/image/squidPocha.png", name: "Squid Pocha" },
  { src: "/image/wooTea.png", name: "Woo Tea" },
  { src: "/image/escapeHunt.jpg", name: "Escape Hunt" },
  { src: "/image/quizRoom.jpg", name: "Quiz Room" },
  { src: "/image/virtualRoom.png", name: "Virtual Room" },
  { src: "/image/geprekInAustralia.jpg", name: "Geprek In Australia" },
  { src: "/image/innitCafe.png", name: "Innit Cafe" },
];

export default function Home() {
  return (
    <section className="bg-amber-50">
      <Navbar />

      {/* HERO responsive */}
      <section className="bg-amber-50 pt-6 md:pt-8">
        <div className="relative w-full h-[clamp(260px,55vh,520px)] mb-6 md:mb-10 lg:mb-12">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/image/homepage_poster.jpg"
            className="absolute inset-0 h-full w-full object-contain"
          >
            <source src="/image/homepage.webm" type="video/webm" />
            <source src="/image/homepage.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* WHO ARE WE Section */}
      <section className="bg-amber-50 sm:pt-4 md:pt-6 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl border-2 border-red-300 bg-red-50/30 p-2 shadow-sm">
              <div className="overflow-hidden rounded-2xl ring-4 ring-red-200/60">
                <Image
                  src="/image/ISAPIC.JPG"
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
              href="/about"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:translate-y-[-1px] hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Want To Find More About Us?
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <AutoCarousel
        images={[
          { src: "/image/homePic1.jpg" },
          { src: "/image/homePic2.JPG" },
          { src: "/image/homePic3.JPG" },
          { src: "/image/homePic4.JPG" },
          { src: "/image/homePic5.JPG" },
          { src: "/image/homePic6.JPG" },
          { src: "/image/homePic7.JPG" },
          { src: "/image/homePic8.JPG" },
          { src: "/image/homePic9.JPG" },
          { src: "/image/homePic10.JPG" },
          { src: "/image/homePic11.jpg" },
        ]}
        height={200}
        width={280}
        speedSec={40}
      />

      {/* Events */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-red-600">
          🎉 Upcoming ISA Events 🎉
        </h2>
        <EventsPager events={events} perPage={3} />
      </section>

      {/* 3D CTA */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-b from-red-600 to-orange-400 p-1 shadow-xl ring-1 ring-black/10">
          <div className="rounded-t-3xl px-6 py-5 text-white">
            <h3 className="mt-2 text-2xl font-extrabold text-center">
              ISA Branch Across NSW
            </h3>
            <p className="mt-1.5 text-center text-lg opacity-90">
              Get to know our partner universities and connect with your local
              student community.
            </p>
          </div>
          <Link href="/branches" className="block p-6 group">
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl ring-4 ring-orange-300/50">
              <Image
                src="/image/NSW_branches.png"
                alt="Interactive NSW Map (coming soon)"
                width={1280}
                height={720}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-md bg-white/90 px-6 py-2 text-sm font-semibold text-gray-800 shadow">
                  Click to view ISA NSW Map →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Deals */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="inline-flex items-center gap-2 rounded-full border-4 border-red-300 bg-red-600 px-4 py-2 text-white shadow-md">
          <span>🔥</span>
          <p className="text-lg font-extrabold">Hot Deals for Students</p>
        </div>
        <div className="mt-8">
          <DealsCarousel deals={deals} autoMs={3500} />
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="/sponsors"
            className="rounded-full bg-red-600 px-6 py-3 text-white shadow transition hover:-translate-y-0.5"
          >
            View More Student Deals
          </a>
        </div>
      </section>

      {/* Sponsors */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-2xl font-extrabold text-red-600">
          Special Thanks to Our Sponsors
        </h3>
        <p className="mt-2 text-stone-700">
          Who are able to help share the spirit of Indonesia in the heart of
          Sydney.
        </p>
        <div className="mt-6">
          <AutoScroller speedSec={80} className="py-6" gapClass="gap-10">
            {sponsors.map((sponsor, i) => (
              <div
                key={i}
                className="relative group/card flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow ring-1 ring-black/5"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={96}
                  height={96}
                  className="h-16 w-auto object-contain"
                />

                <span
                  className="
                    pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 translate-y-1
                    rounded-md bg-black px-2 py-1 text-xs text-white opacity-0
                    shadow-sm ring-1 ring-black/20
                    transition duration-150 ease-out
                    group-hover/card:opacity-100 group-hover/card:translate-y-0
                    whitespace-nowrap
                  "
                >
                  {sponsor.name}
                </span>
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
