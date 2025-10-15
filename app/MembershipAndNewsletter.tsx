"use client";

import Image from "next/image";

export default function MembershipAndNewsletter() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="bg-amber-50">
      <div className="relative">
        {/* Top area (no stripe) */}
        <div className="mx-auto max-w-6xl px-4 py-20">
          {/* Membership CTA card */}
          <div className="relative rounded-3xl border-4 border-orange-200/80 bg-white/80 p-8 md:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 backdrop-blur-sm">
            <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 min-h-[360px] md:min-h-[420px]">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-200/50 blur-md" />
              <div className="pointer-events-none absolute left-44 top-16 h-36 w-36 rounded-full bg-orange-300/40 blur-md" />

              {/* Card / logo */}
              <div className="relative z-10 flex items-center justify-center md:justify-start md:order-1">
                <div className="rounded-2xl bg-red-600 p-1 ring-red-200/60 shadow-lg">
                  <Image
                    src="/image/ppiaCard.png" // file at /public/ppiaCard.png
                    alt="PPIA membership card"
                    width={450}
                    height={290}
                    priority
                    sizes="(min-width:1024px) 560px, (min-width:768px) 480px, 380px"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="z-10 md:order-2">
                <h3 className="text-3xl md:text-4xl font-extrabold text-red-600">
                  Caught a case of event FOMO?
                </h3>
                <p className="mt-4 max-w-prose text-stone-700 text-lg">
                  Become a member today, and be part of the fun.
                </p>

                <a
                  href="mailto: medkomppiansw@gmail.com"
                  className="mt-8 inline-flex items-center rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Email Us to Join as a Member
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cream → Red handoff*/}
        <div
          aria-hidden
          className="pointer-events-none h-30 w-full bg-gradient-to-b from-amber-50 to-red-500/80"
        />

        {/* Newsletter band (red gradient) */}
        <div className="w-full bg-gradient-to-b from-red-500/80 to-red-500">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              Wanna Know What We’re All About?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/90">
              Subscribe for updates, insights, and student-focused resources
              delivered to your inbox. Stay connected with a community that
              supports you.
            </p>

            <a
              href="mailto: medkomppiansw@gmail.com"
              className="mx-auto mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-md ring-1 ring-white/60 transition hover:-translate-y-0.5"
            >
              Join Our Newsletter
            </a>
          </div>
        </div>

        {/* Back-to-top button */}
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
