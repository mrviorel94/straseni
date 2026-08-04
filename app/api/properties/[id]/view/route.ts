import { supabase } from '@/lib/supabase';
import { mockProperties } from '@/lib/mockData';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    const { data, error } = await supabase
      .from('properties')
      .select('view_count')
      .eq('id', propertyId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }

    const currentViews = data.view_count || 0;

    const { error: updateError } = await supabase
      .from('properties')
      .update({ view_count: currentViews + 1 })
      .eq('id', propertyId);

    if (updateError) {
      console.error('View tracking error:', updateError);
      return NextResponse.json(
        { success: false, message: 'Failed to track view' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, view_count: currentViews + 1 });
  } catch (error) {
    console.error('View tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
