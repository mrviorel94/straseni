'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import LocalityCard from '@/components/LocalityCard';
import ArticleCard from '@/components/ArticleCard';
import ServiceCard from '@/components/ServiceCard';
import ValuationForm from '@/components/ValuationForm';
import { mockProperties, mockLocalities, mockArticles, mockServices } from '@/lib/mockData';

export default function Home() {
  const featuredProperties = mockProperties.filter((p) => p.featured).slice(0, 6);
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
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Proprietăți promovate
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Selecție de proprietăți verificate și recomandate din Strășeni și împrejurimi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProperties.map((property, index) => (
            <div key={property.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

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
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Localități din raionul Strășeni
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Descoperă comunități frumoase lângă Chișinău
            </p>
          </div>

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
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Cum te pot ajuta
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Ofer consultanță profesională pentru cumpărători și vânzători
          </p>
        </div>

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
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Articole recente
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Sfaturi și informații despre piața imobiliară din Strășeni
          </p>
        </div>

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
        <div className="bg-white border-2 border-light-gray rounded-lg p-8 text-center animate-slide-up hover:border-forest-green transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
            Primește noutăți despre piața imobiliară
          </h2>
          <p className="text-text-muted mb-8">
            Abonează-te la newsletter-ul nostru pentru articole, sfaturi și noi listinguri
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-1 px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green transition-all duration-300 hover:border-forest-green"
              required
            />
            <button
              type="submit"
              className="bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-forest-green-light transition-all duration-300 font-medium whitespace-nowrap transform hover:scale-105"
            >
              Abonează-te
            </button>
          </form>
        </div>
      </section>

    </>
  );
}
