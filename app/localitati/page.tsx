import Link from 'next/link';
import LocalityCard from '@/components/LocalityCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockLocalities } from '@/lib/mockData';

export const metadata = {
  title: 'Localități - Imobiliare Strășeni',
  description: 'Descoperă localități din raionul Strășeni și proprietăți disponibile în fiecare comunitate.',
};

export default function LocalitatiPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Localități' }]} />
          <h1 className="text-4xl font-bold text-charcoal mb-4">Localități din Strășeni și raion</h1>
          <p className="text-text-muted text-lg">
            Explorează comunități frumoase și liniștite lângă Chișinău
          </p>
        </div>
      </section>

      {/* Localities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLocalities.map((locality) => (
            <LocalityCard key={locality.slug} locality={locality} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Cauți proprietate în alt loc?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Contactează-ne pentru a afla mai mult despre proprietățile din alte localități.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-forest-green px-8 py-3 rounded-lg hover:bg-light-gray transition-colors font-medium"
          >
            Contactează-ne
          </Link>
        </div>
      </section>
    </>
  );
}
