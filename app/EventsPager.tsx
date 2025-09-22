"use client";

import { useState } from "react";
import EventTicket, { EventItem } from "./eventticket"; // adjust path

type Props = {
  events: EventItem[];
  perPage?: number; // how many tickets visible at once
};

export default function EventsPager({ events, perPage = 3 }: Props) {
  // index points to the first visible item (carousel window)
  const [index, setIndex] = useState(0);

  // handle short arrays too
  const n = events.length || 1;
  const start = ((index % n) + n) % n;

  // build a wrap-around window of size perPage
  const window: EventItem[] = [];
  for (let i = 0; i < Math.min(perPage, n); i++) {
    window.push(events[(start + i) % n]);
  }

  return (
    <div className="w-full">
      {/* tickets */}
      <div className="flex flex-wrap items-start justify-center gap-8 group">
        {window.map((e, i) => (
          <EventTicket key={`${e.id}-${start + i}`} e={e} />
        ))}
      </div>

      {/* exactly 3 dots, always */}
      <div className="mt-8 flex justify-center gap-3">
        {Array.from({ length: 3 }).map((_, i) => {
          const isActive = index % 3 === i;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show set ${i + 1}`}
              className={[
                "h-4 w-4 rounded-full transition",
                isActive
                  ? "bg-red-600"
                  : "bg-transparent ring-2 ring-red-600 hover:bg-red-600/20",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
