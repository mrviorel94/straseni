import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Properties API error:', error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || 'viorel.popa8@gmail.com').split(',').map(e => e.trim());
    if (!adminEmails.includes(session.session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();

    const { error } = await supabase
      .from('properties')
      .insert({
        slug: body.slug,
        title: body.title,
        type: body.type,
        locality: body.locality,
        address: body.address,
        price: body.price,
        area: body.area,
        rooms: body.rooms,
        land_area: body.land_area,
        image: body.image,
        images: body.images,
        description: body.description,
        amenities: body.amenities || [],
        utilities: body.utilities || [],
        year: body.year,
        condition: body.condition,
        heating: body.heating,
        road_access: body.road_access,
        featured: body.featured || false,
        badge: body.badge,
        contact_name: body.contact_name,
        contact_phone: body.contact_phone,
        sold: body.sold || false,
        video_url: body.video_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating property:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
