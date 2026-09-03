"use client";

import { useEffect, useState } from "react";
import { getActiveAnnouncements, type Announcement } from "@/lib/announcements";

function DateBlock({ iso }: { iso: string }) {
  const d = new Date(`${iso}T00:00:00`);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-ZA", { month: "short" });
  const year = d.getFullYear();
  return (
    <div className="bg-teal-900 text-cream flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 px-5 sm:px-4 py-4 sm:py-5 sm:w-[130px] shrink-0">
      <div className="font-serif text-3xl sm:text-4xl font-semibold leading-none">
        {day}
      </div>
      <div className="flex sm:flex-col items-center gap-1 sm:gap-0">
        <div className="text-[11px] tracking-widest uppercase sm:mt-1 text-sage-light">
          {month}
        </div>
        <div className="text-[11px] text-[#AECFCB] sm:mt-0.5">{year}</div>
      </div>
    </div>
  );
}

export default function AnnouncementsSection() {
  const [items, setItems] = useState<Announcement[] | null>(null);

  useEffect(() => {
    getActiveAnnouncements()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  // Nothing active — the whole section disappears rather than showing empty.
  if (items && items.length === 0) return null;

  return (
    <section className="bg-bone-2 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-[5%]">
        <p className="text-maroon text-[13px] tracking-[0.08em] uppercase font-semibold mb-4">
          Upcoming
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-teal-950 mb-10">
          What&rsquo;s happening at Hospital@Ekhaya
        </h2>

        {!items && <p className="text-teal-800/60 text-sm">Loading…</p>}

        <div className="grid gap-5">
          {items?.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-teal-900/8 rounded-tr-[4px] rounded-bl-[22px] overflow-hidden flex flex-col sm:flex-row"
            >
              {a.eventDate ? (
                <DateBlock iso={a.eventDate} />
              ) : (
                <div className="bg-teal-900 text-cream flex items-center justify-center px-6 py-4 sm:w-[130px] shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-sage-light text-center">
                    {a.tag || "Notice"}
                  </span>
                </div>
              )}
              <div className="p-6">
                {a.tag && a.eventDate && (
                  <p className="text-maroon text-[12px] font-semibold uppercase tracking-wide mb-1">
                    {a.tag}
                  </p>
                )}
                <h3 className="font-serif text-xl font-medium text-teal-950 mb-2">
                  {a.title}
                </h3>
                {a.description && (
                  <p className="text-[14px] leading-relaxed text-teal-800/75 mb-3 max-w-2xl">
                    {a.description}
                  </p>
                )}
                {a.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.imageUrl}
                    alt={a.title}
                    className="mb-4 w-full max-w-xs rounded-md border border-teal-900/10"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="flex flex-wrap items-center gap-4">
                  {a.deadlineLabel && (
                    <span className="text-[13px] font-medium text-teal-900">
                      📅 {a.deadlineLabel}
                    </span>
                  )}
                  {a.ctaHref && (
                    <a
                      href={a.ctaHref}
                      className="inline-block bg-maroon text-cream text-[13px] font-semibold px-5 py-2.5 rounded-tr-[8px] rounded-bl-[8px]"
                    >
                      {a.ctaLabel || "Learn more"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
