import Link from 'next/link';
import { BlogArticle } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface EditorialBlogSectionProps {
  articles: BlogArticle[];
}

export default function EditorialBlogSection({ articles }: EditorialBlogSectionProps) {
  if (articles.length === 0) return null;

  const featuredArticle = articles[0];
  const supportingArticles = articles.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="mb-2">
          <span className="text-xs uppercase tracking-widest text-soft-stone font-bold">
            Observator imobiliar Strășeni
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
          Articole și sfaturi
        </h2>
        <p className="text-text-light max-w-2xl">
          Informații utile despre piața imobiliară locală, sfaturi de cumpărare și vânzare
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <Link href={`/blog/${featuredArticle.slug}`}>
          <div className="group md:col-span-2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white cursor-pointer h-full">
            <div className="relative h-64 md:h-96 overflow-hidden bg-light-gray">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-bold uppercase bg-forest-green text-white px-3 py-1 rounded-sm">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                <span>{new Date(featuredArticle.date).toLocaleDateString('ro-RO')}</span>
                <span>•</span>
                <span>{featuredArticle.readingTime} min citire</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-3 group-hover:text-forest-green transition-colors leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-text-light line-clamp-3">
                {featuredArticle.excerpt}
              </p>
            </div>
          </div>
        </Link>

        {/* Supporting Articles - Sidebar */}
        <div className="space-y-4">
          {supportingArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <div className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-light-gray hover:border-soft-stone h-full">
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-soft-stone">
                    {article.category}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-charcoal text-base line-clamp-2 mb-2 group-hover:text-forest-green transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-text-muted">
                  {new Date(article.date).toLocaleDateString('ro-RO')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Link */}
      <div className="text-center pt-6 border-t border-light-gray">
        <Link
          href="/blog"
          className="inline-block text-forest-green font-medium hover:text-forest-green-light transition-colors"
        >
          Citește toate articolele →
        </Link>
      </div>
    </section>
  );
}
