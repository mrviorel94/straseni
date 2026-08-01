import { supabase } from './supabase';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'viorel.popa8@gmail.com').split(',').map(e => e.trim());

export async function checkAdminAuth() {
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user?.email) return false;
    return ADMIN_EMAILS.includes(data.session.user.email);
  } catch {
    return false;
  }
}

export async function getAdminUser() {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user?.email || !ADMIN_EMAILS.includes(data.user.email)) return null;
    return data.user;
  } catch {
    return null;
  }
}
