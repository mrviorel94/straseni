'use client';

import { useState } from 'react';
import { mockProperties } from '@/lib/mockData';
import { Property } from '@/lib/types';
import Link from 'next/link';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [soldStatus, setSoldStatus] = useState<Record<string, boolean>>(
    mockProperties.reduce((acc, prop) => ({ ...acc, [prop.id]: prop.sold || false }), {})
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'casa' as const,
    locality: 'Strășeni',
    address: '',
    price: '',
    area: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Property> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password (change to something secure in production)
    if (password === 'admin123') {
      setAuthenticated(true);
      setPassword('');
    } else {
      alert('Parolă incorectă');
    }
  };

  const handleToggleSold = (propertyId: string) => {
    setSoldStatus((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.address || !formData.price || !formData.area) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    const newProperty: Property = {
      id: Date.now().toString(),
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      type: formData.type,
      locality: formData.locality,
      address: formData.address,
      price: parseInt(formData.price),
      priceLabel: `${formData.price} EUR`,
      area: parseInt(formData.area),
      image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop'],
      description: formData.description,
      amenities: [],
      utilities: [],
      featured: false,
      contact: { name: 'Contact', phone: '+373 69 000 000' },
    };

    setProperties([...properties, newProperty]);
    setSoldStatus({ ...soldStatus, [newProperty.id]: false });
    setFormData({ title: '', type: 'casa', locality: 'Strășeni', address: '', price: '', area: '', description: '' });
    setShowAddForm(false);
    alert('✓ Proprietate adăugată');
  };

  const handleEditStart = (property: Property) => {
    setEditingId(property.id);
    setEditFormData(property);
  };

  const handleEditSave = () => {
    if (!editFormData || !editingId) return;
    if (!editFormData.title || !editFormData.address || !editFormData.price || !editFormData.area) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    setProperties(properties.map(p => p.id === editingId ? (editFormData as Property) : p));
    setEditingId(null);
    setEditFormData(null);
    alert('✓ Proprietate actualizată');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green to-forest-green-light flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-fade-in">
          <h1 className="text-3xl font-bold text-charcoal mb-2">Admin Panel</h1>
          <p className="text-text-muted mb-6">Imobiliare Strășeni</p>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introdu parola"
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light transition-all transform hover:scale-105 font-medium"
            >
              Intru în Admin
            </button>
          </form>

          <Link href="/" className="block text-center mt-4 text-forest-green hover:underline text-sm">
            Înapoi la site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-forest-green text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin - Proprietăți</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 bg-white text-forest-green rounded-lg hover:bg-light-gray transition-colors font-medium"
          >
            Delogare
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-2">Gestionare Proprietăți</h2>
            <p className="text-text-muted">Total: {properties.length} proprietăți ({properties.filter(p => !soldStatus[p.id]).length} disponibile)</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light transition-all transform hover:scale-105 font-medium"
          >
            {showAddForm ? '✕ Anulează' : '+ Adaug proprietate'}
          </button>
        </div>

        {/* Edit Property Modal */}
        {editingId && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold text-charcoal mb-6">Editare proprietate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Titlu"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
                <select
                  value={editFormData.type}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as any })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                >
                  <option value="casa">Casă</option>
                  <option value="apartament">Apartament</option>
                  <option value="teren">Teren</option>
                  <option value="comercial">Spațiu comercial</option>
                </select>
                <input
                  type="text"
                  placeholder="Adresă"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
                <select
                  value={editFormData.locality}
                  onChange={(e) => setEditFormData({ ...editFormData, locality: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                >
                  <option value="Strășeni">Strășeni</option>
                  <option value="Cojușna">Cojușna</option>
                  <option value="Sireți">Sireți</option>
                  <option value="Vatra">Vatra</option>
                  <option value="Lozova">Lozova</option>
                  <option value="Căpriana">Căpriana</option>
                </select>
                <input
                  type="number"
                  placeholder="Preț (EUR)"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
                <input
                  type="number"
                  placeholder="Suprafață (mp)"
                  value={editFormData.area}
                  onChange={(e) => setEditFormData({ ...editFormData, area: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
              <textarea
                placeholder="Descriere"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green w-full mb-6"
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-6 py-2 bg-forest-green text-white rounded-lg hover:bg-forest-green-light font-medium transition-all"
                >
                  ✓ Salvează
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition-all"
                >
                  ✕ Anulează
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Property Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-fade-in border-2 border-forest-green">
            <h3 className="text-xl font-bold text-charcoal mb-6">Adaug proprietate nouă</h3>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Titlu proprietate *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              >
                <option value="casa">Casă</option>
                <option value="apartament">Apartament</option>
                <option value="teren">Teren</option>
                <option value="comercial">Spațiu comercial</option>
              </select>
              <input
                type="text"
                placeholder="Adresă *"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              />
              <select
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              >
                <option value="Strășeni">Strășeni</option>
                <option value="Cojușna">Cojușna</option>
                <option value="Sireți">Sireți</option>
                <option value="Vatra">Vatra</option>
                <option value="Lozova">Lozova</option>
                <option value="Căpriana">Căpriana</option>
              </select>
              <input
                type="number"
                placeholder="Preț (EUR) *"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              />
              <input
                type="number"
                placeholder="Suprafață (mp) *"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
              />
              <textarea
                placeholder="Descriere"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2"
                rows={3}
              />
              <button
                type="submit"
                className="md:col-span-2 px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light font-medium transition-all transform hover:scale-105"
              >
                ✓ Adaug proprietate
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={`bg-white rounded-lg shadow hover:shadow-lg transition-all transform hover:scale-102 p-6 border-l-4 ${
                soldStatus[property.id]
                  ? 'border-gray-400 opacity-60'
                  : 'border-forest-green'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={property.image}
                      alt={property.title}
                      className={`w-16 h-16 rounded object-cover ${
                        soldStatus[property.id] ? 'grayscale' : ''
                      }`}
                    />
                    <div>
                      <h3 className="font-bold text-lg text-charcoal">{property.title}</h3>
                      <p className="text-sm text-text-muted">{property.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-text-muted">
                    <span>📍 {property.locality}</span>
                    <span>💶 {property.priceLabel}</span>
                    <span>📏 {property.area}m²</span>
                    {soldStatus[property.id] && (
                      <span className="text-gray-500 font-medium">✓ VÂNDUT</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditStart(property)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    ✏️ Editează
                  </button>
                  <button
                    onClick={() => handleToggleSold(property.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 whitespace-nowrap ${
                      soldStatus[property.id]
                        ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        : 'bg-forest-green text-white hover:bg-forest-green-light'
                    }`}
                  >
                    {soldStatus[property.id] ? 'Marchează disponibil' : 'Marchează SOLD'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-blue-800">
            <strong>Notă:</strong> Starea proprietăților este salvată doar în sesiunea curentă. Pentru salvare permanentă, conectați-vă la o bază de date.
          </p>
        </div>

        <Link href="/" className="inline-block mt-8 text-forest-green hover:underline font-medium">
          ← Înapoi la site
        </Link>
      </div>
    </div>
  );
}
