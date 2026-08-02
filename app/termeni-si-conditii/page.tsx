import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Termeni și condiții - Imobiliare Strășeni',
  description: 'Termenii și condițiile de utilizare a site-ului Imobiliare Strășeni.',
};

export default function TermsPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Termeni și condiții' }]} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-charcoal mb-8">Termeni și condiții</h1>

        <div className="prose prose-lg max-w-none text-text-muted space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">1. Acceptarea termenilor</h2>
            <p>
              Prin accesarea și utilizarea site-ului Imobiliare Strășeni, ești de acord cu acești termeni și condiții.
              Dacă nu ești de acord cu vreunul din acești termeni, nu folosi site-ul.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">2. Licența de utilizare</h2>
            <p>
              Ți se acordă o licență limitată, neexclusivă și revocabilă de a accesa și utiliza site-ul pentru scopuri
              personale și necomerciale. Nu poți reproduc, distribui sau transmite conținutul fără permisiune scrisă.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">3. Răspunderea proprietăților</h2>
            <p className="mb-4">
              Informațiile despre proprietăți sunt furnizate în scopul informativ. Nu garantez acuratețea completă a
              informațiilor. Înainte de a lua o decizie, ți-aș recomanda să:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Vizitezi proprietatea în persoană</li>
              <li>Efectuezi o inspectie profesională</li>
              <li>Consulți cu specialiști legali și financiari</li>
              <li>Verifici documentele de proprietate</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">4. Disclaimer de răspundere</h2>
            <p>
              Site-ul este furnizat "așa cum este". Nu fac nici o reprezentare sau garanție, expresă sau implicită,
              privind funcționalitatea, acuratețea sau disponibilitatea site-ului. Nu voi fi responsabil pentru
              daune indirecte, incidentale sau consecvente rezultate din utilizarea site-ului.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">5. Limitarea răspunderii</h2>
            <p>
              În niciun caz răspunderea mea nu va depăși suma pe care ai plătit-o pentru serviciile furnizate,
              dacă este cazul. Unele jurisdicții nu permit excluderea anumitor răspunderi, deci este posibil ca
              această limitare să nu se aplice în totalitate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">6. Conținut trimis de utilizatori</h2>
            <p>
              Dacă trimiți conținut pe site (imagini, descrieri, etc.), ești responsabil pentru exactitatea și
              legalitatea acestuia. Prin trimitere, imi acorzi dreptul de a utiliza conținutul pentru a promova
              proprietatea și serviciile.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">7. Modificări ale termenilor</h2>
            <p>
              Îmi rezerv dreptul de a modifica acești termeni oricând. Modificările vor fi efective imediat după
              postare pe site. Continuarea utilizării site-ului după modificări constituie acceptarea noilor termeni.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">8. Contact</h2>
            <p>
              Pentru întrebări despre acești termeni, te rog contactează-ne la{' '}
              <Link href="/contact" className="text-forest-green hover:text-forest-green-light font-medium">
                pagina de contact
              </Link>.
            </p>
          </div>

          <div className="bg-light-gray p-6 rounded-lg">
            <p className="text-sm text-text-muted">
              Ultima actualizare: 02.08.2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
