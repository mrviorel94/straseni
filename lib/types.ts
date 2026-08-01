export type PropertyType = 'casa' | 'apartament' | 'teren' | 'comercial';
export type LocalityName = string;

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  locality: LocalityName;
  address: string;
  price: number;
  priceLabel?: string;
  area: number;
  rooms?: number;
  landArea?: number;
  image: string;
  images?: string[];
  description: string;
  amenities: string[];
  utilities: Utility[];
  year?: number;
  condition?: string;
  heating?: string;
  roadAccess?: string;
  featured?: boolean;
  badge?: 'Nou' | 'Recomandat' | 'Promovat';
  contact?: Contact;
  slug?: string;
  sold?: boolean;
  video_url?: string | null;
}

export interface Utility {
  name: string;
  available: boolean;
}

export interface Contact {
  name: string;
  phone: string;
  email?: string;
}

export interface Locality {
  slug: string;
  name: string;
  image: string;
  description: string;
  listingsCount: number;
  distance?: string;
  advantages?: string[];
  disadvantages?: string[];
  indicativePrices?: {
    houses?: string;
    apartments?: string;
    land?: string;
  };
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  image: string;
  tags?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}
