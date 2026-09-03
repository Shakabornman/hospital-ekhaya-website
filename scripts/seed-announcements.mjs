// One-time script to seed the website_announcements collection.
// Run via the "Seed announcements" GitHub Actions workflow (manual
// trigger) — reads the service account key from the
// FIREBASE_SERVICE_ACCOUNT_KEY repository secret rather than a local file,
// so nothing sensitive ever touches disk on anyone's machine.

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const announcements = [
  {
    title: "Little Healthcare Heroes Day",
    tag: "Event",
    teaser: "Little Healthcare Heroes Day — Career Day, Sat 3 October. RSVP by 20 Sept.",
    description:
      "Dress-up in medical attire, meet our doctors and nurses, a hospital walk-through, and hands-on play with real equipment. For ages 4–7.",
    eventDate: "2026-10-03",
    deadlineLabel: "RSVP by 20 September 2026",
    ctaLabel: "RSVP — 053 050 0500",
    ctaHref: "tel:0530500500",
    active: true,
  },
  {
    title: "Name Our Mascot Competition!",
    tag: "Competition",
    teaser: "Name our new mascot! Learners 12 and under — win a Spur voucher for you and 5 friends.",
    description:
      "Help us name the new friendly mascot for Hospital@Ekhaya. Send your mascot name idea, your name, and contact number via WhatsApp. Must be 12 years or younger.",
    deadlineLabel: "Entries close 30 September 2026",
    ctaLabel: "Enter via WhatsApp",
    ctaHref: "https://wa.me/27676287272",
    active: true,
  },
];

for (const a of announcements) {
  const ref = await db.collection("website_announcements").add({
    ...a,
    createdAt: FieldValue.serverTimestamp(),
  });
  console.log(`Added "${a.title}" as ${ref.id}`);
}

console.log("Done.");
process.exit(0);
