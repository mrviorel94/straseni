'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [propertyType, setPropertyType] = useState(searchParams.get('type') || '');
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (propertyType) params.append('type', propertyType);
    if (locality) params.append('locality', locality);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    router.push(`/proprietati?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Property Type */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Tip proprietate
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          >
            <option value="">Toate tipurile</option>
            <option value="casa">Casă</option>
            <option value="apartament">Apartament</option>
            <option value="teren">Teren</option>
            <option value="comercial">Spațiu comercial</option>
          </select>
        </div>

        {/* Locality */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Localitate
          </label>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          >
            <option value="">Toate localitățile</option>
            <option value="Strășeni">Strășeni</option>
            <option value="Cojușna">Cojușna</option>
            <option value="Sireți">Sireți</option>
            <option value="Vatra">Vatra</option>
            <option value="Lozova">Lozova</option>
            <option value="Căpriana">Căpriana</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Preț minim
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="EUR"
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          />
        </div>

        {/* Max Price */}
        <div className="group">
          <label className="block text-sm font-medium text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">
            Preț maxim
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="EUR"
            className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green hover:border-forest-green transition-all duration-300"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-forest-green text-white px-6 py-2 rounded-lg hover:bg-forest-green-light transition-all duration-300 font-medium transform hover:scale-105 active:scale-95"
          >
            Caută proprietăți
          </button>
        </div>
      </div>
    </form>
  );
}
