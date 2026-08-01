import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const { id } = await params;

    const { error } = await supabase
      .from('properties')
      .update({
        title: body.title,
        type: body.type,
        locality: body.locality,
        address: body.address,
        price: body.price,
        area: body.area,
        rooms: body.rooms,
        land_area: body.land_area,
        image: body.image,
        images: body.images || [],
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating property:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || 'viorel.popa8@gmail.com').split(',').map(e => e.trim());
    if (!adminEmails.includes(session.session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting property:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
