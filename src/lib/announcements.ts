import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

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

// For the admin panel — returns every announcement regardless of active
// status, so staff can see and re-enable hidden/expired ones too.
export async function getAllAnnouncements(): Promise<Announcement[]> {
  const q = query(collection(db, "website_announcements"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Announcement, "id">) }));
}

export async function createAnnouncement(data: Omit<Announcement, "id">) {
  return addDoc(collection(db, "website_announcements"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateAnnouncement(id: string, data: Partial<Omit<Announcement, "id">>) {
  return updateDoc(doc(db, "website_announcements", id), data);
}

export async function deleteAnnouncement(id: string) {
  return deleteDoc(doc(db, "website_announcements", id));
}

// Uploads an image to Storage under website-public/announcements/ and
// returns the correct public download URL — never a gs:// path, so this
// permanently avoids the "pasted the wrong kind of URL" mistake.
export async function uploadAnnouncementImage(file: File): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `website-public/announcements/${Date.now()}-${cleanName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
