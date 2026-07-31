'use client';

import { useState } from 'react';

interface PropertyInquiryFormProps {
  propertyTitle: string;
}

export default function PropertyInquiryForm({ propertyTitle }: PropertyInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light-gray p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-charcoal mb-6">Sunt interesat de această proprietate</h3>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Nume *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
            placeholder="Numele tău"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Telefon *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
            placeholder="+373 69 xxx xxxx"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
            placeholder="email@example.com"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Mesaj (opțional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green resize-none"
            placeholder="Spune-ne ce te interesează despre această proprietate..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light transition-all duration-300 font-medium transform hover:scale-105 active:scale-95"
      >
        Solicită informații
      </button>

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm animate-slide-up">
          ✓ Mulțumim! Vei fi contactat în curând.
        </div>
      )}
    </form>
  );
}
