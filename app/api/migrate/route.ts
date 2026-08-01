import { supabase } from '@/lib/supabase';
import { mockProperties } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const migratedData = await Promise.all(
      mockProperties.map(async (prop) => {
        const { error, data } = await supabase
          .from('properties')
          .insert({
            slug: prop.slug,
            title: prop.title,
            type: prop.type,
            locality: prop.locality,
            address: prop.address,
            price: prop.price,
            area: prop.area,
            rooms: prop.rooms || null,
            land_area: prop.landArea || null,
            image: prop.image,
            images: prop.images,
            description: prop.description,
            amenities: prop.amenities,
            utilities: prop.utilities,
            year: prop.year || null,
            condition: prop.condition,
            heating: prop.heating || null,
            road_access: prop.roadAccess || null,
            featured: prop.featured,
            badge: prop.badge || null,
            contact_name: prop.contact?.name || 'Contact',
            contact_phone: prop.contact?.phone || '+373 69 000 000',
            sold: prop.sold || false,
          })
          .select();

        if (error) {
          console.error(`Error migrating ${prop.slug}:`, error);
          return { slug: prop.slug, success: false, error: error.message };
        }

        return { slug: prop.slug, success: true, id: data?.[0]?.id };
      })
    );

    const successful = migratedData.filter((d) => d.success).length;
    const failed = migratedData.filter((d) => !d.success).length;

    return Response.json({
      success: failed === 0,
      message: `Migrated ${successful}/${mockProperties.length} properties`,
      details: migratedData,
      failed,
    });
  } catch (error) {
    console.error('Migration error:', error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
