import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About us — Hospital@Ekhaya",
  description:
    "Our mission, values, and quick facts about Hospital@Ekhaya, a community hospital serving Galeshewe, Kimberley.",
};

const facts = [
  { label: "Established", value: "2024" },
  { label: "Beds", value: "24" },
  { label: "Staff members", value: "60+" },
  { label: "Patients served", value: "100's" },
];

const values = [
  {
    title: "Compassionate care",
    desc: "We treat every patient with kindness, respect, and the highest level of medical care.",
  },
  {
    title: "Community focused",
    desc: "Proudly serving the Galeshewe community with healthcare services tailored to local needs.",
  },
  {
    title: "Professional excellence",
    desc: "Our qualified medical team is committed to maintaining the highest standards of healthcare.",
  },
  {
    title: "Trust & safety",
    desc: "We ensure a safe, clean, and secure environment for all our patients and visitors.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Ekhaya means home, and that's exactly what we are"
        intro="In isiZulu and isiXhosa, 'Ekhaya' means home. We provide quality medical services with the warmth and care of family, right here in Galeshewe."
      />

      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%] grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-teal-950 mb-5">
              Our mission
            </h2>
            <p className="text-[15.5px] leading-relaxed text-teal-800/80 mb-6">
              To provide accessible, quality healthcare services to the
              residents of Galeshewe and surrounding areas, with a focus on
              preventive care, community health education, and compassionate
              treatment for all.
            </p>
            <p className="text-[15.5px] leading-relaxed text-teal-800/80">
              As a community hospital, we understand the unique health
              challenges facing our area and work tirelessly to address them
              with culturally sensitive, professional medical care.
            </p>
          </div>

          <div className="bg-white rounded-tr-[24px] rounded-bl-[24px] p-8 border border-teal-900/8">
            <h3 className="font-serif text-xl font-medium text-teal-950 mb-6">
              Quick facts
            </h3>
            <div className="space-y-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex justify-between items-center p-3.5 bg-bone rounded-lg"
                >
                  <span className="text-[14.5px] font-medium text-teal-900">
                    {f.label}
                  </span>
                  <span className="font-serif font-semibold text-teal-950">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%]">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-teal-950 mb-10 text-center">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-tr-[18px] rounded-bl-[18px] p-6 border border-teal-900/8"
              >
                <h3 className="font-serif text-lg font-medium text-teal-950 mb-2">
                  {v.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-teal-800/70">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
