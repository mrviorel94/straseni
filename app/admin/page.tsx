'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Property } from '@/lib/types';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

type Lead = {
  id: string;
  title: string;
  type: string;
  locality: string;
  address: string;
  price: number | null;
  area: number | null;
  description: string | null;
  contact_name: string;
  contact_phone: string;
  contact_email: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [tab, setTab] = useState<'properties' | 'leads'>('properties');
  const [formData, setFormData] = useState({
    title: '',
    type: 'casa' as const,
    locality: 'Strășeni',
    address: '',
    price: '',
    area: '',
    description: '',
    video_url: '',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Property> | null>(null);

  useEffect(() => {
    checkAuth();
    if (user) fetchData();
  }, [user]);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user || null);
    setLoading(false);
  };

  const fetchData = async () => {
    const [propertiesRes, leadsRes] = await Promise.all([
      fetch('/api/properties'),
      fetch('/api/leads'),
    ]);

    if (propertiesRes.ok) {
      const props = await propertiesRes.json();
      setProperties(props);
    }

    if (leadsRes.ok) {
      const leadsData = await leadsRes.json();
      setLeads(leadsData);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert('Email sau parolă incorectă');
        return;
      }
      setUser(data.user);
      setEmail('');
      setPassword('');
      fetchData();
    } catch (err) {
      alert('Eroare la autentificare');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      });
      if (error) throw error;
    } catch (err) {
      alert('Eroare la autentificare cu Google');
      console.error(err);
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.address || !formData.price || !formData.area) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-');
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title: formData.title,
          type: formData.type,
          locality: formData.locality,
          address: formData.address,
          price: parseInt(formData.price),
          area: parseInt(formData.area),
          image: formData.image,
          images: [formData.image],
          description: formData.description,
          video_url: formData.video_url || null,
          amenities: [],
          utilities: [],
          featured: false,
          contact_name: 'Contact',
          contact_phone: '+373 69 000 000',
          sold: false,
        }),
      });

      if (res.ok) {
        setFormData({ title: '', type: 'casa', locality: 'Strășeni', address: '', price: '', area: '', description: '', video_url: '', image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop' });
        setShowAddForm(false);
        fetchData();
        alert('✓ Proprietate adăugată');
      }
    } catch (error) {
      alert('Eroare la adăugare');
      console.error(error);
    }
  };

  const handleEditStart = (property: Property) => {
    setEditingId(property.id);
    setEditFormData(property);
  };

  const handleEditSave = async () => {
    if (!editFormData || !editingId) return;
    if (!editFormData.title || !editFormData.address || !editFormData.price || !editFormData.area) {
      alert('Completează toate câmpurile obligatorii');
      return;
    }

    try {
      const res = await fetch(`/api/properties/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        setEditingId(null);
        setEditFormData(null);
        fetchData();
        alert('✓ Proprietate actualizată');
      } else {
        alert('Eroare la actualizare');
      }
    } catch (error) {
      alert('Eroare la actualizare');
      console.error(error);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Sigur dorești să ștergi această proprietate?')) return;
    try {
      const res = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        alert('✓ Proprietate ștearsă');
      }
    } catch (error) {
      alert('Eroare la ștergere');
      console.error(error);
    }
  };

  const handleToggleSold = async (propertyId: string) => {
    try {
      const prop = properties.find(p => p.id === propertyId);
      if (!prop) return;

      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prop, sold: !prop.sold }),
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproveLead = async (leadId: string, lead: Lead) => {
    try {
      const slug = lead.title.toLowerCase().replace(/\s+/g, '-');
      const propertyData = {
        slug,
        title: lead.title,
        type: lead.type,
        locality: lead.locality,
        address: lead.address,
        price: lead.price || 0,
        area: lead.area || 0,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop',
        images: ['https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop'],
        description: lead.description,
        amenities: [],
        utilities: [],
        featured: false,
        contact_name: lead.contact_name,
        contact_phone: lead.contact_phone,
        sold: false,
        video_url: null,
      };

      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved', property_data: propertyData }),
      });

      if (res.ok) {
        fetchData();
        alert('✓ Lead aprobat și proprietate adăugată');
      }
    } catch (error) {
      alert('Eroare la aprobare');
      console.error(error);
    }
  };

  const handleRejectLead = async (leadId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (res.ok) {
        fetchData();
        alert('✓ Lead respins');
      }
    } catch (error) {
      alert('Eroare la respingere');
      console.error(error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Se încarcă...</p></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green to-forest-green-light flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">Admin Panel</h1>
            <p className="text-text-muted">Imobiliare Strășeni</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Parolă</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolă"
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light active:scale-95 transition-all font-medium text-base"
            >
              Intru în Admin
            </button>
          </form>

          <Link href="/" className="block text-center mt-6 text-forest-green hover:underline text-sm">
            ← Înapoi la site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-forest-green text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className="text-sm opacity-90 truncate">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-forest-green rounded-lg hover:bg-light-gray active:scale-95 transition-all font-medium text-sm w-full sm:w-auto"
              >
                Delogare
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-light-gray sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 sm:gap-8 min-w-max sm:min-w-full">
          <button
            onClick={() => setTab('properties')}
            className={`py-4 px-2 sm:px-4 font-medium border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
              tab === 'properties'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-text-muted hover:text-charcoal'
            }`}
          >
            Proprietăți ({properties.length})
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`py-4 px-2 sm:px-4 font-medium border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
              tab === 'leads'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-text-muted hover:text-charcoal'
            }`}
          >
            Leads ({leads.filter(l => l.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {tab === 'properties' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">Gestionare Proprietăți</h2>
                <p className="text-sm sm:text-base text-text-muted">Total: {properties.length} proprietăți ({properties.filter(p => !p.sold).length} disponibile)</p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 transition-all font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                {showAddForm ? '✕ Anulează' : '+ Adaug proprietate'}
              </button>
            </div>

        {/* Edit Property Modal */}
        {tab === 'properties' && editingId && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-4 sm:mb-6">Editare proprietate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Titlu"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-base"
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
                <input
                  type="url"
                  placeholder="URL Video (optional)"
                  value={editFormData.video_url || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, video_url: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2"
                />
              </div>
              <textarea
                placeholder="Descriere"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green w-full mb-6"
                rows={3}
              />
              <div className="flex gap-2 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editFormData.sold || false}
                    onChange={(e) => setEditFormData({ ...editFormData, sold: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Marchez ca SOLD</span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 font-medium transition-all text-sm sm:text-base"
                >
                  ✓ Salvează
                </button>
                <button
                  onClick={() => handleDelete(editingId)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 font-medium transition-all text-sm sm:text-base"
                >
                  🗑️ Șterge
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 active:scale-95 font-medium transition-all text-sm sm:text-base"
                >
                  ✕ Anulează
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Property Form */}
        {tab === 'properties' && showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in border-2 border-forest-green">
            <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-4 sm:mb-6">Adaug proprietate nouă</h3>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Titlu proprietate *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-base"
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
              <input
                type="url"
                placeholder="URL Video (optional)"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2"
              />
              <button
                type="submit"
                className="md:col-span-2 px-4 sm:px-6 py-2 sm:py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 font-medium transition-all text-sm sm:text-base"
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
                  property.sold
                    ? 'border-gray-400 opacity-60'
                    : 'border-forest-green'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={property.image}
                        alt={property.title}
                        className={`w-12 sm:w-16 h-12 sm:h-16 rounded object-cover flex-shrink-0 ${
                          property.sold ? 'grayscale' : ''
                        }`}
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-charcoal line-clamp-1">{property.title}</h3>
                        <p className="text-xs sm:text-sm text-text-muted truncate">{property.address}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-text-muted">
                      <span>📍 {property.locality}</span>
                      <span>💶 {property.price} EUR</span>
                      <span>📏 {property.area}m²</span>
                      {property.video_url && <span>🎥 Video</span>}
                      {property.sold && (
                        <span className="text-gray-500 font-medium">✓ VÂNDUT</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleEditStart(property)}
                      className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 font-medium transition-all text-sm sm:text-base"
                    >
                      ✏️ Editează
                    </button>
                    <button
                      onClick={() => handleToggleSold(property.id)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all active:scale-95 text-sm sm:text-base ${
                        property.sold
                          ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          : 'bg-forest-green text-white hover:bg-forest-green-light'
                      }`}
                    >
                      {property.sold ? 'Disponibil' : 'SOLD'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
        )}

        {tab === 'leads' && (
          <div className="space-y-3 sm:space-y-4">
            {leads.filter(l => l.status === 'pending').length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-text-muted">Nici un lead în așteptare</p>
              </div>
            ) : (
              leads.filter(l => l.status === 'pending').map((lead) => (
                <div key={lead.id} className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-orange-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-sm text-text-muted">Proprietate</p>
                    <p className="font-bold text-charcoal">{lead.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Contact</p>
                    <p className="font-bold text-charcoal">{lead.contact_name}</p>
                    <p className="text-sm">{lead.contact_phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Locație</p>
                    <p className="font-bold text-charcoal">{lead.locality}</p>
                    <p className="text-sm">{lead.address}</p>
                  </div>
                </div>
                {lead.description && (
                  <p className="text-sm text-text-muted mb-4 bg-light-gray p-3 rounded">{lead.description}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleApproveLead(lead.id, lead)}
                    className="flex-1 px-4 py-2 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 font-medium transition-all text-sm sm:text-base"
                  >
                    ✓ Aprobă
                  </button>
                  <button
                    onClick={() => handleRejectLead(lead.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 font-medium transition-all text-sm sm:text-base"
                  >
                    ✕ Respinge
                  </button>
                </div>
                </div>
              ))
            )}
          </div>
        )}

        <Link href="/" className="inline-block mt-8 text-forest-green hover:underline font-medium">
          ← Înapoi la site
        </Link>
      </div>
    </div>
  );
}
