'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AddPropertyPage() {
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
        <Breadcrumbs items={[{ label: 'Adaugă proprietate' }]} />
      </section>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Adaugă proprietatea ta</h1>
        <p className="text-lg text-text-muted">
          Completează formularul de mai jos și proprietatea ta va fi revizuită și publicată
        </p>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          {/* Owner Info */}
          <fieldset className="mb-8 pb-8 border-b border-light-gray">
            <legend className="text-xl font-bold text-charcoal mb-4">Informații proprietar</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Nume *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Telefon *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
            </div>
          </fieldset>

          {/* Property Info */}
          <fieldset className="mb-8 pb-8 border-b border-light-gray">
            <legend className="text-xl font-bold text-charcoal mb-4">Informații proprietate</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Tip proprietate *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                >
                  <option value="">Selectează tip</option>
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
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                >
                  <option value="">Selectează localitate</option>
                  <option value="Strășeni">Strășeni</option>
                  <option value="Cojușna">Cojușna</option>
                  <option value="Sireți">Sireți</option>
                  <option value="Vatra">Vatra</option>
                  <option value="Lozova">Lozova</option>
                  <option value="Căpriana">Căpriana</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Adresă *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Preț (EUR) *
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Suprafață (m²) *
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Camere</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Teren (m²)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
            </div>
          </fieldset>

          {/* Description */}
          <fieldset className="mb-8 pb-8 border-b border-light-gray">
            <legend className="text-xl font-bold text-charcoal mb-4">Descriere</legend>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Descriere detaliate *
              </label>
              <textarea
                rows={6}
                required
                className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                placeholder="Descrie proprietatea: stare, facilități, utilități, etc."
              />
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="mb-8 pb-8 border-b border-light-gray">
            <legend className="text-xl font-bold text-charcoal mb-4">Imagini</legend>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Încarcă imagini (jpg, png)
              </label>
              <div className="border-2 border-dashed border-light-gray rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="images"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <p className="text-text-muted mb-2">Click pentru a selecta imagini</p>
                  <p className="text-sm text-text-muted">sau trage și plasează</p>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Contact Preference */}
          <fieldset className="mb-8 pb-8 border-b border-light-gray">
            <legend className="text-xl font-bold text-charcoal mb-4">
              Preferință de contact
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="contact" value="phone" defaultChecked />
                <span className="text-charcoal">Telefon</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="contact" value="email" />
                <span className="text-charcoal">Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="contact" value="whatsapp" />
                <span className="text-charcoal">WhatsApp</span>
              </label>
            </div>
          </fieldset>

          {/* Consent */}
          <div className="mb-8">
            <label className="flex items-start gap-2 text-sm text-text-muted">
              <input type="checkbox" required className="rounded mt-1" />
              <span>
                Sunt de acord ca proprietatea mea să fie publicată pe Imobiliare Strășeni și
                înțeleg că va fi revizuită înainte de publicare.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light transition-colors font-medium"
          >
            Trimite formularul
          </button>

          {submitted && (
            <div className="mt-4 p-4 bg-success text-white rounded-lg text-sm text-center">
              Mulțumim! Proprietatea va fi revizuită și publicată în curând.
            </div>
          )}
        </form>
      </section>

      {/* Info */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-light-gray p-6 rounded-lg">
          <h3 className="font-bold text-charcoal mb-4">Ce se întâmplă după?</h3>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-start gap-3">
              <span className="text-forest-green font-bold flex-shrink-0">1</span>
              <span>
                Formularul tău este trimis pentru revizuire. Verific dacă informațiile sunt complete și
                corecte.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest-green font-bold flex-shrink-0">2</span>
              <span>
                Te pot contacta pentru a completa informații suplimentare sau pentru fotografii mai bune.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest-green font-bold flex-shrink-0">3</span>
              <span>
                Proprietatea este publicată pe site și promovată pe canalele noastre digitale.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forest-green font-bold flex-shrink-0">4</span>
              <span>
                Te contactez cu interesații și coordonez vizitele.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
