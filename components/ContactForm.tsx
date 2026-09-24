'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { MessageSquare, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'Konsultasi Botani Umum',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Silakan masukkan nama lengkap Anda.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Silakan masukkan alamat email Anda.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Silakan masukkan format email yang valid.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Silakan masukkan nomor telepon / WhatsApp Anda.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Silakan masukkan nomor telepon yang valid.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Silakan tuliskan pesan atau kebutuhan ruang Anda.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Generate sanitized WhatsApp message
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedName = formData.name.trim();
    const sanitizedEmail = formData.email.trim();
    const sanitizedPhone = formData.phone.trim();
    const sanitizedSubject = formData.subject.trim();
    const sanitizedMsg = formData.message.trim();

    const formattedText = `*Konsultasi Website NOVIO*\n\n` +
      `*Nama:* ${sanitizedName}\n` +
      `*Email:* ${sanitizedEmail}\n` +
      `*Telepon/WA:* ${sanitizedPhone}\n` +
      `*Topik:* ${sanitizedSubject}\n\n` +
      `*Pesan Kebutuhan:*\n${sanitizedMsg}\n\n` +
      `_Dikirim via Formulir Web NOVIO_`;

    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappTarget}?text=${encodedText}`;

    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Fallback to mailto
  const handleEmailSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Konsultasi NOVIO: ${formData.subject} - ${formData.name}`);
    const body = encodeURIComponent(
      `Nama Lengkap: ${formData.name}\nEmail: ${formData.email}\nTelepon/WA: ${formData.phone}\nTopik: ${formData.subject}\n\nPesan:\n${formData.message}`
    );
    window.location.href = `mailto:${siteConfig.generalEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-softwhite rounded-xl p-8 sm:p-10 border border-sage/40 shadow-sm">
      <div className="mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-2">
          Kirimkan Pesan Konsultasi
        </h3>
        <p className="text-sm text-charcoal/70 leading-relaxed">
          Sampaikan kebutuhan botani atau desain lanskap Anda di bawah ini. Tim kurator kami di Bandung Barat atau Bali akan merespons melalui WhatsApp atau email.
        </p>
      </div>

      {isSubmitted && (
        <div className="mb-6 p-4 rounded-lg bg-garden/10 border border-garden/30 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-garden shrink-0 mt-0.5" />
          <div className="text-sm text-charcoal">
            <p className="font-semibold text-garden mb-1">Sesi WhatsApp Dibuka</p>
            <p>
              Pesan konsultasi Anda telah disiapkan dan dialihkan ke WhatsApp. Jika aplikasi tidak terbuka secara otomatis, Anda juga dapat mengirimkannya via email.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleWhatsAppSubmit} className="space-y-6" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2"
          >
            Nama Lengkap <span className="text-earth">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Contoh: Maya Indrawati"
            className={`w-full px-4 py-3 rounded-md bg-cream/30 border text-sm text-charcoal placeholder-charcoal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite ${
              errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-sage/40'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Alamat Email <span className="text-earth">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className={`w-full px-4 py-3 rounded-md bg-cream/30 border text-sm text-charcoal placeholder-charcoal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite ${
                errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-sage/40'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2"
            >
              Nomor WhatsApp / Telepon <span className="text-earth">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0813xxxxxxxx"
              className={`w-full px-4 py-3 rounded-md bg-cream/30 border text-sm text-charcoal placeholder-charcoal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite ${
                errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-sage/40'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Topic / Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2"
          >
            Topik Kebutuhan
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-cream/30 border border-sage/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite transition-colors"
          >
            <option value="Konsultasi Botani Umum">Konsultasi Botani Umum</option>
            <option value="Koleksi Aroid & Daun Langka">Koleksi Aroid &amp; Daun Langka</option>
            <option value="Pohon Arsitektural & Dinding Hidup">Pohon Arsitektural &amp; Dinding Hidup</option>
            <option value="Pot Artisan Tembikar Terakota">Pot Artisan Tembikar Terakota</option>
            <option value="Konsultasi Lanskap Komersial & Kantor">Konsultasi Lanskap Komersial &amp; Kantor</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2"
          >
            Pesan Kebutuhan <span className="text-earth">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Ceritakan tentang karakteristik ruang Anda, spesimen yang diminati, atau visi tata hijau yang diinginkan..."
            className={`w-full px-4 py-3 rounded-md bg-cream/30 border text-sm text-charcoal placeholder-charcoal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite resize-y ${
              errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-sage/40'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Form Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-garden hover:bg-garden-light text-softwhite font-medium text-sm tracking-wider uppercase transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-garden"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim ke WhatsApp NOVIO</span>
          </button>

          <button
            type="button"
            onClick={handleEmailSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-cream hover:bg-cream-dark text-charcoal font-medium text-sm tracking-wider uppercase border border-sage/40 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
          >
            <Mail className="w-4 h-4 text-garden" />
            <span>Kirim via Email</span>
          </button>
        </div>

        <p className="text-[11px] text-charcoal-muted text-center pt-2">
          Privasi data Anda terjaga dengan aman dan hanya digunakan oleh tim kurator <span translate="no" className="notranslate font-semibold">NOVIO</span> untuk merespons konsultasi Anda.
        </p>
      </form>
    </div>
  );
}
