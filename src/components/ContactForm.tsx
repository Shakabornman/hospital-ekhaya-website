"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      await addDoc(collection(db, "website_contactMessages"), {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "unread",
        createdAt: serverTimestamp(),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white rounded-tr-[24px] rounded-bl-[24px] p-8 border border-teal-900/8 text-center">
        <h3 className="font-serif text-xl font-medium text-teal-950 mb-2">
          Message sent
        </h3>
        <p className="text-[14.5px] text-teal-800/70">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-tr-[24px] rounded-bl-[24px] p-8 border border-teal-900/8 space-y-4"
    >
      <h3 className="font-serif text-xl font-medium text-teal-950 mb-2">
        Send us a message
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm text-teal-950 placeholder:text-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-900/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[13px] font-medium text-teal-900 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm text-teal-950 placeholder:text-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-900/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-[13px] font-medium text-teal-900 mb-1.5">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="053 000 0000"
          className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm text-teal-950 placeholder:text-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-900/30"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-[13px] font-medium text-teal-900 mb-1.5">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm text-teal-950 placeholder:text-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-900/30"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[13px] font-medium text-teal-900 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          className="w-full rounded-md border border-teal-900/15 px-3.5 py-2.5 text-sm text-teal-950 placeholder:text-teal-800/40 focus:outline-none focus:ring-2 focus:ring-teal-900/30"
        />
      </div>

      {error && <p className="text-[13px] text-maroon">{error}</p>}
      {status === "error" && !error && (
        <p className="text-[13px] text-maroon">
          Something went wrong sending your message. Please try again, or
          call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-maroon text-cream font-semibold text-sm px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
