import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockServices } from '@/lib/mockData';
import Link from 'next/link';

export const metadata = {
  title: 'Servicii - Imobiliare Strășeni',
  description: 'Servicii imobiliare profesionale: consultanță, evaluare, promovare, fotografii și video pentru proprietatea ta.',
};

export default function ServiciiPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Servicii' }]} />
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4">
          Servicii imobiliare profesionale
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Ajutăm cumpărători și vânzători cu consultanță de specialitate și promovare modernă
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mockServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Detailed Services */}
      <section className="bg-light-gray py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">
            Cum funcționează serviciile noastre
          </h2>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="bg-forest-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-charcoal mb-2">Consultație inițială</h3>
                  <p className="text-text-muted">
                    Te contactez și discutez despre nevoile și obiectivele tale. Dacă vrei să vânzi,
                    analizez proprietatea. Dacă cauți să cumperi, te ajut să găsești opțiunile potrivite.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="bg-forest-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-charcoal mb-2">Evaluare și planificare</h3>
                  <p className="text-text-muted">
                    Evaluez proprietatea, analizez piața locală și propun o strategie personalizată.
                    Pentru vânzare, stabilim prețul optim. Pentru cumpărare, identificăm opțiuni bune.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="bg-forest-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg text-charcoal mb-2">
                    Promovare și prezentare
                  </h3>
                  <p className="text-text-muted">
                    Pentru vânzare: realizez fotografii profesionale, redactez anunțuri persuasive și
                    promovez pe mai multe platforme. Pentru cumpărare: te prezint proprietățile potrivite.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="bg-forest-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg text-charcoal mb-2">Negociere și finalizare</h3>
                  <p className="text-text-muted">
                    Te ajut în procesul de negociere, programez vizite, răspund la întrebări și suport
                    finalizarea tranzacției.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">
          Întrebări frecvente
        </h2>

        <div className="space-y-6">
          {[
            {
              q: 'Cât costă serviciile?',
              a: 'Tarifele variază în funcție de serviciu. Contactează-mă pentru o cotație personalizată.',
            },
            {
              q: 'Cât timp durează să vând o proprietate?',
              a: 'Durata depinde de piață, prețul proprietății și strategie. De obicei, 2-6 luni.',
            },
            {
              q: 'Pot fi sigur că proprietatea va fi vândută?',
              a: 'Nu pot garanta vânzarea, dar cu promovare profesională, cresc șansele semnificativ.',
            },
            {
              q: 'Faceți și serviciile de consultanță juridică?',
              a: 'Nu. Dar pot recomanda parteneri fiabili din domeniu pentru acte și verificări legale.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-light-gray p-6 rounded-lg">
              <h3 className="font-bold text-charcoal mb-2">{faq.q}</h3>
              <p className="text-text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gata să lucrezi cu noi?</h2>
          <p className="text-lg text-green-100 mb-8">
            Contactează-mă astazi pentru o consultație inițială fără obligații.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-forest-green px-8 py-3 rounded-lg hover:bg-light-gray transition-colors font-medium"
          >
            Contactează-mă
          </Link>
        </div>
      </section>
    </>
  );
}
