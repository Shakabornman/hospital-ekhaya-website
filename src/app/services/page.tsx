import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our services — Hospital@Ekhaya",
  description:
    "Comprehensive healthcare services at Hospital@Ekhaya: emergency care, general practice, maternity, chronic disease management, laboratory, pharmacy, radiology and more.",
};

const services = [
  {
    title: "Emergency care",
    desc: "24/7 emergency medical services with fully equipped trauma unit and ambulance services.",
    badge: "24/7",
  },
  {
    title: "General practice",
    desc: "Comprehensive primary healthcare services including consultations and routine check-ups.",
    badge: "Daily",
  },
  {
    title: "Maternity & paediatrics",
    desc: "Specialised care for mothers and children, including prenatal care and paediatric services.",
    badge: "Specialised",
  },
  {
    title: "Chronic disease management",
    desc: "Ongoing care for diabetes, hypertension, HIV/AIDS, and other chronic conditions.",
    badge: "Ongoing",
  },
  {
    title: "Laboratory services",
    desc: "Full pathology lab with blood tests, urine analysis, and diagnostic testing.",
    badge: "Same day",
  },
  {
    title: "Pharmacy",
    desc: "On-site pharmacy with prescription medications and over-the-counter drugs.",
    badge: "On-site",
  },
  {
    title: "Radiology",
    desc: "X-ray services and basic imaging for diagnostic purposes.",
    badge: "Imaging",
  },
  {
    title: "Outpatient services",
    desc: "Specialist consultations and follow-up appointments for various medical conditions.",
    badge: "Appointments",
  },
  {
    title: "Preventive care",
    desc: "Vaccinations, health screenings, and community health education programs.",
    badge: "Prevention",
  },
  {
    title: "Rehabilitation",
    desc: "Physical therapy and rehabilitation services for recovery and mobility improvement.",
    badge: "Recovery",
  },
  {
    title: "Psychiatric services",
    desc: "Mental health care including counselling, therapy, and psychiatric consultations.",
    badge: "Mental health",
  },
  {
    title: "Wound care",
    desc: "Specialised wound care and treatment for chronic wounds, ulcers, and injuries.",
    badge: "Specialised",
  },
  {
    title: "IV clinic",
    desc: "Intravenous therapy services including hydration, medication administration, and infusions.",
    badge: "Infusion",
  },
];

const departments = [
  { name: "Emergency department", hours: "24/7", phone: "061 522 0536" },
  { name: "General practice", hours: "Mon–Fri: 7am–5pm", phone: "053 050 0500" },
  { name: "Maternity ward", hours: "24/7", phone: "053 050 0500" },
  { name: "Pharmacy", hours: "Mon–Fri: 8am–5pm", phone: "053 050 0500" },
  { name: "Laboratory", hours: "Mon–Fri: 7am–4pm", phone: "053 050 0500" },
  { name: "Administration", hours: "Mon–Fri: 8am–4pm", phone: "053 050 0500" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Quality care when you need it"
        intro="Hospital@Ekhaya provides comprehensive healthcare services to meet the diverse medical needs of our community — from emergency care to specialised treatments."
      />

      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-tr-[18px] rounded-bl-[18px] p-6 border border-teal-900/8"
              >
                <span className="inline-block text-[11px] font-semibold tracking-wide uppercase text-sage bg-sage/10 px-2.5 py-1 rounded mb-4">
                  {s.badge}
                </span>
                <h3 className="font-serif text-lg font-medium text-teal-950 mb-2">
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-teal-800/70">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-tr-[24px] rounded-bl-[24px] p-6 sm:p-8 border border-teal-900/8">
            <h2 className="font-serif text-2xl font-medium text-teal-950 mb-6 text-center">
              Department directory
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {departments.map((d) => (
                <div key={d.name} className="p-4 bg-bone rounded-lg">
                  <h4 className="font-serif font-medium text-teal-950 mb-1.5">
                    {d.name}
                  </h4>
                  <p className="text-[13px] text-teal-800/70">{d.hours}</p>
                  <p className="text-[13px] font-medium text-teal-900">
                    {d.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-maroon-dark">
        <div className="max-w-6xl mx-auto px-[5%] py-14 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-cream mb-4">
            Emergency services available 24/7
          </h2>
          <p className="text-[15px] text-cream/80 mb-6 max-w-xl mx-auto">
            Our emergency department is always ready to provide immediate
            medical care when you need it most.
          </p>
          <Link
            href="tel:0615220536"
            className="inline-block bg-cream text-maroon-dark font-semibold text-sm px-7 py-3.5 rounded-tr-[10px] rounded-bl-[10px]"
          >
            Call 061 522 0536
          </Link>
        </div>
      </section>
    </>
  );
}
