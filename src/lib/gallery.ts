import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { resizeImage } from "./imageResize";

export type GalleryPhoto = {
  id: string;
  category: string; // groups photos into sections/events, e.g. "Heritage Day 2025"
  caption?: string;
  imageUrl: string;
};

export async function getAllGalleryPhotos(): Promise<GalleryPhoto[]> {
  const q = query(collection(db, "website_gallery"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryPhoto, "id">) }));
}

export async function createGalleryPhoto(data: Omit<GalleryPhoto, "id">) {
  return addDoc(collection(db, "website_gallery"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function deleteGalleryPhoto(id: string) {
  return deleteDoc(doc(db, "website_gallery", id));
}

// Uploads to Storage under website-public/gallery/{category}/ and returns
// the correct public download URL.
export async function uploadGalleryImage(file: File, category: string): Promise<string> {
  const resized = await resizeImage(file);
  const cleanCategory = category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const cleanName = resized.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `website-public/gallery/${cleanCategory}/${Date.now()}-${cleanName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, resized);
  return getDownloadURL(storageRef);
}

// Groups a flat list into { category: photos[] }, preserving the order
// categories first appear in (newest photo's category first, since the
// list is already sorted by createdAt desc).
export function groupByCategory(photos: GalleryPhoto[]): Map<string, GalleryPhoto[]> {
  const map = new Map<string, GalleryPhoto[]>();
  for (const photo of photos) {
    const key = photo.category || "Uncategorised";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(photo);
  }
  return map;
}
