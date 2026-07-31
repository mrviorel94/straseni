'use client';

import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { mockArticles } from '@/lib/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: Props) {
  const { slug } = (params as any);
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-charcoal mb-4">Articol nu găsit</h1>
        <Link href="/blog" className="text-forest-green font-medium hover:text-forest-green-light">
          Înapoi la blog →
        </Link>
      </div>
    );
  }

  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
      </section>

      {/* Hero */}
      <section className="relative min-h-96 flex items-end bg-charcoal overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <p className="text-forest-green font-medium text-sm mb-2">{article.category}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-green-100">
            <span>{article.author}</span>
            <span>•</span>
            <time>{new Date(article.date).toLocaleDateString('ro-RO')}</time>
            <span>•</span>
            <span>{article.readingTime} min citire</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none">
          {/* Featured Image */}
          <div className="mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Excerpt */}
          <p className="text-xl text-text-muted leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Article Content */}
          <div className="text-lg text-text-muted leading-relaxed space-y-6 mb-12">
            <p>{article.content}</p>
            <p>
              Articolul complet ar fi mult mai lung și ar conține mai multe secțiuni, imagini, și
              informații detaliate. Aceasta este o demonstrație a structurii paginii.
            </p>
          </div>

          {/* Article Meta */}
          <div className="bg-light-gray p-6 rounded-lg my-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm mb-1">Autor</p>
                <p className="font-bold text-charcoal">{article.author}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm mb-1">Data publicării</p>
                <p className="font-bold text-charcoal">
                  {new Date(article.date).toLocaleDateString('ro-RO')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-forest-green text-white p-8 rounded-lg text-center my-12">
            <h3 className="text-2xl font-bold mb-4">
              Ai o proprietate pe care vrei s-o vinzi?
            </h3>
            <p className="text-lg text-green-100 mb-6">
              Contactează-ne pentru consultanță personalizată și promovare profesională.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-forest-green px-8 py-3 rounded-lg hover:bg-light-gray transition-colors font-medium"
            >
              Contactează-ne
            </Link>
          </div>
        </article>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-light-gray py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal mb-8">Articole similare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
