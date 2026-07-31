import Link from 'next/link';
import { Property } from '@/lib/types';

interface PropertyCardFeaturedProps {
  property: Property;
}

export default function PropertyCardFeatured({ property }: PropertyCardFeaturedProps) {
  const typeLabels: Record<string, string> = {
    casa: 'Casă',
    apartament: 'Apartament',
    teren: 'Teren',
    comercial: 'Spațiu comercial',
  };

  const slug = property.slug || `property-${property.id}`;

  return (
    <Link href={`/proprietati/${slug}`}>
      <div className="group grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        {/* Image - spans 2 columns on desktop */}
        <div className="md:col-span-2 relative h-64 md:h-96 overflow-hidden bg-light-gray">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Location label with coordinate style */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-charcoal px-3 py-2 rounded-sm text-sm font-medium flex items-center gap-2">
            <span className="text-soft-stone text-xl">📍</span>
            {property.locality}
          </div>
        </div>

        {/* Content - 1 column on desktop */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-warm-ivory">
          {/* Badge */}
          {property.badge && (
            <div className="inline-block w-fit mb-4">
              <span className="text-xs font-bold uppercase tracking-wide text-soft-stone">
                {property.badge}
              </span>
            </div>
          )}

          {/* Type */}
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-text-muted font-medium">
              {typeLabels[property.type]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4 leading-tight group-hover:text-forest-green transition-colors">
            {property.title}
          </h3>

          {/* Price - Editorial Style */}
          <div className="mb-6 pb-6 border-b border-light-gray">
            <p className="text-xs uppercase text-text-muted mb-1 tracking-wide">Preț</p>
            <p className="text-3xl font-bold text-forest-green">
              {property.priceLabel || `${(property.price / 1000).toFixed(0)}K EUR`}
            </p>
          </div>

          {/* Key specs */}
          <div className="space-y-3 mb-6">
            {property.area && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Suprafață</span>
                <span className="font-medium text-charcoal">{property.area} m²</span>
              </div>
            )}
            {property.rooms && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Camere</span>
                <span className="font-medium text-charcoal">{property.rooms}</span>
              </div>
            )}
            {property.landArea && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Teren</span>
                <span className="font-medium text-charcoal">{(property.landArea / 100).toFixed(0)} ari</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <button className="w-full bg-forest-green text-white py-3 rounded-md font-medium hover:bg-forest-green-light transition-colors duration-200 mt-auto">
            Vezi detalii
          </button>
        </div>
      </div>
    </Link>
  );
}
