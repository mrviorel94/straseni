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
  land_area?: number;
  image: string;
  images?: string[];
  description: string;
  amenities: string[];
  utilities: Utility[];
  year?: number;
  condition?: string;
  heating?: string;
  road_access?: string;
  featured?: boolean;
  badge?: 'Nou' | 'Recomandat' | 'Promovat';
  contact?: Contact;
  contact_name?: string;
  contact_phone?: string;
  slug?: string;
  sold?: boolean;
  video_url?: string | null;
  view_count?: number;
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
