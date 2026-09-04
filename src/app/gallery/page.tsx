import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Hospital@Ekhaya",
  description:
    "Photos from Hospital@Ekhaya's community events, organised by occasion, in Galeshewe, Kimberley.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our community"
        intro="A look at events and happenings at Hospital@Ekhaya, organised by occasion."
      />

      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%]">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
