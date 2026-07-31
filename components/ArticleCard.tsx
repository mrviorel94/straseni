import Link from 'next/link';
import { BlogArticle } from '@/lib/types';

interface ArticleCardProps {
  article: BlogArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 group h-full flex flex-col cursor-pointer">
        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-light-gray">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-forest-green font-medium bg-light-gray px-2 py-1 rounded group-hover:bg-forest-green group-hover:text-white transition-all duration-300">
              {article.category}
            </span>
            <time className="text-text-muted group-hover:text-charcoal transition-colors duration-300">
              {new Date(article.date).toLocaleDateString('ro-RO')}
            </time>
          </div>

          {/* Title */}
          <h3 className="font-bold text-charcoal text-lg mb-2 line-clamp-2 group-hover:text-forest-green transition-colors duration-300">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-muted text-sm mb-4 line-clamp-2 flex-grow group-hover:text-charcoal transition-colors duration-300">
            {article.excerpt}
          </p>

          {/* Reading Time */}
          <div className="text-xs text-text-muted border-t border-light-gray pt-4 mt-auto group-hover:border-forest-green transition-colors duration-300">
            Timp de citire: {article.readingTime} min
          </div>
        </div>
      </article>
    </Link>
  );
}
