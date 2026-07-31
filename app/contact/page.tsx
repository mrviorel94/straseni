'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
      </section>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Contact</h1>
        <p className="text-lg text-text-muted">
          Contactează-mă cu întrebări sau pentru a programa o consultație
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-6">Informații de contact</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-charcoal mb-2">Telefon</h3>
                <a
                  href="tel:+373691234567"
                  className="text-forest-green hover:text-forest-green-light transition-colors text-lg"
                >
                  +373 69 123 456
                </a>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">Email</h3>
                <a
                  href="mailto:hello@imobiliare-straseni.md"
                  className="text-forest-green hover:text-forest-green-light transition-colors text-lg"
                >
                  hello@imobiliare-straseni.md
                </a>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-2">Adresă</h3>
                <p className="text-text-muted">
                  Strada Principale nr. 15<br />
                  Strășeni, Raionul Strășeni<br />
                  Moldova
                </p>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-3">Orar de funcționare</h3>
                <div className="space-y-1 text-text-muted">
                  <p>Luni-Vineri: 09:00 - 18:00</p>
                  <p>Sâmbătă: 10:00 - 16:00</p>
                  <p>Duminică: Închis</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-charcoal mb-3">Rețele sociale</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-text-muted hover:text-forest-green transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-text-muted hover:text-forest-green transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-text-muted hover:text-forest-green transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-6">Trimite-mi un mesaj</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Nume *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="Numele tău"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="+373 69 xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Subiect
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="Cum te pot ajuta?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Mesaj *
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="Mesajul tău..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-text-muted">
                  <input type="checkbox" required className="rounded" />
                  Sunt de acord cu politica de confidențialitate
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light transition-colors font-medium"
              >
                Trimite mesajul
              </button>

              {submitted && (
                <div className="p-4 bg-success text-white rounded-lg text-sm text-center">
                  Mulțumim! Voi reveni la tine curând.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">Locație</h2>
          <div className="w-full h-96 bg-gray rounded-lg flex items-center justify-center">
            <p className="text-text-muted">
              Hartă - Integrare Google Maps în producție
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
