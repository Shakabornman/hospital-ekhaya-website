import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us — Hospital@Ekhaya",
  description:
    "Contact Hospital@Ekhaya in Galeshewe, Kimberley — phone numbers, address, operating hours, and a message form.",
};

const contactInfo = [
  {
    title: "Phone numbers",
    details: [
      { label: "Emergency line", value: "061 522 0536", urgent: true },
      { label: "General enquiries", value: "053 050 0500" },
      { label: "Appointments", value: "053 050 0500" },
    ],
  },
  {
    title: "Our location",
    details: [
      { label: "Address", value: "Cnr Hulana and Motopo Street" },
      { label: "Area", value: "Galeshewe, Kimberley" },
      { label: "Province", value: "Northern Cape, South Africa" },
    ],
  },
  {
    title: "Operating hours",
    details: [
      { label: "Emergency department", value: "24/7 — Always open", urgent: true },
      { label: "General services", value: "Mon–Fri: 7am – 5pm" },
      { label: "Weekend services", value: "Saturday: 8am – 1pm" },
    ],
  },
  {
    title: "Email",
    details: [
      { label: "General", value: "info@hospitalekhaya.co.za" },
      { label: "Appointments", value: "appointments@hospitalekhaya.co.za" },
      { label: "Administration", value: "admin@hospitalekhaya.co.za" },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="We're here to help"
        intro="Contact us for emergencies, appointments, or general enquiries — or send us a message below."
      />

      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%] grid lg:grid-cols-2 gap-10">
          <div className="grid sm:grid-cols-2 gap-5">
            {contactInfo.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-tr-[18px] rounded-bl-[18px] p-6 border border-teal-900/8"
              >
                <h3 className="font-serif text-lg font-medium text-teal-950 mb-4">
                  {c.title}
                </h3>
                <div className="space-y-3">
                  {c.details.map((d) => (
                    <div key={d.label}>
                      <p className="text-[12px] font-medium text-teal-800/60">
                        {d.label}
                      </p>
                      <p
                        className={
                          d.urgent
                            ? "font-semibold text-maroon"
                            : "font-medium text-teal-950 text-sm"
                        }
                      >
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
