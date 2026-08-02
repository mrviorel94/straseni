import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Politica de confidențialitate - Imobiliare Strășeni',
  description: 'Politica de confidențialitate și protecția datelor personale pe site-ul Imobiliare Strășeni.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'Politica de confidențialitate' }]} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-charcoal mb-8">Politica de confidențialitate</h1>

        <div className="prose prose-lg max-w-none text-text-muted space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">1. Introducere</h2>
            <p>
              Imobiliare Strășeni (denumit mai jos "noi", "ne" sau "site-ul") se angajează să protejeze
              confidențialitatea datelor tale personale. Această politică explică cum colectez, folosesc și protejez informațiile tale.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">2. Datele pe care le colectez</h2>
            <p className="mb-4">Colectez următoarele tipuri de date:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Informații de contact:</strong> nume, email, telefon</li>
              <li><strong>Informații despre proprietate:</strong> descrieri, imagini, locație</li>
              <li><strong>Informații de navigație:</strong> adresa IP, tipul browser-ului, paginile vizitate</li>
              <li><strong>Cookies:</strong> pentru îmbunătățirea experienței utilizatorului</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">3. Cum utilizez datele</h2>
            <p className="mb-4">Utilizez datele colectate pentru:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>A-ți permite să contactezi consultanții</li>
              <li>A trimite informații despre proprietăți și oferte</li>
              <li>A îmbunătăți site-ul și serviciile</li>
              <li>A comply cu legislația aplicabilă</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">4. Protecția datelor</h2>
            <p>
              Utilizez măsuri de securitate adecuate pentru a proteja datele personale, inclusiv criptarea SSL și
              control de acces restrictiv. Cu toate acestea, nicio metodă de transmisie pe internet nu este 100% sigură.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">5. Drepturile tale</h2>
            <p className="mb-4">Ai dreptul să:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Accesezi datele personale pe care le dețin despre tine</li>
              <li>Corectezi sau ștergi datele inexacte</li>
              <li>Ceri restricția prelucrării datelor</li>
              <li>Obții o copie portabilă a datelor tale</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">6. Contact</h2>
            <p>
              Dacă ai întrebări despre această politică, te rog contactează-ne la{' '}
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
