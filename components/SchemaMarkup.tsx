import { Property } from '@/lib/types';

export function PropertySchema({ property }: { property: Property }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Imobiliare Strășeni',
    url: 'https://imobiliarestrraseni.com',
    telephone: '+373 69 000 000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strășeni',
      addressLocality: 'Strășeni',
      addressRegion: 'Strășeni',
      postalCode: '3900',
      addressCountry: 'MD',
    },
    sameAs: [
      'https://facebook.com/imobiliarestrraseni',
      'https://instagram.com/imobiliarestrraseni',
    ],
    makesOffer: {
      '@type': 'Offer',
      '@id': `https://imobiliarestrraseni.com/proprietati/${property.slug}`,
      priceCurrency: 'EUR',
      price: property.price,
      availability: property.sold ? 'https://schema.org/Discontinued' : 'https://schema.org/InStock',
      description: property.description,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Imobiliare Strășeni',
    url: 'https://imobiliarestrraseni.com',
    logo: 'https://imobiliarestrraseni.com/logo.png',
    description: 'Platforma imobiliară pentru proprietăți în raionul Strășeni',
    sameAs: [
      'https://facebook.com/imobiliarestrraseni',
      'https://instagram.com/imobiliarestrraseni',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+373 69 000 000',
      email: 'contact@imobiliarestrraseni.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strășeni',
      addressLocality: 'Strășeni',
      addressRegion: 'Strășeni',
      postalCode: '3900',
      addressCountry: 'MD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://imobiliarestrraseni.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
