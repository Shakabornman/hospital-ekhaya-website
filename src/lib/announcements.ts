import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export type Announcement = {
  id: string;
  title: string;
  tag?: string; // e.g. "Event", "Competition", "Notice"
  teaser: string; // short one-liner shown in the site-wide banner strip
  description?: string; // longer body shown in the events section card
  eventDate?: string; // ISO date "2026-10-03" — if set, shows a date block
  deadlineLabel?: string; // free text, e.g. "RSVP by 20 Sept 2026" or "Entries close 30 September"
  ctaLabel?: string; // e.g. "RSVP — 053 050 0500"
  ctaHref?: string; // tel:, https://wa.me/..., mailto:
  imageUrl?: string;
  active?: boolean; // staff toggles this off to hide without deleting
};

// Fetches everything and filters client-side, rather than querying with a
// Firestore composite index (active == true + orderBy createdAt), since the
// collection will stay small. Simpler to manage, no index setup needed.
export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const q = query(collection(db, "website_announcements"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Announcement, "id">) }))
    .filter((a) => a.active !== false);
}
