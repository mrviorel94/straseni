import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          slug: string;
          title: string;
          type: string;
          locality: string;
          address: string;
          price: number;
          area: number;
          rooms: number | null;
          land_area: number | null;
          image: string;
          images: string[];
          description: string;
          amenities: string[];
          utilities: { name: string; available: boolean }[];
          year: number | null;
          condition: string;
          heating: string | null;
          road_access: string | null;
          featured: boolean;
          badge: string | null;
          contact_name: string;
          contact_phone: string;
          sold: boolean;
          video_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          property_id: string;
          name: string;
          phone: string;
          email: string | null;
          message: string | null;
          created_at: string;
        };
      };
      leads: {
        Row: {
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
      };
    };
  };
};
