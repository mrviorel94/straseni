import Link from 'next/link';
import { Property } from '@/lib/types';
import SoldStamp from './SoldStamp';

interface PropertyCardCompactProps {
  property: Property;
}

export default function PropertyCardCompact({ property }: PropertyCardCompactProps) {
  const typeLabels: Record<string, string> = {
    casa: 'Casă',
    apartament: 'Apartament',
    teren: 'Teren',
    comercial: 'Spațiu comercial',
  };

  const slug = property.slug || `property-${property.id}`;

  return (
    <Link href={`/proprietati/${slug}`}>
      <div className={`group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-light-gray hover:border-forest-green-light ${
        property.sold ? 'opacity-60 grayscale' : ''
      }`}>
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-light-gray">
          <img
            src={property.image}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              property.sold ? '' : 'group-hover:scale-110'
            }`}
          />
          {property.sold && <SoldStamp />}
          {property.badge && !property.sold && (
            <div className="absolute top-2 right-2">
              <span className="text-xs font-bold uppercase bg-forest-green text-white px-2 py-1 rounded-sm">
                {property.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Type */}
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-text-muted font-medium">
              {typeLabels[property.type]}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-medium text-charcoal mb-3 line-clamp-2 text-sm leading-snug group-hover:text-forest-green transition-colors">
            {property.title}
          </h3>

          {/* Price */}
          <div className="mb-4 pb-4 border-b border-light-gray">
            <p className="text-lg font-bold text-forest-green">
              {property.priceLabel || `${(property.price / 1000).toFixed(0)}K EUR`}
            </p>
          </div>

          {/* Location & Specs */}
          <div className="text-xs space-y-2 text-text-muted flex-grow">
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span className="font-medium">{property.locality}</span>
            </div>
            <div className="flex gap-3 text-xs">
              {property.area && <span>{property.area} m²</span>}
              {property.rooms && <span>{property.rooms} camere</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
