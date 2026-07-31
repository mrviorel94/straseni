export default function ConsultantProfile() {
  return (
    <section className="py-20 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-md bg-light-gray flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">👤</div>
              <p className="text-text-muted text-sm">Fotografie consultant local</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-2">
              <span className="text-xs uppercase tracking-widest text-soft-stone font-bold">
                Consultanță locală
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6 leading-tight">
              Cunosc piața din Strășeni
            </h2>

            <p className="text-lg text-text-light mb-6 leading-relaxed">
              Nu este un portal anonim. Cunosc zona, urmăresc piața locală și te ajut să înțelegi proprietatea înainte să iei o decizie.
            </p>

            {/* Key Points */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <span className="text-soft-stone text-xl flex-shrink-0">✓</span>
                <p className="text-charcoal"><strong>10+ ani</strong> de experiență pe piața imobiliară din Strășeni și raioane vecine</p>
              </div>
              <div className="flex gap-3">
                <span className="text-soft-stone text-xl flex-shrink-0">✓</span>
                <p className="text-charcoal"><strong>Verificare riguroasă</strong> a fiecărei proprietăți listede</p>
              </div>
              <div className="flex gap-3">
                <span className="text-soft-stone text-xl flex-shrink-0">✓</span>
                <p className="text-charcoal"><strong>Răspuns rapid</strong> la întrebări și suport complet în negocieri</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/373"
              className="inline-block bg-forest-green text-white px-8 py-3 rounded-md font-medium hover:bg-forest-green-light transition-colors duration-200"
            >
              Contactează pe WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
