import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Despre noi - Imobiliare Strășeni',
  description: 'Povestea și valorile Imobiliare Strășeni - ghidul imobiliar local pentru Strășeni și raion.',
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
          Despre Imobiliare Strășeni
        </h1>
        <p className="text-lg text-text-muted">
          Un ghid imobiliar local, fiabil și profesional pentru Strășeni și raion
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-6">Povestea noastră</h2>
        <div className="prose prose-lg max-w-none text-text-muted space-y-4">
          <p>
            Imobiliare Strășeni s-a născut din necesitatea unui ghid local, transparent și
            profesional pentru piața imobiliară din Strășeni și raion.
          </p>
          <p>
            Stiu că piața imobiliară poate fi confuză și pericol. Unii agenți nu sunt sinceri,
            preturile nu sunt clare, iar informatiile nu sunt verificate. M-am decis sa creez o
            platforma care schimba asta.
          </p>
          <p>
            Imobiliare Strășeni este o platformă simplă, clară și utila pentru cumpărători și
            vânzători. Fiecare proprietate este verificată, fiecare preț este justificat, și
            fiecare sfat este sincer.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Misiunea noastră</h3>
              <p className="text-text-muted text-lg leading-relaxed">
                Sa facem piața imobiliară din Strășeni mai transparentă, accesibilă și de încredere
                pentru toți - cumpărători, vânzători și profesionisti.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Valorile noastre</h3>
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

      {/* Team */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">Echipa noastră</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-light-gray p-6 rounded-lg text-center">
            <div className="w-20 h-20 bg-forest-green rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg text-charcoal mb-2">Andrei Moldovanu</h3>
            <p className="text-text-muted text-sm mb-2">Fondator & Consultant Imobiliar</p>
            <p className="text-text-muted text-sm">
              10+ ani experiență în piața imobiliară. Pasionat de a ajuta oamenii să găsească locuințe
              potrivite.
            </p>
          </div>

          <div className="bg-light-gray p-6 rounded-lg text-center">
            <div className="w-20 h-20 bg-beige rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg text-charcoal mb-2">Elena Popescu</h3>
            <p className="text-text-muted text-sm mb-2">Consultant Imobiliar</p>
            <p className="text-text-muted text-sm">
              Ajută cumpărători și vânzători în tot procesul. Specialistă în proprietăți din
              Strășeni.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">
          De ce să alegi Imobiliare Strășeni?
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
          <h2 className="text-3xl font-bold mb-4">Gata să lucrez cu tine</h2>
          <p className="text-lg text-green-100 mb-8">
            Deschid porțile pentru cumpărători și vânzători care doresc transparență și profesionalism.
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
