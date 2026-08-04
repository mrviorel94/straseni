import { supabase } from '@/lib/supabase';
import { mockProperties } from '@/lib/mockData';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(mockProperties);
    }

    if (!data || data.length === 0) {
      return NextResponse.json(mockProperties);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Properties API error:', error);
    return NextResponse.json(mockProperties);
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    let token = authHeader?.replace('Bearer ', '');

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get('sb-token')?.value;
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || 'viorel.popa8@gmail.com').split(',').map(e => e.trim());
    if (!adminEmails.includes(user.email)) {
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
        view_count: 0,
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
