"use client";

import { useEffect, useState } from "react";
import { getActiveAnnouncements, type Announcement } from "@/lib/announcements";

export default function AnnouncementBar() {
  const [item, setItem] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getActiveAnnouncements()
      .then((list) => {
        if (list.length) setItem(list[0]);
      })
      .catch(() => {
        // Fails quietly — a missing banner shouldn't break the rest of the site
      });
  }, []);

  if (!item || dismissed) return null;

  return (
    <div className="relative bg-maroon text-cream px-[5%] py-2.5 flex items-center justify-center gap-3 flex-wrap text-[13.5px] text-center">
      {item.tag && (
        <span className="bg-cream/15 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide shrink-0">
          {item.tag}
        </span>
      )}
      <span>{item.teaser}</span>
      {item.ctaHref && (
        <a
          href={item.ctaHref}
          className="underline underline-offset-2 font-semibold shrink-0"
        >
          {item.ctaLabel || "Learn more"}
        </a>
      )}
      <button
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-3 sm:right-5 text-cream/70 hover:text-cream text-sm"
      >
        ✕
      </button>
    </div>
  );
}
