'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Property } from '@/lib/types';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { translations, type Language, getTranslation } from '@/lib/translations';

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
  const [tab, setTab] = useState<'dashboard' | 'properties' | 'leads'>('dashboard');
  const [lang, setLang] = useState<Language>('ro');
  const t = (key: keyof typeof translations.ro) => getTranslation(lang, key);

  // Filters
  const [filterType, setFilterType] = useState<string>('');
  const [filterLocality, setFilterLocality] = useState<string>('');
  const [filterPriceMin, setFilterPriceMin] = useState<string>('');
  const [filterPriceMax, setFilterPriceMax] = useState<string>('');
  const [showSold, setShowSold] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'casa' as const,
    locality: 'Strășeni',
    address: '',
    price: '',
    area: '',
    rooms: '',
    land_area: '',
    year: '',
    condition: '',
    heating: '',
    description: '',
    video_url: '',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Property> | null>(null);
  const [uploadingImages, setUploadingImages] = useState<File[]>([]);
  const [editUploadingImages, setEditUploadingImages] = useState<(File | string)[]>([]);

  const filteredProperties = properties.filter(prop => {
    const matchType = !filterType || prop.type === filterType;
    const matchLocality = !filterLocality || prop.locality === filterLocality;
    const matchPrice = (!filterPriceMin || prop.price >= parseInt(filterPriceMin)) &&
                       (!filterPriceMax || prop.price <= parseInt(filterPriceMax));
    const matchSold = showSold || !prop.sold;
    return matchType && matchLocality && matchPrice && matchSold;
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user || null);
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

      const [propertiesRes, leadsRes] = await Promise.all([
        fetch('/api/properties', { signal: controller.signal, headers }),
        fetch('/api/leads', { signal: controller.signal, headers }),
      ]);

      clearTimeout(timeoutId);

      if (propertiesRes.ok) {
        const props = await propertiesRes.json();
        setProperties(Array.isArray(props) ? props : []);
      } else {
        console.error('Properties fetch failed:', propertiesRes.status);
        setProperties([]);
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(Array.isArray(leadsData) ? leadsData : []);
      } else {
        console.error('Leads fetch failed:', leadsRes.status);
        setLeads([]);
      }
    } catch (error) {
      console.error('fetchData error:', error);
      setProperties([]);
      setLeads([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const files = Array.from(e.target.files || []);
    if (isEdit) {
      setEditUploadingImages([...(editUploadingImages as (File | string)[]), ...files]);
    } else {
      setUploadingImages([...uploadingImages, ...files]);
    }
  };

  const removeImage = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      setEditUploadingImages(editUploadingImages.filter((_, i) => i !== index));
    } else {
      setUploadingImages(uploadingImages.filter((_, i) => i !== index));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(t('invalidCredentials'));
        return;
      }
      setUser(data.user);
      setEmail('');
      setPassword('');
      fetchData();
    } catch (err) {
      alert(t('authError'));
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
      alert(t('fillRequired'));
      return;
    }

    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-');
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Convert uploaded files to base64
      const uploadedImages: string[] = [];
      for (const file of uploadingImages) {
        try {
          const base64 = await fileToBase64(file);
          uploadedImages.push(base64);
        } catch (err) {
          console.error('Error converting image:', err);
        }
      }

      const allImages = [...uploadedImages, formData.image];
      const mainImage = uploadedImages.length > 0 ? uploadedImages[0] : formData.image;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/properties', {
        method: 'POST',
        signal: controller.signal,
        headers,
        body: JSON.stringify({
          slug,
          title: formData.title,
          type: formData.type,
          locality: formData.locality,
          address: formData.address,
          price: parseInt(formData.price),
          area: parseInt(formData.area),
          rooms: formData.rooms ? parseInt(formData.rooms) : null,
          land_area: formData.land_area ? parseInt(formData.land_area) : null,
          year: formData.year || null,
          condition: formData.condition || null,
          heating: formData.heating || null,
          image: mainImage,
          images: allImages,
          description: formData.description,
          video_url: formData.video_url || null,
          amenities: [],
          utilities: [],
          featured: false,
          contact_name: 'Contact',
          contact_phone: '+373 69 000 000',
          sold: false,
          view_count: 0,
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setFormData({ title: '', type: 'casa', locality: 'Strășeni', address: '', price: '', area: '', rooms: '', land_area: '', year: '', condition: '', heating: '', description: '', video_url: '', image: 'https://images.unsplash.com/photo-1570129477492-45c003d96918?w=800&h=600&fit=crop' });
        setUploadingImages([]);
        setShowAddForm(false);
        await fetchData();
        alert(t('propertyAdded'));
      } else {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`${t('error')}: ${error.error || res.statusText}`);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert(t('timeout'));
      } else {
        alert(`${t('error')}: ` + String(error));
      }
      console.error(error);
    }
  };

  const handleEditStart = (property: Property) => {
    setEditingId(property.id);
    setEditFormData(property);
    setEditUploadingImages(property.images || [property.image]);
  };

  const handleEditSave = async () => {
    if (!editFormData || !editingId) return;
    if (!editFormData.title || !editFormData.address || !editFormData.price || !editFormData.area) {
      alert(t('fillRequired'));
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Convert new files to base64
      const newImages: string[] = [];
      for (const item of editUploadingImages) {
        if (item instanceof File) {
          try {
            const base64 = await fileToBase64(item);
            newImages.push(base64);
          } catch (err) {
            console.error('Error converting image:', err);
          }
        } else if (typeof item === 'string') {
          newImages.push(item);
        }
      }

      const finalImages = newImages.length > 0 ? newImages : editFormData.images;
      const mainImage = finalImages && finalImages.length > 0 ? finalImages[0] : editFormData.image;

      const updatedData = {
        ...editFormData,
        image: mainImage,
        images: finalImages,
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/properties/${editingId}`, {
        method: 'PUT',
        signal: controller.signal,
        headers,
        body: JSON.stringify(updatedData),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setEditingId(null);
        setEditFormData(null);
        setEditUploadingImages([]);
        await fetchData();
        alert(t('propertyUpdated'));
      } else {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`${t('error')}: ${error.error || res.statusText}`);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert(t('timeout'));
      } else {
        alert(`${t('error')}: ${String(error)}`);
      }
      console.error(error);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm(t('deleteConfirm'))) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
        signal: controller.signal,
        headers,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        await fetchData();
        alert(t('propertyDeleted'));
      } else {
        alert(`${t('deleteError')}: ` + res.statusText);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert(t('timeout'));
      } else {
        alert(t('deleteError'));
      }
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
        alert(t('leadApproved'));
      }
    } catch (error) {
      alert(t('leadError'));
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
        alert(t('leadRejected'));
      }
    } catch (error) {
      alert(`${t('error')}: ${t('leadError')}`);
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
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="w-12 h-12 bg-forest-green rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">{t('adminPanel')}</h1>
              <p className="text-text-muted">{t('realty')}</p>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="px-2 py-1 border border-light-gray rounded text-sm bg-white"
            >
              <option value="ro">🇷🇴 RO</option>
              <option value="ru">🇷🇺 RU</option>
            </select>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
                className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:border-forest-green transition-colors text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-forest-green-light active:scale-95 transition-all font-medium text-base"
            >
              {t('loginButton')}
            </button>
          </form>

          <Link href="/" className="block text-center mt-6 text-forest-green hover:underline text-sm">
            {t('back')}
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
            <h1 className="text-2xl font-bold">{t('adminPanel')}</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="px-3 py-1 border border-white rounded text-sm bg-forest-green text-white cursor-pointer"
              >
                <option value="ro">🇷🇴 RO</option>
                <option value="ru">🇷🇺 RU</option>
              </select>
              <span className="text-sm opacity-90 truncate">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-forest-green rounded-lg hover:bg-light-gray active:scale-95 transition-all font-medium text-sm w-full sm:w-auto"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-light-gray sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 sm:gap-8 min-w-max sm:min-w-full">
          <button
            onClick={() => setTab('dashboard')}
            className={`py-4 px-2 sm:px-4 font-medium border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
              tab === 'dashboard'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-text-muted hover:text-charcoal'
            }`}
          >
            📊 {t('dashboard')}
          </button>
          <button
            onClick={() => setTab('properties')}
            className={`py-4 px-2 sm:px-4 font-medium border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
              tab === 'properties'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-text-muted hover:text-charcoal'
            }`}
          >
            {t('properties')} ({properties.length})
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`py-4 px-2 sm:px-4 font-medium border-b-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
              tab === 'leads'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-text-muted hover:text-charcoal'
            }`}
          >
            {t('leads')} ({leads.filter(l => l.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {tab === 'dashboard' && (
          <>
            <h2 className="text-3xl font-bold text-charcoal mb-8">📊 {t('adminPanel')}</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-forest-green to-forest-green-light rounded-lg p-6 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-2">{t('properties')}</p>
                <p className="text-4xl font-bold">{properties.length}</p>
                <p className="text-xs opacity-75 mt-2">{properties.filter(p => !p.sold).length} {t('available')}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-2">{t('sold')}</p>
                <p className="text-4xl font-bold">{properties.filter(p => p.sold).length}</p>
                <p className="text-xs opacity-75 mt-2">{t('soldUnavailable')}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-2">{t('leads')} {t('pending')}</p>
                <p className="text-4xl font-bold">{leads.filter(l => l.status === 'pending').length}</p>
                <p className="text-xs opacity-75 mt-2">{t('awaitingReview')}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                <p className="text-sm opacity-90 mb-2">👁️ {t('totalViews')}</p>
                <p className="text-4xl font-bold">{properties.reduce((sum, p) => sum + (p.view_count || 0), 0)}</p>
                <p className="text-xs opacity-75 mt-2">{t('acrossAllProperties')}</p>
              </div>
            </div>

            {/* Top Properties by Views */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-charcoal mb-4">👁️ {t('topPropertiesByViews')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-light-gray">
                    <tr>
                      <th className="text-left py-3 px-4 font-bold">{t('title')}</th>
                      <th className="text-left py-3 px-4 font-bold">{t('type')}</th>
                      <th className="text-left py-3 px-4 font-bold">{t('price')}</th>
                      <th className="text-center py-3 px-4 font-bold">👁️ {t('views')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...properties].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5).map((prop) => (
                      <tr key={prop.id} className="border-b border-light-gray hover:bg-light-gray transition">
                        <td className="py-3 px-4 line-clamp-1">{prop.title}</td>
                        <td className="py-3 px-4">{prop.type}</td>
                        <td className="py-3 px-4">{prop.price} EUR</td>
                        <td className="py-3 px-4 text-center font-bold text-forest-green">{prop.view_count || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'properties' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">{t('manageProperties')}</h2>
                <p className="text-sm sm:text-base text-text-muted">{t('total')}: {properties.length} • {properties.filter(p => !p.sold).length} {t('available')}</p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 transition-all font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                {showAddForm ? `✕ ${t('cancel')}` : `+ ${t('addProperty')}`}
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-light-gray">
              <h3 className="font-bold text-charcoal mb-4">{t('filters')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                >
                  <option value="">{t('filterByType')}</option>
                  <option value="casa">{t('house')}</option>
                  <option value="apartament">{t('apartment')}</option>
                  <option value="teren">{t('land')}</option>
                  <option value="comercial">{t('commercial')}</option>
                </select>

                <select
                  value={filterLocality}
                  onChange={(e) => setFilterLocality(e.target.value)}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                >
                  <option value="">{t('filterByLocation')}</option>
                  <option value="Strășeni">Strășeni</option>
                  <option value="Cojușna">Cojușna</option>
                  <option value="Sireți">Sireți</option>
                  <option value="Vatra">Vatra</option>
                  <option value="Lozova">Lozova</option>
                  <option value="Căpriana">Căpriana</option>
                </select>

                <input
                  type="number"
                  placeholder={`${t('filterByPrice')} MIN`}
                  value={filterPriceMin}
                  onChange={(e) => setFilterPriceMin(e.target.value)}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />

                <input
                  type="number"
                  placeholder={`${t('filterByPrice')} MAX`}
                  value={filterPriceMax}
                  onChange={(e) => setFilterPriceMax(e.target.value)}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />

                <button
                  onClick={() => {
                    setFilterType('');
                    setFilterLocality('');
                    setFilterPriceMin('');
                    setFilterPriceMax('');
                    setShowSold(false);
                  }}
                  className="px-3 sm:px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium text-sm sm:text-base transition-all"
                >
                  {t('reset')}
                </button>
              </div>
              <div className="flex gap-4 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSold}
                    onChange={(e) => setShowSold(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm sm:text-base">{t('showSold')}</span>
                </label>
              </div>
            </div>

        {/* Edit Property Modal */}
        {tab === 'properties' && editingId && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-4 sm:mb-6">{t('editProperty')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder={t('title')}
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="px-3 sm:px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-base md:col-span-2"
                />
                <select
                  value={editFormData.type}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as any })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                >
                  <option value="casa">{t('house')}</option>
                  <option value="apartament">{t('apartment')}</option>
                  <option value="teren">{t('land')}</option>
                  <option value="comercial">{t('commercial')}</option>
                </select>
                <select
                  value={editFormData.locality}
                  onChange={(e) => setEditFormData({ ...editFormData, locality: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                >
                  <option value="Strășeni">Strășeni</option>
                  <option value="Cojușna">Cojușna</option>
                  <option value="Sireți">Sireți</option>
                  <option value="Vatra">Vatra</option>
                  <option value="Lozova">Lozova</option>
                  <option value="Căpriana">Căpriana</option>
                </select>
                <input
                  type="text"
                  placeholder={t('address')}
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2 text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder={t('price')}
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder={t('area')}
                  value={editFormData.area}
                  onChange={(e) => setEditFormData({ ...editFormData, area: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder={t('rooms')}
                  value={editFormData.rooms || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, rooms: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder={t('landArea')}
                  value={editFormData.land_area || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, land_area: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder={t('year')}
                  value={editFormData.year || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, year: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <select
                  value={editFormData.condition || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, condition: e.target.value || undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                >
                  <option value="">{t('condition')}</option>
                  <option value="Bună">{t('conditionGood')}</option>
                  <option value="Foarte bună">{t('conditionVeryGood')}</option>
                  <option value="Nouă">{t('conditionNew')}</option>
                  <option value="De renovat">{t('conditionRenovation')}</option>
                </select>
                <input
                  type="text"
                  placeholder={t('heating')}
                  value={editFormData.heating || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, heating: e.target.value || undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
                />
                <input
                  type="url"
                  placeholder={t('videoUrl')}
                  value={editFormData.video_url || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, video_url: e.target.value || undefined })}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2 text-sm sm:text-base"
                />
              </div>
              <textarea
                placeholder={t('description')}
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green w-full mb-6 text-sm sm:text-base"
                rows={3}
              />

              {/* Image Gallery */}
              <div className="mb-6 md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">🖼️ {t('uploadImages')} ({editUploadingImages.length})</label>
                <label className="w-full px-4 py-3 border-2 border-dashed border-forest-green rounded-lg text-sm cursor-pointer text-text-muted hover:text-forest-green hover:bg-light-gray transition-all flex items-center justify-center min-h-12 mb-3">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                  />
                  <span>📁 {t('uploadImages')}</span>
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {editUploadingImages.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded border border-light-gray"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, true)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mb-4 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.sold || false}
                    onChange={(e) => setEditFormData({ ...editFormData, sold: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">{t('markAsSold')}</span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:col-span-2">
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 font-bold transition-all text-sm sm:text-base"
                >
                  ✓ {t('save')}
                </button>
                <button
                  onClick={() => handleDelete(editingId)}
                  className="flex-1 px-4 sm:px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 font-bold transition-all text-sm sm:text-base"
                >
                  {t('delete')}
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 px-4 sm:px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 active:scale-95 font-bold transition-all text-sm sm:text-base"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Property Form */}
        {tab === 'properties' && showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in border-2 border-forest-green">
            <h3 className="text-lg sm:text-xl font-bold text-charcoal mb-4 sm:mb-6">{t('addNewProperty')}</h3>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder={`${t('title')} *`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-base md:col-span-2"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              >
                <option value="casa">{t('house')}</option>
                <option value="apartament">{t('apartment')}</option>
                <option value="teren">{t('land')}</option>
                <option value="comercial">{t('commercial')}</option>
              </select>
              <select
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              >
                <option value="Strășeni">Strășeni</option>
                <option value="Cojușna">Cojușna</option>
                <option value="Sireți">Sireți</option>
                <option value="Vatra">Vatra</option>
                <option value="Lozova">Lozova</option>
                <option value="Căpriana">Căpriana</option>
              </select>
              <input
                type="text"
                placeholder={`${t('address')} *`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2 text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder={`${t('price')} *`}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder={`${t('area')} *`}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder={t('rooms')}
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder={t('landArea')}
                value={formData.land_area}
                onChange={(e) => setFormData({ ...formData, land_area: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder={t('year')}
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              >
                <option value="">{t('condition')}</option>
                <option value="Bună">{t('conditionGood')}</option>
                <option value="Foarte bună">{t('conditionVeryGood')}</option>
                <option value="Nouă">{t('conditionNew')}</option>
                <option value="De renovat">{t('conditionRenovation')}</option>
              </select>
              <input
                type="text"
                placeholder={t('heating')}
                value={formData.heating}
                onChange={(e) => setFormData({ ...formData, heating: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green text-sm sm:text-base"
              />
              <textarea
                placeholder={t('description')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2 text-sm sm:text-base"
                rows={3}
              />
              <input
                type="url"
                placeholder={t('videoUrl')}
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green md:col-span-2 text-sm sm:text-base"
              />

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">🖼️ {t('uploadImages')}</label>
                <label className="w-full px-4 py-3 border-2 border-dashed border-forest-green rounded-lg text-sm cursor-pointer text-text-muted hover:text-forest-green hover:bg-light-gray transition-all flex items-center justify-center min-h-12">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                  />
                  <span>📁 {uploadingImages.length > 0 ? `${uploadingImages.length} imagini` : t('uploadImages')}</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                  {uploadingImages.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded border border-light-gray"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="md:col-span-2 px-4 sm:px-6 py-2 sm:py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green-light active:scale-95 font-medium transition-all text-sm sm:text-base"
              >
                {t('save')}
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-text-muted">Nu au fost găsite proprietăți cu aceste criterii</p>
              </div>
            ) : (
              filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={`bg-white rounded-lg shadow hover:shadow-lg transition-all transform hover:scale-105 p-4 sm:p-6 border-l-4 ${
                    property.sold
                      ? 'border-gray-400 opacity-60'
                      : 'border-forest-green'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <img
                          src={property.image}
                          alt={property.title}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded object-cover flex-shrink-0 ${
                            property.sold ? 'grayscale' : ''
                          }`}
                        />
                        <div className="min-w-0">
                          <h3 className="font-bold text-base sm:text-lg text-charcoal line-clamp-1">{property.title}</h3>
                          <p className="text-xs sm:text-sm text-text-muted truncate">{property.address}</p>
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-text-muted mt-2">
                            <span>📍 {property.locality}</span>
                            <span>💶 {property.price} EUR</span>
                            <span>📏 {property.area}m²</span>
                            {property.rooms && <span>🚪 {property.rooms} {t('rooms')}</span>}
                            {property.video_url && <span>🎥 {t('video')}</span>}
                            <span className="text-forest-green font-medium">👁️ {property.view_count || 0} {t('views')}</span>
                            {property.sold && (
                              <span className="text-gray-500 font-medium">✓ {t('sold')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleEditStart(property)}
                        className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 font-medium transition-all text-sm sm:text-base whitespace-nowrap"
                      >
                        ✏️ {t('edit')}
                      </button>
                      <button
                        onClick={() => handleToggleSold(property.id)}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap ${
                          property.sold
                            ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            : 'bg-forest-green text-white hover:bg-forest-green-light'
                        }`}
                      >
                        {property.sold ? t('available_btn') : t('sold')}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
        )}

        {tab === 'leads' && (
          <div className="space-y-3 sm:space-y-4">
            {leads.filter(l => l.status === 'pending').length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-text-muted">{t('noLeads')}</p>
              </div>
            ) : (
              leads.filter(l => l.status === 'pending').map((lead) => (
                <div key={lead.id} className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-orange-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-sm text-text-muted">{t('property')}</p>
                    <p className="font-bold text-charcoal">{lead.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t('contact')}</p>
                    <p className="font-bold text-charcoal">{lead.contact_name}</p>
                    <p className="text-sm">{lead.contact_phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t('location')}</p>
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
                    ✓ {t('approve')}
                  </button>
                  <button
                    onClick={() => handleRejectLead(lead.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 font-medium transition-all text-sm sm:text-base"
                  >
                    ✕ {t('reject')}
                  </button>
                </div>
                </div>
              ))
            )}
          </div>
        )}

        <Link href="/" className="inline-block mt-8 text-forest-green hover:underline font-medium text-sm sm:text-base">
          {t('back')}
        </Link>
      </div>
    </div>
  );
}
