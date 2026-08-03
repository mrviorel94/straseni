'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Numele este obligatoriu');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Email invalid');
      return;
    }
    if (!formData.message.trim()) {
      setError('Mesajul este obligatoriu');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Eroare la trimitere');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('O eroare a apărut. Te rog încearcă din nou.');
    } finally {
      setLoading(false);
    }
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
                <p className="text-text-muted text-sm">
                  Disponibile pe cerere. Contactează-mă prin telefon sau email.
                </p>
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 form-input-animated"
                  placeholder="Numele tău"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 form-input-animated"
                  placeholder="email@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 form-input-animated"
                  placeholder="+373 69 xxx xxx"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Subiect
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 form-input-animated"
                  placeholder="Cum te pot ajuta?"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Mesaj *
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 form-input-animated"
                  placeholder="Mesajul tău..."
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-pop-in">
                  ⚠️ {error}
                </div>
              )}

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center animate-pop-in">
                  ✓ Mulțumim! Mesajul tău a fost trimis. Voi reveni la tine curând.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light active:scale-95 transition-all font-medium disabled:opacity-50 btn-interactive flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Se trimite...
                  </>
                ) : (
                  '✓ Trimite mesajul'
                )}
              </button>
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
