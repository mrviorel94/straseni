import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from('leads')
      .insert({
        title: body.title,
        type: body.type,
        locality: body.locality,
        address: body.address,
        price: body.price ? Number(body.price) : null,
        area: body.area ? Number(body.area) : null,
        description: body.description,
        contact_name: body.contact_name,
        contact_phone: body.contact_phone,
        contact_email: body.contact_email,
        status: 'pending',
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Proprietatea adăugată. Admin va reveni în curând.' });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || 'viorel.popa8@gmail.com').split(',').map(e => e.trim());
    if (!adminEmails.includes(session.session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
