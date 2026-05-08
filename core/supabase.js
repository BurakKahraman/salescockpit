/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/supabase.js
 * Supabase client wrapper (EU Frankfurt)
 * ══════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://bhswnxyakmeiacqyriee.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc3dueHlha21laWFjcXlyaWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzg5MTAsImV4cCI6MjA5Mzg1NDkxMH0.XVRz2NUV0eirjhdhoyyPYpjbUcvNqIvNibUYQOZ8MeY';

let _supabase = null;

/**
 * Initialize Supabase client (lazy, loads CDN if needed)
 * @returns {Promise<object>} Supabase client
 */
export async function getSupabase() {
  if (_supabase) return _supabase;

  // Load Supabase JS from CDN if not already loaded
  if (!window.supabase) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

/**
 * Get current authenticated user (or null)
 */
export async function getUser() {
  const sb = await getSupabase();
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

/**
 * Sign in with magic link
 * @param {string} email
 */
export async function signInWithMagicLink(email) {
  const sb = await getSupabase();
  const { error } = await sb.auth.signInWithOtp({ email });
  if (error) throw error;
  return true;
}

/**
 * Sign out
 */
export async function signOut() {
  const sb = await getSupabase();
  await sb.auth.signOut();
}

/**
 * Listen to auth state changes
 * @param {Function} callback - (event, session) => void
 */
export function onAuthStateChange(callback) {
  getSupabase().then(sb => {
    sb.auth.onAuthStateChange(callback);
  });
}

export { SUPABASE_URL, SUPABASE_ANON_KEY };
