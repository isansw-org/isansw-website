import Navbar from "../components/common/navbar"; 
import Footer from "../components/common/footer";
import Image from "next/image";
import Link from "next/link";
import AutoCarousel from "./carousel";
import EventTicket, { EventItem } from "./eventticket";
import AutoScroller from "./AutoScroller";
import DealCard, { Deal } from "./DealCard";
import MembershipAndNewsletter from "./MembershipAndNewsletter";

const events: EventItem[] = [
  {
    id: "1",
    title: "DOMIENATOR",
    subtitle: "~ISA’s Indomie Competition~",
    date: "03/05/2025",
    image: "/events/domienator.jpg",
    href: "/events/domienator",
  },
  { id: "2", title: "DOMIENATOR", subtitle: "~ISA’s Indomie Competition~", date: "03/05/2025", image: "/events/domienator.jpg", href: "/events/domienator" },
  { id: "3", title: "DOMIENATOR", subtitle: "~ISA’s Indomie Competition~", date: "03/05/2025", image: "/events/domienator.jpg", href: "/events/domienator" },
];

const deals: Deal[] = [
  { brand: "Yo-Chi", headline: "Discount: 10% off", detail: "total bill", image: "/deals/yochi-1.jpg" },
  { brand: "Yo-Chi", headline: "Discount: 10% off", detail: "total bill", image: "/deals/yochi-2.jpg" },
  { brand: "Yo-Chi", headline: "Discount: 10% off", detail: "total bill", image: "/deals/yochi-3.jpg" },
  { brand: "Yo-Chi", headline: "Discount: 10% off", detail: "total bill", image: "/deals/yochi-4.jpg" },
];

const sponsors = [
  "/sponsors/yochi-logo.png",
  "/sponsors/yochi-logo.png",
  "/sponsors/yochi-logo.png",
  "/sponsors/yochi-logo.png",
  "/sponsors/yochi-logo.png",
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
                  src="/images/isansw-group.jpg" // update with your real path
                  alt="ISANSW community group photo"
                  width={900}
                  height={700}
                  priority
                  className="h-full w-full object-cover grayscale"
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
              className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:translate-y-[-1px] hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
        <AutoCarousel
          images={[
            { src: "/gallery/1.jpg" },
            { src: "/gallery/2.jpg" },
            { src: "/gallery/3.jpg" },
            { src: "/gallery/4.jpg" },
            { src: "/gallery/5.jpg" },
          ]}
          height={200}  
          width={280}
          speedSec={26} // slower/faster
        />

         <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-red-600">
          🎉 Upcoming ISA Events 🎉
        </h2>

        {/* Tickets */}
        <div className="flex flex-wrap items-start justify-center gap-8">
          {events.map((e) => (
            <EventTicket key={e.id} e={e} />
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-3">
          <span className="h-3 w-3 rounded-full bg-red-600/70" />
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-red-300" />
        </div>
      </section>

       {/* ---- Hot Deals ---- */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="inline-flex items-center gap-2 rounded-full border-4 border-red-300 bg-red-600 px-4 py-2 text-white shadow-md">
          <span>🔥</span>
          <p className="text-lg font-extrabold">Hot Deals for Students</p>
          <span>🔥</span>
        </div>

        <div className="mt-6">
          <AutoScroller speedSec={24} className="py-4">
            {deals.map((d, i) => (
              <DealCard key={i} deal={d} />
            ))}
          </AutoScroller>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="rounded-full bg-red-600 px-6 py-3 text-white shadow transition hover:-translate-y-0.5">
            View More Student Deals
          </button>
        </div>
      </section>

      {/* ---- Sponsors ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-2xl font-extrabold text-red-600">Powered by Our Sponsors</h3>
        <p className="mt-2 text-stone-700">
          Sharing the spirit of Indonesia in the heart of Sydney.
        </p>

        <div className="mt-6">
          <AutoScroller speedSec={18} className="py-6" gapClass="gap-10">
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
