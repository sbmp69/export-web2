import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nProvider";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PHONE = "9099369442";
const EMAIL = "purnatpedhadiya2016@gmail.com";

export default function Contact() {
  const { t, lang } = useI18n();
  const c = t.contact;

  const waText =
    lang === "ar"
      ? "مرحباً Alux Architectural، أرغب في الاستفسار عن مجموعتكم من الأجهزة."
      : "Hi Alux Architectural, I'd like to enquire about your hardware collection.";
  const WHATSAPP_LINK = `https://wa.me/91${PHONE}?text=${encodeURIComponent(waText)}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(c.error_required);
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/inquiries`, form);
      toast.success(c.success);
      setForm({ name: "", email: "", phone: "", company: "", interest: "", message: "" });
    } catch (err) {
      toast.error(c.error_send);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-36 bg-[#0A0A0A] border-t border-white/10"
      data-testid="contact-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="overline mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#D4AF37]" /> {c.overline}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white font-light">
            {c.title_a}
            <br />
            <span className="italic">{c.title_b}</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-md leading-relaxed">{c.body}</p>

          <div className="mt-10 space-y-1 border-t border-white/10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-whatsapp-link"
              className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 border border-white/15 group-hover:border-[#25D366] flex items-center justify-center transition">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {c.whatsapp}
                  </div>
                  <div className="text-white text-base">+91 {PHONE}</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#D4AF37] transition" />
            </a>

            <a
              href={`tel:+91${PHONE}`}
              data-testid="contact-phone-link"
              className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 border border-white/15 group-hover:border-[#D4AF37] flex items-center justify-center transition">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {c.phone}
                  </div>
                  <div className="text-white text-base">+91 {PHONE}</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#D4AF37] transition" />
            </a>

            <a
              href={`mailto:${EMAIL}`}
              data-testid="contact-email-link"
              className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 border border-white/15 group-hover:border-[#D4AF37] flex items-center justify-center transition">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    {c.email}
                  </div>
                  <div className="text-white text-base break-all">{EMAIL}</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#D4AF37] transition" />
            </a>

            <div className="flex items-center gap-4 py-5">
              <div className="w-11 h-11 border border-white/15 flex items-center justify-center">
                <MapPin size={18} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {c.atelier}
                </div>
                <div className="text-white text-base">{c.location}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-white/10 overflow-hidden" data-testid="contact-map">
            <iframe
              title="Alux Architectural — Mumbai"
              src="https://www.google.com/maps?q=Mumbai,India&output=embed"
              width="100%"
              height="260"
              style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) invert(0.92) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 lg:ps-8"
          data-testid="inquiry-form"
        >
          <div className="border border-white/10 p-8 lg:p-12 bg-[#0E0E0E]">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <div className="overline mb-2">{c.form_overline}</div>
                <div className="font-display text-2xl text-white">
                  {c.form_title}
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                {c.form_id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label={c.f_name}
                required
                value={form.name}
                onChange={(v) => update("name", v)}
                testid="form-name"
              />
              <Field
                label={c.f_email}
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                testid="form-email"
              />
              <Field
                label={c.f_phone}
                value={form.phone}
                onChange={(v) => update("phone", v)}
                testid="form-phone"
              />
              <Field
                label={c.f_company}
                value={form.company}
                onChange={(v) => update("company", v)}
                testid="form-company"
              />
            </div>

            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-3">
                {c.f_interest}
              </label>
              <div className="flex flex-wrap gap-2">
                {c.interests.map((opt, i) => {
                  const active = form.interest === opt;
                  return (
                    <button
                      key={i}
                      type="button"
                      data-testid={`interest-${i}`}
                      onClick={() => update("interest", active ? "" : opt)}
                      className={`px-4 py-2 text-xs tracking-wide border transition-colors ${
                        active
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "border-white/15 text-white/70 hover:border-[#D4AF37]/60 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-3">
                {c.f_message} <span className="text-[#D4AF37]">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={c.f_placeholder}
                data-testid="form-message"
                className="w-full bg-transparent border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none p-4 text-white placeholder:text-white/30 transition-colors resize-none"
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-white/40 max-w-sm">{c.consent}</p>
              <button
                type="submit"
                disabled={loading}
                data-testid="form-submit"
                className="group inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#F3C844] disabled:opacity-50 text-black px-8 py-4 text-sm font-medium tracking-wide transition-colors"
              >
                {loading ? c.submitting : c.submit}
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, required, type = "text", value, onChange, testid }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-3">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] outline-none py-3 text-white placeholder:text-white/30 transition-colors"
      />
    </div>
  );
}
