import Link from 'next/link';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const typeLabels: Record<string, string> = {
    casa: 'Casă',
    apartament: 'Apartament',
    teren: 'Teren',
    comercial: 'Spațiu comercial',
  };

  const slug = property.slug || `property-${property.id}`;

  return (
    <Link href={`/proprietati/${slug}`}>
      <div className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col ${
        property.sold ? 'opacity-60 grayscale' : 'hover:scale-102'
      }`}>
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-light-gray">
          <img
            src={property.image}
            alt={property.title}
            className={`w-full h-full object-cover ${
              property.sold
                ? 'grayscale'
                : 'group-hover:scale-105'
            } transition-transform duration-300`}
          />

          {/* Sold Overlay */}
          {property.sold && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center">
              <div className="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold text-lg transform rotate-12">
                VÂNDUT
              </div>
            </div>
          )}

          {/* Badge */}
          {property.badge && !property.sold && (
            <div className="absolute top-4 right-4 bg-forest-green text-white px-3 py-1 rounded-lg text-sm font-medium animate-fade-in">
              {property.badge}
            </div>
          )}

          {/* Locality Badge */}
          <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-lg text-sm font-medium ${
            property.sold
              ? 'bg-gray-400 text-gray-700'
              : 'bg-white text-charcoal'
          }`}>
            {property.locality}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow min-h-0">
          {/* Type and Price */}
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ${
              property.sold
                ? 'bg-gray-200 text-gray-600'
                : 'text-forest-green bg-light-gray'
            }`}>
              {typeLabels[property.type]}
            </span>
            <span className={`text-lg font-bold ml-2 flex-shrink-0 ${
              property.sold ? 'text-gray-500' : 'text-forest-green'
            }`}>
              {property.priceLabel || `${property.price.toLocaleString()} EUR`}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-base leading-snug mb-3 line-clamp-2 transition-colors ${
            property.sold
              ? 'text-gray-500'
              : 'text-charcoal group-hover:text-forest-green'
          }`}>
            {property.title}
          </h3>

          {/* Specs */}
          <div className={`flex flex-wrap gap-4 text-sm border-t pt-4 mt-auto ${
            property.sold
              ? 'text-gray-400 border-gray-200'
              : 'text-text-muted border-light-gray'
          }`}>
            {property.area && (
              <div>
                <span className={`font-medium ${
                  property.sold ? 'text-gray-500' : 'text-charcoal'
                }`}>{property.area}</span>
                <span> m²</span>
              </div>
            )}
            {property.rooms && (
              <div>
                <span className={`font-medium ${
                  property.sold ? 'text-gray-500' : 'text-charcoal'
                }`}>{property.rooms}</span>
                <span> camere</span>
              </div>
            )}
            {property.land_area && (
              <div>
                <span className={`font-medium ${
                  property.sold ? 'text-gray-500' : 'text-charcoal'
                }`}>{(property.land_area / 100).toFixed(0)}</span>
                <span> ari</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
