'use client';

import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PropertyCard from '@/components/PropertyCard';
import { mockLocalities, mockProperties } from '@/lib/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function LocalityPage({ params }: Props) {
  const { slug } = (params as any);
  const locality = mockLocalities.find((l) => l.slug === slug);

  if (!locality) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-charcoal mb-4">Localitate nu găsită</h1>
        <Link href="/localitati" className="text-forest-green font-medium hover:text-forest-green-light">
          Înapoi la localități →
        </Link>
      </div>
    );
  }

  const localityProperties = mockProperties.filter((p) => p.locality === locality.name);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Localități', href: '/localitati' },
            { label: locality.name },
          ]}
        />
      </section>

      {/* Hero with Image */}
      <section className="relative min-h-96 flex items-end bg-charcoal overflow-hidden">
        <img
          src={locality.image}
          alt={locality.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Imobiliare în {locality.name}
          </h1>
          <p className="text-lg text-green-100">
            {locality.listingsCount} proprietăți disponibile
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Despre {locality.name}</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              {locality.description}
            </p>

            {locality.distance && (
              <div className="bg-light-gray p-4 rounded-lg mb-6">
                <p className="text-text-muted text-sm mb-1">Distanța de Chișinău</p>
                <p className="text-lg font-bold text-charcoal">{locality.distance}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-charcoal mb-6">Informații la o privire</h3>
            <div className="space-y-6">
              {locality.advantages && (
                <div>
                  <h4 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                    <span className="text-success">✓</span> Avantaje
                  </h4>
                  <ul className="space-y-2">
                    {locality.advantages.map((adv, idx) => (
                      <li key={idx} className="text-text-muted flex items-start gap-2">
                        <span className="text-forest-green mt-1">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {locality.disadvantages && (
                <div>
                  <h4 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                    <span className="text-text-muted">−</span> Considerații
                  </h4>
                  <ul className="space-y-2">
                    {locality.disadvantages.map((dis, idx) => (
                      <li key={idx} className="text-text-muted flex items-start gap-2">
                        <span className="text-text-muted mt-1">•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Indicative Prices */}
      {locality.indicativePrices && (
        <section className="bg-light-gray py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal mb-8">Prețuri orientative pe piață</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locality.indicativePrices.houses && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-text-muted text-sm mb-2">Case</p>
                  <p className="text-2xl font-bold text-forest-green">
                    {locality.indicativePrices.houses}
                  </p>
                </div>
              )}
              {locality.indicativePrices.apartments && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-text-muted text-sm mb-2">Apartamente</p>
                  <p className="text-2xl font-bold text-forest-green">
                    {locality.indicativePrices.apartments}
                  </p>
                </div>
              )}
              {locality.indicativePrices.land && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-text-muted text-sm mb-2">Teren</p>
                  <p className="text-2xl font-bold text-forest-green">
                    {locality.indicativePrices.land}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Available Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-charcoal mb-8">
          Proprietăți disponibile în {locality.name}
        </h2>

        {localityProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localityProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-muted text-lg mb-4">
              Nu sunt proprietăți listate în acest moment în {locality.name}.
            </p>
            <Link
              href="/adauga-proprietate"
              className="text-forest-green font-medium hover:text-forest-green-light"
            >
              Dorești să adaugi o proprietate? →
            </Link>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="bg-light-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">
            Întrebări frecvente
          </h2>

          <div className="space-y-6">
            {[
              {
                q: `Ce transportul public este în ${locality.name}?`,
                a: 'Transportul public în zonă este organizat prin autobuze care leagă cu Chișinău și alte localități din raion.',
              },
              {
                q: 'Care sunt școlile și grădinițele din apropiere?',
                a: 'În localitate și în apropierea acesteia funcționează mai multe instituții de învățământ, inclusiv grădinițe și școli primare.',
              },
              {
                q: 'Cum este infrastructura medicală?',
                a: 'Pentru servicii medicale de specialitate, oamenii se deplasează la Chișinău. Local sunt disponibile medicii de familie și farmacie.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-charcoal mb-4">
          Interesată de o proprietate în {locality.name}?
        </h2>
        <p className="text-text-muted text-lg mb-8">
          Contactează-ne pentru mai multe detalii și pentru a planifica o vizită.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-forest-green-light transition-colors font-medium"
        >
          Contactează-ne
        </Link>
      </section>
    </>
  );
}
