"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "main > section, main section, main article, main form",
      );
      const headings = gsap.utils.toArray<HTMLElement>(
        "main h1, main h2, main h3",
      );
      const interactive = gsap.utils.toArray<HTMLElement>(
        "button, a[role='button'], main a",
      );

      gsap.from("header", {
        y: -20,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(headings.slice(0, 3), {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.15,
        ease: "power3.out",
      });

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      interactive.forEach((element) => {
        const lift = gsap.quickTo(element, "y", {
          duration: 0.25,
          ease: "power2.out",
        });

        element.addEventListener("mouseenter", () => lift(-2));
        element.addEventListener("mouseleave", () => lift(0));
      });

      gsap.from("footer", {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 95%",
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
