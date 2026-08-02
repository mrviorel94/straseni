import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-forest-green rounded-sm flex items-center justify-center">
                <span className="font-bold text-sm">IS</span>
              </div>
              <span className="font-serif font-bold text-base">Imobiliare Strășeni</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ghidul imobiliar local pentru municipiul și raionul Strășeni. Proprietăți verificate, informații locale și consultanță directă.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Proprietăți</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/proprietati?type=casa" className="hover:text-white transition-colors">
                  Case
                </Link>
              </li>
              <li>
                <Link href="/proprietati?type=apartament" className="hover:text-white transition-colors">
                  Apartamente
                </Link>
              </li>
              <li>
                <Link href="/proprietati?type=teren" className="hover:text-white transition-colors">
                  Terenuri
                </Link>
              </li>
              <li>
                <Link href="/proprietati?type=comercial" className="hover:text-white transition-colors">
                  Spații comerciale
                </Link>
              </li>
            </ul>
          </div>

          {/* Localities */}
          <div>
            <h3 className="font-bold mb-4">Localități</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/localitati/straseni" className="hover:text-white transition-colors">
                  Strășeni
                </Link>
              </li>
              <li>
                <Link href="/localitati/cojusna" className="hover:text-white transition-colors">
                  Cojușna
                </Link>
              </li>
              <li>
                <Link href="/localitati/sireti" className="hover:text-white transition-colors">
                  Sireți
                </Link>
              </li>
              <li>
                <Link href="/localitati/lozova" className="hover:text-white transition-colors">
                  Lozova
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h3 className="font-bold mb-4">Servicii</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li>
                <Link href="/servicii" className="hover:text-white transition-colors">
                  Consultanță
                </Link>
              </li>
              <li>
                <Link href="/adauga-proprietate" className="hover:text-white transition-colors">
                  Adaugă proprietatea
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="text-xs text-gray-500 space-y-1">
              <Link href="/politica-confidentialitate" className="block hover:text-gray-400 transition-colors">
                Politica de confidențialitate
              </Link>
              <Link href="/termeni-si-conditii" className="block hover:text-gray-400 transition-colors">
                Termeni și condiții
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2026 Imobiliare Strășeni. Toate drepturile rezervate.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 text-sm text-gray-400">
            <span>Contactează-mă pentru informații complete</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
