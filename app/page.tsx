'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import LocalityCard from '@/components/LocalityCard';
import ArticleCard from '@/components/ArticleCard';
import ServiceCard from '@/components/ServiceCard';
import ValuationForm from '@/components/ValuationForm';
import ScrollReveal from '@/components/ScrollReveal';
import { mockLocalities, mockArticles, mockServices } from '@/lib/mockData';
import { Property } from '@/lib/types';

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setProperties([]);
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchProperties();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Email invalid');
      return;
    }

    setNewsletterStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Eroare la abonare');
        return;
      }

      setNewsletterStatus('success');
      setNewsletterMessage('Ți-ai abonat cu succes! Verifică email-ul pentru confirmare.');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterMessage('O eroare a apărut. Te rog încearcă din nou.');
    }
  };

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);
  const recentArticles = mockArticles.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white to-light-gray overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003d96918?w=1200&h=800&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20 animate-scale-in"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-center">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-4 leading-tight">
              Imobiliare în Strășeni,<br />
              <span className="text-forest-green animate-bounce-subtle">explicate simplu.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-8">
              Case, apartamente și terenuri din municipiul și raionul Strășeni. Informații locale, proprietăți verificate și consultanță pentru cumpărare sau vânzare.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/proprietati"
              className="inline-block bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-forest-green-light transition-all transform hover:scale-105 font-medium"
            >
              Vezi proprietățile
            </Link>
            <Link
              href="/adauga-proprietate"
              className="inline-block bg-white text-forest-green px-8 py-3 rounded-lg border-2 border-forest-green hover:bg-light-gray transition-all transform hover:scale-105 font-medium"
            >
              Vreau să vând
            </Link>
          </div>

          <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Suspense fallback={<div className="h-20 bg-white rounded animate-pulse" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Proprietăți promovate
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Selecție de proprietăți verificate și recomandate din Strășeni și împrejurimi
            </p>
          </div>
        </ScrollReveal>

        {loadingProperties ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-light-gray rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property, index) => (
                <div key={property.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center">
          <Link
            href="/proprietati"
            className="inline-block text-forest-green font-medium hover:text-forest-green-light transition-colors"
          >
            Vezi toate proprietățile →
          </Link>
        </div>
      </section>

      {/* Localities Section */}
      <section className="bg-light-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
                Localități din raionul Strășeni
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Descoperă comunități frumoase lângă Chișinău
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockLocalities.slice(0, 6).map((locality, index) => (
              <div key={locality.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <LocalityCard locality={locality} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/localitati"
              className="inline-block text-forest-green font-medium hover:text-forest-green-light transition-colors"
            >
              Explorează toate localitățile →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Cum te pot ajuta
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Ofer consultanță profesională pentru cumpărători și vânzători
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service, index) => (
            <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="bg-forest-green text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Cât valorează proprietatea ta?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Trimite-ne câteva informații și primești o evaluare orientativă pentru piața din Strășeni.
          </p>
        </div>

        <div className="animate-scale-in">
          <ValuationForm />
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Articole recente
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Sfaturi și informații despre piața imobiliară din Strășeni
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentArticles.map((article, index) => (
            <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block text-forest-green font-medium hover:text-forest-green-light transition-colors"
          >
            Citește mai multe articole →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-light-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              De ce să alegi Imobiliare Strășeni
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cunoaștere locală',
                description: 'Cunoștințe aprofundate ale pieței din Strășeni și raion',
              },
              {
                title: 'Proprietăți verificate',
                description: 'Toate listingurile sunt verificate și cu informații accurate',
              },
              {
                title: 'Informații clare',
                description: 'Prezentare transparentă a fiecărei proprietăți',
              },
              {
                title: 'Comunicare directă',
                description: 'Contact rapid și răspunsuri la toate întrebările tale',
              },
              {
                title: 'Promovare modernă',
                description: 'Utilizăm tehnologiile latest pentru a promova proprietățile',
              },
              {
                title: 'Consultanță personalizată',
                description: 'Ajutăm pe fiecare client cu nevoile lor specifice',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="bg-white border-2 border-light-gray rounded-lg p-8 text-center animate-slide-up hover:border-forest-green transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            Primește noutăți despre piața imobiliară
          </h2>
          <p className="text-text-muted mb-8">
            Abonează-te la newsletter-ul nostru pentru articole, sfaturi și noi listinguri
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Adresa ta de email"
              className="flex-1 px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green transition-all duration-300 hover:border-forest-green form-input-animated"
              required
              disabled={newsletterStatus === 'loading'}
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'loading'}
              className="bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-forest-green-light active:scale-95 transition-all duration-300 font-medium whitespace-nowrap transform hover:scale-105 disabled:opacity-50 btn-interactive flex items-center justify-center gap-2"
            >
              {newsletterStatus === 'loading' ? (
                <>
                  <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Se abonează...
                </>
              ) : (
                '✓ Abonează-te'
              )}
            </button>
          </form>

          {newsletterStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-pop-in">
              ✓ {newsletterMessage}
            </div>
          )}

          {newsletterStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-pop-in">
              ⚠️ {newsletterMessage}
            </div>
          )}
        </div>
        </ScrollReveal>
      </section>

    </>
  );
}
