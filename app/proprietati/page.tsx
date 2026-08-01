'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Property } from '@/lib/types';

function ProprietatiContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then(data => {
        setProperties(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  const propertyType = searchParams.get('type');
  const locality = searchParams.get('locality');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (propertyType) {
      filtered = filtered.filter((p) => p.type === propertyType);
    }

    if (locality) {
      filtered = filtered.filter((p) => p.locality === locality);
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [propertyType, locality, minPrice, maxPrice, sortBy]);

  return (
    <>
      {/* Hero */}
      <section className="bg-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Proprietăți' }]} />
          <h1 className="text-4xl font-bold text-charcoal mb-4">Proprietăți</h1>
          <p className="text-text-muted text-lg">
            Explore {filteredProperties.length} proprietăți disponibile în Strășeni și raion
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="h-20 bg-white rounded animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-light-gray rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-charcoal">
                {filteredProperties.length} proprietăți găsite
              </h2>

          <div className="flex gap-4 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
            >
              <option value="newest">Cele mai noi</option>
              <option value="price-asc">Preț: ascendent</option>
              <option value="price-desc">Preț: descendent</option>
            </select>

            <div className="flex border border-light-gray rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${
                  viewMode === 'grid'
                    ? 'bg-forest-green text-white'
                    : 'text-charcoal hover:bg-light-gray'
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 border-l border-light-gray ${
                  viewMode === 'list'
                    ? 'bg-forest-green text-white'
                    : 'text-charcoal hover:bg-light-gray'
                }`}
              >
                ≡
              </button>
            </div>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
              <div className="text-center py-16">
                <p className="text-text-muted text-lg mb-4">
                  Nu am găsit proprietăți care să se potrivească cu criteriile tale.
                </p>
                <button
                  onClick={() => window.location.href = '/proprietati'}
                  className="text-forest-green font-medium hover:text-forest-green-light"
                >
                  Resetează filtrele
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function ProprietatiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light-gray animate-pulse" />}>
      <ProprietatiContent />
    </Suspense>
  );
}
