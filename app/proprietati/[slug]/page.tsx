'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';
import PropertyInquiryForm from '@/components/PropertyInquiryForm';
import { Property } from '@/lib/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.json())
      .then(data => {
        const found = data.find((p: Property) => p.slug === slug);
        setProperty(found || null);
        setLoading(false);

        if (found) {
          fetch(`/api/properties/${found.id}/view`, { method: 'POST' }).catch(console.error);
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-light-gray animate-pulse" />;
  if (!property) return <div className="min-h-screen flex items-center"><h1>Nu găsit</h1></div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white to-light-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/proprietati" className="text-forest-green mb-6 inline-block">← Înapoi</Link>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 bg-light-gray">
            {property.video_url ? (
              <div className="space-y-4">
                <iframe
                  width="100%"
                  height="500"
                  src={property.video_url}
                  title="Property Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
                <ImageCarousel images={property.images || [property.image]} title={property.title} sold={property.sold} />
              </div>
            ) : (
              <ImageCarousel images={property.images || [property.image]} title={property.title} sold={property.sold} />
            )}
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className={`text-3xl font-bold mb-4 ${property.sold ? 'text-gray-400' : 'text-charcoal'}`}>{property.title}</h1>
                <p className={`text-lg mb-4 ${property.sold ? 'text-gray-400' : 'text-text-muted'}`}>📍 {property.address}</p>
                <div className={`text-3xl font-bold mb-8 ${property.sold ? 'text-gray-400' : 'text-forest-green'}`}>{property.priceLabel}</div>
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-light-gray">
                  <div className="text-center"><div className={`text-2xl font-bold ${property.sold ? 'text-gray-400' : 'text-forest-green'}`}>{property.area}</div><div className="text-sm">mp</div></div>
                </div>
                <p className={`${property.sold ? 'text-gray-400' : 'text-text-muted'}`}>{property.description}</p>
              </div>
              <div className="space-y-6">
                <div className={`p-6 rounded-lg shadow-lg ${property.sold ? 'bg-gray-100' : 'bg-forest-green text-white'}`}>
                  <h3 className="text-xl font-bold mb-6">{property.sold ? 'VÂNDUT' : 'Contact direct'}</h3>
                  {!property.sold && property.contact && <><p className="font-bold mb-3">{property.contact.name}</p><a href={`tel:${property.contact.phone}`} className="block w-full bg-white text-forest-green px-4 py-3 rounded-lg font-bold text-center">📞 Apelează</a></>}
                </div>
                {!property.sold && <PropertyInquiryForm propertyTitle={property.title} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}