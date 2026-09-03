"use client";

import { useEffect, useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";
import {
  type Announcement,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  uploadAnnouncementImage,
} from "@/lib/announcements";

const emptyForm = {
  title: "",
  tag: "",
  teaser: "",
  description: "",
  eventDate: "",
  deadlineLabel: "",
  ctaLabel: "",
  ctaHref: "",
  imageUrl: "",
  active: true,
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Sign-in failed. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto py-24 px-6">
      <h1 className="font-serif text-2xl font-medium text-teal-950 mb-6 text-center">
        Staff Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-teal-900/8 rounded-tr-[20px] rounded-bl-[20px] p-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
          required
        />
        {error && <p className="text-[13px] text-maroon">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-maroon text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function NotAuthorized() {
  return (
    <div className="max-w-sm mx-auto py-24 px-6 text-center">
      <h1 className="font-serif text-2xl font-medium text-teal-950 mb-3">Not authorized</h1>
      <p className="text-sm text-teal-800/70 mb-6">
        Your account is signed in but doesn&rsquo;t have website admin access yet.
        Ask an executive to add the &ldquo;website-admin&rdquo; tag to your account.
      </p>
      <button
        onClick={() => signOut(auth)}
        className="text-maroon underline underline-offset-2 text-sm font-medium"
      >
        Sign out
      </button>
    </div>
  );
}

function AnnouncementManager() {
  const [items, setItems] = useState<Announcement[] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    setItems(await getAllAnnouncements());
  }

  useEffect(() => {
    refresh();
  }, []);

  function startEdit(item: Announcement) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      tag: item.tag || "",
      teaser: item.teaser || "",
      description: item.description || "",
      eventDate: item.eventDate || "",
      deadlineLabel: item.deadlineLabel || "",
      ctaLabel: item.ctaLabel || "",
      ctaHref: item.ctaHref || "",
      imageUrl: item.imageUrl || "",
      active: item.active !== false,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.teaser.trim()) {
      setError("Title and banner teaser are required.");
      return;
    }
    setSaving(true);
    try {
      let imageUrl = form.imageUrl;
      if (imageFile) {
        imageUrl = await uploadAnnouncementImage(imageFile);
      }
      const payload = {
        title: form.title.trim(),
        tag: form.tag.trim() || undefined,
        teaser: form.teaser.trim(),
        description: form.description.trim() || undefined,
        eventDate: form.eventDate || undefined,
        deadlineLabel: form.deadlineLabel.trim() || undefined,
        ctaLabel: form.ctaLabel.trim() || undefined,
        ctaHref: form.ctaHref.trim() || undefined,
        imageUrl: imageUrl || undefined,
        active: form.active,
      };
      if (editingId) {
        await updateAnnouncement(editingId, payload);
      } else {
        await createAnnouncement(payload);
      }
      resetForm();
      await refresh();
    } catch {
      setError("Something went wrong saving this. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement? This can't be undone.")) return;
    await deleteAnnouncement(id);
    if (editingId === id) resetForm();
    await refresh();
  }

  async function toggleActive(item: Announcement) {
    await updateAnnouncement(item.id, { active: !(item.active !== false) });
    await refresh();
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-2xl font-medium text-teal-950">
          Manage Announcements
        </h1>
        <button
          onClick={() => signOut(auth)}
          className="text-[13px] text-teal-800/70 underline underline-offset-2"
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-teal-900/8 rounded-tr-[20px] rounded-bl-[20px] p-6 space-y-4 mb-10"
      >
        <h2 className="font-serif text-lg font-medium text-teal-950">
          {editingId ? "Edit announcement" : "New announcement"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
              placeholder="Little Healthcare Heroes Day"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">Tag</label>
            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
              placeholder="Event / Competition / Notice"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Banner teaser * (shown in the site-wide strip)
          </label>
          <input
            value={form.teaser}
            onChange={(e) => setForm({ ...form, teaser: e.target.value })}
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
            placeholder="Short one-liner for the top banner"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Description (shown in the events section card)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
              Event date (leave blank if not a single-day event)
            </label>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
              Deadline label
            </label>
            <input
              value={form.deadlineLabel}
              onChange={(e) => setForm({ ...form, deadlineLabel: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
              placeholder="RSVP by 20 September 2026"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
              Button label
            </label>
            <input
              value={form.ctaLabel}
              onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
              placeholder="RSVP — 053 050 0500"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
              Button link
            </label>
            <input
              value={form.ctaHref}
              onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
              className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm"
              placeholder="tel:0530500500 or https://wa.me/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Poster image {form.imageUrl && "(uploading a new one replaces the current)"}
          </label>
          {form.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.imageUrl} alt="" className="w-32 rounded-md border border-teal-900/10 mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-[13px] font-medium text-teal-900">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active (visible on the website)
        </label>

        {error && <p className="text-[13px] text-maroon">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-maroon text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add announcement"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-teal-800/70 underline underline-offset-2"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <h2 className="font-serif text-lg font-medium text-teal-950 mb-4">
        All announcements
      </h2>
      {!items && <p className="text-sm text-teal-800/60">Loading…</p>}
      {items?.length === 0 && (
        <p className="text-sm text-teal-800/60">No announcements yet.</p>
      )}
      <div className="space-y-3">
        {items?.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-teal-900/8 rounded-tr-[14px] rounded-bl-[14px] p-4 flex justify-between items-center gap-4"
          >
            <div className="min-w-0">
              <p className="font-serif font-medium text-teal-950 truncate">
                {item.title}{" "}
                {item.active === false && (
                  <span className="text-[11px] font-sans font-semibold text-maroon uppercase ml-1">
                    Hidden
                  </span>
                )}
              </p>
              <p className="text-[13px] text-teal-800/60 truncate">{item.teaser}</p>
            </div>
            <div className="flex gap-3 shrink-0 text-[13px] font-medium">
              <button onClick={() => toggleActive(item)} className="text-teal-800/70 underline underline-offset-2">
                {item.active === false ? "Show" : "Hide"}
              </button>
              <button onClick={() => startEdit(item)} className="text-teal-900 underline underline-offset-2">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-maroon underline underline-offset-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { loading, user, isAdmin } = useAdminAuth();

  if (loading) {
    return <div className="py-24 text-center text-sm text-teal-800/60">Loading…</div>;
  }
  if (!user) return <LoginForm />;
  if (!isAdmin) return <NotAuthorized />;
  return <AnnouncementManager />;
}
