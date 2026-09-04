"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  type GalleryPhoto,
  getAllGalleryPhotos,
  createGalleryPhoto,
  deleteGalleryPhoto,
  uploadGalleryImage,
  groupByCategory,
} from "@/lib/gallery";

export default function GalleryManager() {
  const [photos, setPhotos] = useState<GalleryPhoto[] | null>(null);
  const [category, setCategory] = useState("");
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    setPhotos(await getAllGalleryPhotos());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!category.trim() || files.length === 0) {
      setError("Category and at least one photo are required.");
      return;
    }
    setSaving(true);
    setProgress({ done: 0, total: files.length });
    let failures = 0;

    for (let i = 0; i < files.length; i++) {
      try {
        const imageUrl = await uploadGalleryImage(files[i], category);
        await createGalleryPhoto({
          category: category.trim(),
          caption: caption.trim() || undefined,
          imageUrl,
        });
      } catch (err) {
        failures++;
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Failed to upload ${files[i].name}:`, message);
      }
      setProgress({ done: i + 1, total: files.length });
    }

    if (failures > 0) {
      setError(
        `${failures} of ${files.length} photo(s) failed to upload. Check the console for details, the rest were added.`
      );
    } else {
      setCaption("");
    }
    setFiles([]);
    setSaving(false);
    setProgress(null);
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo? This can't be undone.")) return;
    await deleteGalleryPhoto(id);
    await refresh();
  }

  const grouped = photos ? groupByCategory(photos) : null;
  const existingCategories = grouped ? Array.from(grouped.keys()) : [];

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-teal-900/8 rounded-tr-[20px] rounded-bl-[20px] p-6 space-y-4 mb-10"
      >
        <h2 className="font-serif text-lg font-medium text-teal-950">Add photos</h2>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Category / event *
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            list="existing-categories"
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
            placeholder="e.g. Heritage Day 2025"
          />
          <datalist id="existing-categories">
            {existingCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <p className="text-[12px] text-teal-800/50 mt-1">
            Type an existing category to add to it, or a new one to start a section.
          </p>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Caption (optional — applied to all photos selected below)
          </label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Photos * (select multiple at once)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full text-sm"
          />
          {files.length > 0 && (
            <p className="text-[12px] text-teal-800/60 mt-1">
              {files.length} photo{files.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {progress && (
          <div>
            <div className="h-1.5 bg-bone rounded-full overflow-hidden">
              <div
                className="h-full bg-maroon transition-all"
                style={{ width: `${(progress.done / progress.total) * 100}%` }}
              />
            </div>
            <p className="text-[12px] text-teal-800/60 mt-1">
              Uploading {progress.done} of {progress.total}…
            </p>
          </div>
        )}

        {error && <p className="text-[13px] text-maroon">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-maroon text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] disabled:opacity-60"
        >
          {saving
            ? "Uploading…"
            : files.length > 1
            ? `Add ${files.length} photos`
            : "Add photo"}
        </button>
      </form>

      <h2 className="font-serif text-lg font-medium text-teal-950 mb-4">All photos</h2>
      {!photos && <p className="text-sm text-teal-800/60">Loading…</p>}
      {photos?.length === 0 && <p className="text-sm text-teal-800/60">No photos yet.</p>}

      {grouped &&
        Array.from(grouped.entries()).map(([cat, items]) => (
          <div key={cat} className="mb-8">
            <h3 className="font-serif text-base font-medium text-teal-950 mb-3">{cat}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {items.map((photo) => (
                <div key={photo.id} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || cat}
                    className="w-full aspect-square object-cover rounded-md border border-teal-900/10"
                  />
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="absolute top-1 right-1 bg-maroon text-cream text-[11px] font-semibold w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete photo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
