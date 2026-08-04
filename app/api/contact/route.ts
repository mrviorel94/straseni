import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { name, email, phone, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject: subject || 'Contact form submission',
          message,
          created_at: new Date().toISOString(),
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact form' },
        { status: 500 }
      );
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    if (adminEmails.length > 0) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'contact@imobiliare-straseni.ro',
            to: adminEmails,
            subject: `Mesaj nou: ${subject || 'Contact form submission'}`,
            html: `
              <h2>Mesaj nou din formularul de contact</h2>
              <p><strong>Nume:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
              <p><strong>Subiect:</strong> ${subject}</p>
              <p><strong>Mesaj:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
          }),
        });
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
