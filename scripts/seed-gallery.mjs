// One-time script to migrate the existing Heritage Day photos (currently
// static files in public/images/gallery/) into the new Firestore-backed
// gallery system. Run via the "Seed gallery" GitHub Actions workflow.

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { readdirSync } from "fs";
import { join } from "path";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "hae-vuma-92fca.firebasestorage.app",
});

const db = getFirestore();
const bucket = getStorage().bucket();

const localDir = "public/images/gallery";
const category = "Heritage Day 2025";
const categorySlug = "heritage-day-2025";

const files = readdirSync(localDir).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const localPath = join(localDir, file);
  const destPath = `website-public/gallery/${categorySlug}/${file}`;

  await bucket.upload(localPath, {
    destination: destPath,
    metadata: { contentType: "image/jpeg" },
  });

  const fileRef = bucket.file(destPath);
  await fileRef.makePublic();
  const imageUrl = `https://storage.googleapis.com/${bucket.name}/${destPath}`;

  await db.collection("website_gallery").add({
    category,
    imageUrl,
    createdAt: FieldValue.serverTimestamp(),
  });

  console.log(`Migrated ${file} -> ${imageUrl}`);
}

console.log("Done.");
process.exit(0);
