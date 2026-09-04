"use client";

import { useEffect, useState } from "react";
import { getAllGalleryPhotos, groupByCategory, type GalleryPhoto } from "@/lib/gallery";

// Masonry via JS-computed grid-row-span, not CSS multi-column. Each photo's
// span is set from its own rendered height once it loads, so tall portrait
// photos and wide landscape photos interleave naturally — nothing is ever
// cropped, and there's no column page-break slicing like the earlier
// `columns-*` approach had.
const ROW_PX = 8;
const GAP_PX = 16;

function MasonryTile({
  photo,
  rounded,
}: {
  photo: GalleryPhoto;
  rounded: boolean;
}) {
  const [span, setSpan] = useState(30);

  return (
    <div
      style={{ gridRowEnd: `span ${span}` }}
      className={`relative overflow-hidden bg-bone ${
        rounded ? "rounded-tr-[28px] rounded-bl-[28px]" : "rounded-tr-[14px] rounded-bl-[14px]"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.imageUrl}
        alt={photo.caption || photo.category}
        className="block w-full h-auto"
        onLoad={(e) => {
          const height = e.currentTarget.getBoundingClientRect().height;
          setSpan(Math.ceil((height + GAP_PX) / (ROW_PX + GAP_PX)));
        }}
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
  );
}

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
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              style={{ gridAutoRows: `${ROW_PX}px` }}
            >
              {items.map((photo, j) => (
                <MasonryTile key={photo.id} photo={photo} rounded={j % 5 === 0} />
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
