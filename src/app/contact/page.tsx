"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", contact: "", email: "", message: "" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50">
      {/* subtle page background (very light glows) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10
        bg-[radial-gradient(60rem_40rem_at_120%_-10%,rgba(59,130,246,0.10),transparent_60%),
            radial-gradient(40rem_28rem_at_-10%_110%,rgba(139,92,246,0.10),transparent_60%)]"
      />

      <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-6 md:px-8 md:py-8">
            <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-800">
              Contact Us
            </h1>

            {success && (
              <p className="mt-4 text-center text-sm font-medium text-emerald-600">
                ✅ Your message has been sent successfully!
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800
                  placeholder:text-slate-400 shadow-xs focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />

              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800
                  placeholder:text-slate-400 shadow-xs focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800
                  placeholder:text-slate-400 shadow-xs focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="min-h-[140px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800
                  placeholder:text-slate-400 shadow-xs focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white
                  transition hover:bg-sky-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* small footer note (optional) */}
        <p className="mt-6 text-center text-xs text-slate-500">
          We typically respond within 24–48 hours.
        </p>
      </div>
    </div>
  );
}
