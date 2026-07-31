'use client';

import { useState } from 'react';

export default function ValuationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locality: '',
    propertyType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', locality: '', propertyType: '', message: '' });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300 animate-scale-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Nume *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
            placeholder="Numele tău"
          />
        </div>

        {/* Phone */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Telefon *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
            placeholder="+373 69 xxx xxx"
          />
        </div>

        {/* Locality */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Localitate *
          </label>
          <select
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          >
            <option value="">Alege localitate</option>
            <option value="Strășeni">Strășeni</option>
            <option value="Cojușna">Cojușna</option>
            <option value="Sireți">Sireți</option>
            <option value="Vatra">Vatra</option>
            <option value="Lozova">Lozova</option>
            <option value="Căpriana">Căpriana</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Tip proprietate *
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          >
            <option value="">Alege tip</option>
            <option value="casa">Casă</option>
            <option value="apartament">Apartament</option>
            <option value="teren">Teren</option>
            <option value="comercial">Spațiu comercial</option>
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2 group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Mesaj (opțional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300 resize-none"
            placeholder="Adaugă detalii despre proprietate..."
          />
        </div>

        {/* Consent */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm text-text-muted hover:text-charcoal transition-colors duration-300 cursor-pointer">
            <input type="checkbox" required className="rounded w-4 h-4 cursor-pointer" />
            Sunt de acord ca datele mele să fie folosite pentru a primi o evaluare
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light transition-all duration-300 font-medium transform hover:scale-105 active:scale-95"
        >
          Solicită evaluarea
        </button>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 p-4 bg-success text-white rounded-lg text-sm animate-slide-up">
          ✓ Mulțumim! Voi reveni la tine curând cu evaluarea.
        </div>
      )}
    </form>
  );
}
