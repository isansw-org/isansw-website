import Navbar from "../../../components/common/navbar";
import Footer from "../../../components/common/footer";
import BranchCard from "./_components/BranchCard";
import { headOrg, branches } from "./data";
import Link from "next/link";

export default function BranchesPage() {
  return (
    <>
      <Navbar />

      <main className="bg-amber-50 min-h-screen">
        <div className="mx-auto max-w-8xl md:py-8">
          {/* Map + Heading */}
          <section aria-labelledby="map-heading" className="mt-6 md:mt-8">
            <h2
              id="map-heading"
              className="text-center text-red-600 text-2xl md:text-3xl font-bold"
            >
              Meet Our University Branches
            </h2>
            <div className="mt-4 mb-6 flex justify-center">
              <div className="h-[4px] w-100 bg-red-500/90 rounded-full" />
            </div>

            {/* Desktop/Laptop only */}
            <div className="hidden md:block">
              <div className="">
                <iframe
                  src="/mapscene"
                  title="Interactive NSW Map"
                  className="block w-full h-screen"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="md:hidden">
              <div className="rounded-2xl border border-red-200 bg-white p-5 text-center shadow-[0_6px_16px_rgba(0,0,0,0.07)]">
                <p className="text-black/80">
                  The interactive map is available on larger screens.
                </p>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-4 md:py-8">
            {/* Head Organization */}
            <section aria-labelledby="head-org" className="mt-8 md:mt-10">
              <h2
                id="head-org"
                className="text-center text-red-600 text-2xl md:text-3xl font-bold"
              >
                Head Organization
              </h2>
              <div className="mt-2 flex justify-center">
                <div className="h-[2px] w-40 bg-red-500/90 rounded-full" />
              </div>
              <div className="mt-4">
                <BranchCard {...headOrg} />
              </div>
            </section>

            {/* University Branches */}
            <section aria-labelledby="branches" className="mt-10 md:mt-12">
              <h2
                id="branches"
                className="text-center text-red-600 text-2xl md:text-3xl font-bold"
              >
                University Branches
              </h2>
              <div className="mt-2 flex justify-center">
                <div className="h-[2px] w-40 bg-red-500/90 rounded-full" />
              </div>

              <div className="mt-4 space-y-4 md:space-y-5">
                {branches.map((b) => (
                  <BranchCard key={b.name} {...b} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* bottom accent line */}
        <div className="h-[3px] w-full bg-red-500/90 mt-10" />
      </main>

      <Footer />
    </>
  );
}
