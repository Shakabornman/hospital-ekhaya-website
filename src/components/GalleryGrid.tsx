"use client";

import { useEffect, useState } from "react";
import { getAllGalleryPhotos, groupByCategory, type GalleryPhoto } from "@/lib/gallery";

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<GalleryPhoto[] | null>(null);

  useEffect(() => {
    getAllGalleryPhotos()
      .then(setPhotos)
      .catch(() => setPhotos([]));
  }, []);

  const grouped = photos ? groupByCategory(photos) : null;

  return (
    <>
      {!photos && <p className="text-sm text-teal-800/60">Loading…</p>}
      {photos && photos.length === 0 && (
        <p className="text-sm text-teal-800/60">No photos yet — check back soon.</p>
      )}

      {grouped &&
        Array.from(grouped.entries()).map(([category, items], i) => (
          <div key={category} className={i > 0 ? "mt-14" : ""}>
            <h2 className="font-serif text-2xl font-medium text-teal-950 mb-6">
              {category}
            </h2>
            {/* Fixed-height cells with object-contain: every photo is shown
                in full regardless of orientation. Landscape photos fill the
                cell; portrait photos letterbox with the bone background
                rather than ever being cropped. */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((photo, j) => (
                <div
                  key={photo.id}
                  className={`relative h-[340px] overflow-hidden bg-bone flex items-center justify-center ${
                    j % 5 === 0
                      ? "rounded-tr-[28px] rounded-bl-[28px]"
                      : "rounded-tr-[14px] rounded-bl-[14px]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || category}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-teal-950/70 text-cream text-[12px] px-3 py-1.5">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
