import type { Metadata } from "next";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hospital@Ekhaya — Your home for health in Galeshewe, Kimberley",
  description:
    "Hospital@Ekhaya provides quality healthcare services to the Galeshewe community in Kimberley, Northern Cape. 24/7 emergency care, general practice, maternity services and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <AnnouncementBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
