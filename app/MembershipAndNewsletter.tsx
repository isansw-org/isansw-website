"use client";

import Image from "next/image";

export default function MembershipAndNewsletter() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="bg-amber-50">
      {/* Red gradient backdrop */}
      <div className="relative overflow-hidden">
        <div className="h-10 w-full bg-gradient-to-b from-amber-50 to-red-500/70" />

        <div className="mx-auto -mt-6 max-w-6xl px-4 pb-16">
          {/* Membership CTA card */}
          <div className="rounded-3xl border-4 border-orange-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 backdrop-blur-sm md:p-8">
            <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[340px,1fr]">
              {/* decorative circles */}
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-200/50 blur-md" />
              <div className="pointer-events-none absolute left-44 top-16 h-36 w-36 rounded-full bg-orange-300/40 blur-md" />

              {/* Card / logo */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="rounded-2xl bg-red-600/90 p-6 text-white ring-4 ring-red-200/60 shadow">
                  <Image
                    src="/partners/ppi-aus.png" // replace with your image
                    alt="PPI Australia"
                    width={340}
                    height={210}
                    className="h-[140px] w-[240px] rounded-lg object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="z-10">
                <h3 className="text-2xl font-extrabold text-red-600">
                  Caught a case of event FOMO?
                </h3>
                <p className="mt-2 max-w-prose text-stone-700">
                  Become a member today, and be part of the fun
                </p>

                <a
                  href="/membership"
                  className="mt-6 inline-flex items-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Join as a Member
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Deep red gradient area for newsletter */}
        <div className="w-full bg-gradient-to-b from-red-500/70 to-red-600">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
            <h2 className="text-2xl font-extrabold tracking-wide">
              Wanna Know What We’re All About?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90">
              Subscribe for updates, insights, and student‑focused resources—direct to your
              inbox. Stay connected with a community that supports you.
            </p>

            <a
              href="/newsletter"
              className="mx-auto mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-md ring-1 ring-white/60 transition hover:-translate-y-0.5"
            >
              Join Our Newsletter
            </a>
          </div>
        </div>

        {/* Floating back-to-top button */}
        <button
          aria-label="Back to top"
          onClick={scrollTop}
          className="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-600 shadow-xl ring-2 ring-red-200 transition hover:-translate-y-0.5"
        >
          ▲
        </button>
      </div>
    </section>
  );
}
