import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-cream mt-auto">
      <div className="max-w-6xl mx-auto px-[5%] py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="bg-cream inline-block rounded-tr-[10px] rounded-bl-[10px] px-3 py-1.5 mb-4">
            <Image
              src="/images/brand/logo.png"
              alt="Hospital@Ekhaya logo"
              width={140}
              height={98}
              className="h-11 w-auto"
            />
          </div>
          <p className="text-sm text-[#AECFCB] leading-relaxed">
            &ldquo;Ekhaya&rdquo; means home. Quality, compassionate healthcare for
            Galeshewe and Greater Kimberley.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-medium mb-4">Find us</h3>
          <p className="text-sm text-[#AECFCB] leading-relaxed">
            Cnr Hulana &amp; Motopo Street
            <br />
            Galeshewe, Kimberley
            <br />
            Northern Cape, South Africa
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-medium mb-4">Contact</h3>
          <ul className="text-sm text-[#AECFCB] space-y-2">
            <li>Emergency: 061 522 0536</li>
            <li>General: 053 050 0500</li>
            <li>info@hospitalekhaya.co.za</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-medium mb-4">Quick links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/services" className="text-[#AECFCB] hover:text-cream">
                Our services
              </Link>
            </li>
            <li>
              <Link href="/book-appointment" className="text-[#AECFCB] hover:text-cream">
                Book an appointment
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="text-[#AECFCB] hover:text-cream">
                Patient forms &amp; downloads
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-[5%] py-5 text-center text-xs text-[#8FB5B1]">
        © {new Date().getFullYear()} Hospital@Ekhaya. All rights reserved.
      </div>
    </footer>
  );
}
