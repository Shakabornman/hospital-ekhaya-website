"use client";

import { useEffect, useState } from "react";
import { getActiveAnnouncements, type Announcement } from "@/lib/announcements";

const ROTATE_MS = 6000;

export default function AnnouncementBar() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    getActiveAnnouncements()
      .then(setItems)
      .catch((err) => {
        console.error("AnnouncementBar: failed to load announcements", err);
      });
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0 || dismissed) return null;

  const item = items[index];

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

      {items.length > 1 && (
        <div className="flex items-center gap-1.5 ml-1">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Show announcement ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                i === index ? "bg-cream opacity-100" : "bg-cream opacity-35"
              }`}
            />
          ))}
        </div>
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
