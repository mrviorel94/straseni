import Link from 'next/link';

export const metadata = {
  title: '404 - Pagina nu a fost găsită',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white to-light-gray px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-charcoal mb-4">404</h1>
        <h2 className="text-3xl font-bold text-charcoal mb-4">Pagina nu a fost găsită</h2>
        <p className="text-text-muted text-lg mb-8">
          Pagina pe care o cauți nu există sau a fost mutată. Verifică URL-ul și încearcă din nou.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-forest-green-light transition-all transform hover:scale-105 font-medium"
          >
            Înapoi acasă
          </Link>
          <Link
            href="/proprietati"
            className="inline-block bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg hover:bg-light-gray transition-all transform hover:scale-105 font-medium"
          >
            Vezi proprietăți
          </Link>
        </div>

        <div className="mt-12 text-sm text-text-muted">
          <p className="mb-4">Pagini populare:</p>
          <ul className="space-y-2">
            <li><Link href="/proprietati" className="text-forest-green hover:text-forest-green-light">Proprietăți</Link></li>
            <li><Link href="/localitati" className="text-forest-green hover:text-forest-green-light">Localități</Link></li>
            <li><Link href="/blog" className="text-forest-green hover:text-forest-green-light">Blog</Link></li>
            <li><Link href="/contact" className="text-forest-green hover:text-forest-green-light">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
