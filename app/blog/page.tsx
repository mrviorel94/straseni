import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { mockArticles } from '@/lib/mockData';

export const metadata = {
  title: 'Blog - Imobiliare Strășeni',
  description: 'Articole, sfaturi și informații despre piața imobiliară din Strășeni, ghiduri pentru cumpărători și vânzători.',
};

export default function BlogPage() {
  const categories = Array.from(new Set(mockArticles.map((a) => a.category)));

  return (
    <>
      {/* Hero */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog' }]} />
          <h1 className="text-4xl font-bold text-charcoal mb-4">Blog</h1>
          <p className="text-text-muted text-lg">
            Sfaturi, articole și informații despre piața imobiliară din Strășeni
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-light-gray p-6 rounded-lg sticky top-24 h-fit">
              <h3 className="font-bold text-charcoal mb-4">Categorii</h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-forest-green font-medium hover:text-forest-green-light transition-colors">
                    Toate (6)
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button className="text-text-muted hover:text-forest-green transition-colors">
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-green text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Abonează-te la articolele noi
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Primește notificări atunci când publicăm articole noi despre piața imobiliară.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Adresa ta de email"
              className="flex-1 px-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-beige"
              required
            />
            <button
              type="submit"
              className="bg-white text-forest-green px-8 py-3 rounded-lg hover:bg-light-gray transition-colors font-medium whitespace-nowrap"
            >
              Abonează-te
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
