import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Gallery — Hospital@Ekhaya",
  description:
    "Photos from Hospital@Ekhaya's community events, including Heritage Day celebrations in Galeshewe, Kimberley.",
};

const photos = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/gallery/heritage-day-${i + 1}.jpg`,
  alt: `Heritage Day at Hospital@Ekhaya, photo ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our community"
        intro="A look at Heritage Day and other community events at Hospital@Ekhaya."
      />

      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((p, i) => (
              <div
                key={p.src}
                className={`relative aspect-[4/3] overflow-hidden ${
                  i % 5 === 0
                    ? "rounded-tr-[28px] rounded-bl-[28px]"
                    : "rounded-tr-[14px] rounded-bl-[14px]"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
