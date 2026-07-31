import Link from 'next/link';
import { Locality } from '@/lib/types';

interface LocalityCardProps {
  locality: Locality;
}

export default function LocalityCard({ locality }: LocalityCardProps) {
  return (
    <Link href={`/localitati/${locality.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 group h-full cursor-pointer">
        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-light-gray">
          <img
            src={locality.image}
            alt={locality.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-lg text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            {locality.name}
          </h3>

          <p className="text-text-muted text-sm mb-4 line-clamp-2 group-hover:text-charcoal transition-colors duration-300">
            {locality.description}
          </p>

          <div className="flex items-center justify-between border-t border-light-gray pt-4">
            <span className="text-sm text-text-muted">
              <span className="font-bold text-charcoal">{locality.listingsCount}</span>
              {' '}
              proprietăți
            </span>
            <span className="text-forest-green font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
              Explorează →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
