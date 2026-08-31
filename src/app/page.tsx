import Image from "next/image";
import Link from "next/link";
import RoofDivider from "@/components/RoofDivider";

const stats = [
  { num: "24/7", label: "Emergency care" },
  { num: "24", label: "Hospital beds" },
  { num: "60+", label: "Staff members" },
];

const services = [
  {
    title: "Emergency care",
    desc: "24/7 emergency medical services with a fully equipped trauma unit.",
    badge: "24/7",
  },
  {
    title: "General practice",
    desc: "Comprehensive primary healthcare, consultations and routine check-ups.",
    badge: "Daily",
  },
  {
    title: "Maternity & paediatrics",
    desc: "Specialised care for mothers and children, including prenatal care.",
    badge: "Specialised",
  },
  {
    title: "Chronic disease management",
    desc: "Ongoing care for diabetes, hypertension, HIV/AIDS and other conditions.",
    badge: "Ongoing",
  },
];

const values = [
  {
    title: "Compassionate care",
    desc: "We treat every patient with kindness, respect, and the highest level of medical care.",
  },
  {
    title: "Community focused",
    desc: "Proudly serving the Galeshewe community with healthcare tailored to local needs.",
  },
  {
    title: "Professional excellence",
    desc: "Our qualified medical team upholds the highest standards of healthcare.",
  },
  {
    title: "Trust & safety",
    desc: "A safe, clean, and secure environment for every patient and visitor.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-[5%] pt-14 sm:pt-16 pb-0 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-cream pb-12">
            <p className="text-sage-light text-[13px] tracking-[0.08em] uppercase font-semibold mb-5">
              Community hospital · Galeshewe
            </p>
            <h1 className="font-serif font-medium text-[40px] sm:text-[52px] leading-[1.08] tracking-tight mb-6">
              Your home
              <br />
              for health,
              <br />
              <span className="text-[#9FCFC9]">right here.</span>
            </h1>
            <p className="text-[16.5px] leading-relaxed text-[#D7E6E4] max-w-[460px] mb-8">
              Hospital@Ekhaya provides quality, compassionate healthcare to
              Galeshewe and Greater Kimberley — from everyday care to 24/7
              emergencies.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-10">
              <Link
                href="/book-appointment"
                className="bg-maroon text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px]"
              >
                Book an appointment
              </Link>
              <Link
                href="/services"
                className="border border-cream/40 text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px]"
              >
                Our services
              </Link>
            </div>
            <div className="flex gap-0 border-t border-cream/15 pt-6 max-w-[460px]">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 pr-4">
                  <div className="font-serif text-2xl font-semibold text-cream">
                    {s.num}
                  </div>
                  <div className="text-xs text-[#AECFCB] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-tr-[28px] rounded-bl-[28px] overflow-hidden aspect-[4/3] lg:mb-0 mb-4">
            <Image
              src="/images/brand/hero.jpg"
              alt="Hospital@Ekhaya community hospital exterior"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        <RoofDivider />
      </section>

      {/* About preview */}
      <section className="bg-bone-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%] grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-maroon text-[13px] tracking-[0.08em] uppercase font-semibold mb-4">
              About us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-teal-950 mb-5">
              &ldquo;Ekhaya&rdquo; means home
            </h2>
            <p className="text-[15.5px] leading-relaxed text-teal-800/80 mb-4">
              In isiZulu and isiXhosa, Ekhaya means home — and that&rsquo;s
              exactly what we are: your home for healthcare in Galeshewe,
              Kimberley. We provide quality medical services with the warmth
              and care of family.
            </p>
            <p className="text-[15.5px] leading-relaxed text-teal-800/80 mb-8">
              As a community hospital, we understand the health challenges
              facing our area and work to address them with culturally
              sensitive, professional medical care.
            </p>
            <Link
              href="/about"
              className="text-maroon font-semibold text-sm underline underline-offset-4"
            >
              More about Hospital@Ekhaya →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-tr-[16px] rounded-bl-[16px] p-5 border border-teal-900/8"
              >
                <h3 className="font-serif text-base font-medium text-teal-950 mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-teal-800/70">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-bone py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-[5%]">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
            <div>
              <p className="text-maroon text-[13px] tracking-[0.08em] uppercase font-semibold mb-4">
                Our services
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-teal-950">
                Quality care when you need it
              </h2>
            </div>
            <Link
              href="/services"
              className="text-maroon font-semibold text-sm underline underline-offset-4 whitespace-nowrap"
            >
              View all services →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-maroon-dark">
        <div className="max-w-6xl mx-auto px-[5%] py-14 sm:py-16 text-center">
          <p className="text-cream/70 text-[13px] tracking-[0.08em] uppercase font-semibold mb-3">
            Medical emergency?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-cream mb-4">
            Our emergency department is open around the clock
          </h2>
          <a
            href="tel:0615220536"
            className="inline-block font-serif text-3xl sm:text-4xl font-semibold text-cream mb-8"
          >
            061 522 0536
          </a>
          <div>
            <a
              href="tel:0615220536"
              className="inline-block bg-cream text-maroon-dark font-semibold text-sm px-7 py-3.5 rounded-tr-[10px] rounded-bl-[10px]"
            >
              Call emergency now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
