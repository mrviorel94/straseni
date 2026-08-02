import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Despre Viorel - Imobiliare Strășeni',
  description: 'Viorel - consultant imobiliar local pentru Strășeni și raion. Transparență, profesionalism și cunoaștere locală.',
};

export default function DespPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Despre' }]} />
      </section>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4">
          Sunt Viorel - Consultant Imobiliar
        </h1>
        <p className="text-lg text-text-muted">
          Te ajut să vinzi, să cumperi sau să promovezi o proprietate în Strășeni și raion
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-6">Cine sunt</h2>
        <div className="prose prose-lg max-w-none text-text-muted space-y-4">
          <p>
            Sunt Viorel, consultant imobiliar din Strășeni. Am crescut aici și cunosc bine fiecare colț
            al localității și al raionului.
          </p>
          <p>
            Știu că piața imobiliară poate fi confuză și periculoasă. Unii agenți nu sunt sinceri,
            prețurile nu sunt clare, iar informațiile nu sunt verificate. M-am decis să lucrez diferit.
          </p>
          <p>
            Ofer consultanță simplă, clară și utilă pentru cumpărători și vânzători. Fiecare proprietate
            este verificată, fiecare preț este justificat, și fiecare sfat este sincer. Muncesc cu oameni,
            nu cu cifre.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Misiunea mea</h3>
              <p className="text-text-muted text-lg leading-relaxed">
                Fac piața imobiliară din Strășeni mai transparentă, accesibilă și de încredere
                pentru toți - cumpărători, vânzători și oameni care vor doar informații corecte.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Valorile mele</h3>
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-forest-green text-xl">✓</span>
                  <span className="text-lg">
                    <strong>Transparență</strong> - Informații clare și fără ascunzișuri
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-green text-xl">✓</span>
                  <span className="text-lg">
                    <strong>Integritate</strong> - Relații oneste și durabile
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-green text-xl">✓</span>
                  <span className="text-lg">
                    <strong>Profesionalism</strong> - Servicii de calitate din start
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-green text-xl">✓</span>
                  <span className="text-lg">
                    <strong>Cunoaștere locală</strong> - Specialiști în Strășeni și raion
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-light-gray p-8 rounded-lg text-center">
          <div className="w-32 h-32 bg-forest-green rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-5xl font-bold">V</span>
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-2">Viorel</h2>
          <p className="text-forest-green font-medium mb-4">Consultant Imobiliar Local</p>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-6">
            Specialist în proprietăți din Strășeni și raion. Cunosc piața, cunosc oamenii, și
            cunosc cum să reunesc proprietăți cu oamenii potriviți.
          </p>
          <div className="space-y-3 text-text-muted">
            <p><strong>Telefon:</strong> Disponibil pe cerere</p>
            <p><strong>Email:</strong> Disponibil pe cerere</p>
            <p><strong>Disponibilitate:</strong> Luni - Sâmbătă, 09:00 - 18:00</p>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">
          De ce să lucrez cu mine?
        </h2>

        <div className="space-y-6">
          {[
            {
              title: 'Cunoaștere aprofundată',
              description:
                'Cunoaștemos piața din Strășeni ca pe spatele mâinii. Știm valorile reale, tendințele și oportunități.',
            },
            {
              title: 'Proprietăți verificate',
              description:
                'Fiecare proprietate pe platformă este verificată. Nu publicăm anunțuri dubioase sau prețuri nerealiste.',
            },
            {
              title: 'Transparență 100%',
              description:
                'Informații clare, prețuri justificate, și niciun ascunzișl. Ce vezi este ceea ce obții.',
            },
            {
              title: 'Servicii complete',
              description:
                'De la consultanță și evaluare, la fotografii profesionale și negociere. Suntem cu tine în tot procesul.',
            },
            {
              title: 'Comunicare rapidă',
              description:
                'Răspunsuri rapide, disponibilitate ridicată, și vorbim limba ta. Fără formalism innecesar.',
            },
            {
              title: 'Prețuri rezonabile',
              description:
                'Serviciile noastre sunt accesibile. Nu facem prețuri pe care doar bogații și-le permit.',
            },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-light-gray">
              <h3 className="font-bold text-lg text-charcoal mb-2">{item.title}</h3>
              <p className="text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gata să muncim împreună?</h2>
          <p className="text-lg text-green-100 mb-8">
            Sunt aici pentru cumpărători și vânzători care doresc transparență, profesionalism și contact direct.
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
