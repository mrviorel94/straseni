'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function VindeProprietatePage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'casa' as const,
    locality: 'Strășeni',
    address: '',
    price: '',
    area: '',
    description: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          title: '',
          type: 'casa',
          locality: 'Strășeni',
          address: '',
          price: '',
          area: '',
          description: '',
          contact_name: '',
          contact_phone: '',
          contact_email: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Eroare la trimitere');
      }
    } catch (error) {
      alert('Eroare la trimitere');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white to-light-gray">
      {/* Header */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Vinde proprietate' }]} />
          <h1 className="text-4xl font-bold text-charcoal mb-4">Vinde-ți proprietatea</h1>
          <p className="text-text-muted text-lg">
            Completează formularul și echipa noastră va reveni cu oferta
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {success && (
          <div className="mb-8 p-4 bg-green-100 border-l-4 border-forest-green rounded-lg animate-fade-in">
            <p className="text-green-800 font-medium">
              ✓ Proprietatea ta a fost adăugată. Admin va reveni în curând cu oferta.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8">Informații despre proprietate</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Proprietate Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Titlu proprietate *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="ex: Casă la țară în Strășeni"
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Tip proprietate *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                  required
                >
                  <option value="casa">Casă</option>
                  <option value="apartament">Apartament</option>
                  <option value="teren">Teren</option>
                  <option value="comercial">Spațiu comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Localitate *
                </label>
                <select
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                  required
                >
                  <option value="Strășeni">Strășeni</option>
                  <option value="Cojușna">Cojușna</option>
                  <option value="Sireți">Sireți</option>
                  <option value="Vatra">Vatra</option>
                  <option value="Lozova">Lozova</option>
                  <option value="Căpriana">Căpriana</option>
                  <option value="Altă localitate">Altă localitate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Adresă *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="ex: Str. Principală 123"
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Preț (EUR) - optional
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="ex: 50000"
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Suprafață (mp) - optional
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="ex: 100"
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Descriere - optional
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrie proprietatea ta (stare, dotări, etc.)"
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                rows={4}
              />
            </div>

            {/* Contact Info */}
            <div className="border-t border-light-gray pt-6">
              <h3 className="text-lg font-bold text-charcoal mb-4">Informații de contact</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Nume complet *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    placeholder="Ion Popescu"
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    placeholder="+373 69 000 000"
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email - optional
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    placeholder="tu@exemplu.com"
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-green text-white px-6 py-4 rounded-lg hover:bg-forest-green-light font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Se trimite...' : '✓ Trimite proprietatea'}
            </button>
          </form>

          <p className="text-center text-text-muted text-sm mt-6">
            Vei fi contactat în maxim 24 de ore
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <section className="bg-white border-t border-light-gray mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-forest-green hover:underline font-medium">
            ← Înapoi la site
          </Link>
        </div>
      </section>
    </div>
  );
}
