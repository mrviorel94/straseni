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
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Properties loaded:', data?.length || 0, 'items');
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const propertyType = searchParams.get('type');
  const locality = searchParams.get('locality');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (propertyType && propertyType !== '') {
      filtered = filtered.filter((p) => p.type === propertyType);
    }

    if (locality && locality !== '') {
      filtered = filtered.filter((p) => p.locality === locality);
    }

    if (minPrice && Number(minPrice) > 0) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice && Number(maxPrice) > 0) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    // Sort - default is newest (by created_at or ID)
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return filtered;
  }, [properties, propertyType, locality, minPrice, maxPrice, sortBy]);

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

          <div className="flex gap-4 w-full sm:w-auto flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-2 border-2 border-forest-green rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-forest-green bg-white text-charcoal font-medium shadow-sm hover:shadow-md transition-all"
            >
              <option value="newest">Cele mai noi</option>
              <option value="price-asc">Preț: ascendent</option>
              <option value="price-desc">Preț: descendent</option>
            </select>

            <div className="flex border-2 border-forest-green rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`px-4 py-2 font-semibold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-forest-green text-white'
                    : 'text-forest-green hover:bg-light-gray'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List view"
                className={`px-4 py-2 font-semibold transition-all duration-300 border-l-2 border-forest-green ${
                  viewMode === 'list'
                    ? 'bg-forest-green text-white'
                    : 'text-forest-green hover:bg-light-gray'
                }`}
              >
                ≡ List
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
                <p className="text-text-muted text-lg mb-6">
                  Nu am găsit proprietăți care să se potrivească cu criteriile tale.
                </p>
                <button
                  onClick={() => window.location.href = '/proprietati'}
                  className="px-6 py-3 bg-forest-green text-white font-bold rounded-lg hover:bg-forest-green-light transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  ↻ Resetează filtrele
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
