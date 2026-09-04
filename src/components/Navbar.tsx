import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header>
      <div className="bg-maroon-dark text-cream text-[13px] px-[5%] py-2 flex justify-between items-center">
        <span className="hidden sm:inline">Galeshewe, Kimberley — Northern Cape</span>
        <a href="tel:0615220536" className="font-medium">
          Emergency line — 061 522 0536
        </a>
      </div>

      <nav className="bg-teal-900 px-[5%] py-2.5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 bg-cream rounded-tr-[10px] rounded-bl-[10px] px-3 py-2">
          <Image
            src="/images/brand/logo.png"
            alt="Hospital@Ekhaya logo"
            width={140}
            height={98}
            className="h-16 sm:h-20 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/90 text-sm font-medium hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-appointment"
            className="bg-maroon text-cream text-sm font-semibold px-5 py-2.5 rounded-tr-[10px] rounded-bl-[10px]"
          >
            Book appointment
          </Link>
        </div>
      </nav>
    </header>
  );
}
