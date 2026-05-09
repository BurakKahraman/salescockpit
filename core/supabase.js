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
 * Sign in with Email and Password
 * @param {string} email
 * @param {string} password
 */
export async function signInWithPassword(email, password) {
  const sb = await getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign up new Venue Admin (For future registration flow)
 */
export async function signUp(email, password) {
  const sb = await getSupabase();
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const sb = await getSupabase();
  await sb.auth.signOut();
}

import { get } from './state.js';

export const db = {
  // Leads API
  async getLeads() {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('leads').select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async createLead(lead) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('leads')
      .insert([{ ...lead, tenant_id: tenantId }])
      .select();
    if (error) throw error;
    return data[0];
  },
  async upsertLead(lead) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('leads')
      .upsert({ ...lead, tenant_id: tenantId })
      .select();
    if (error) throw error;
    return data[0];
  },

  // Tasks API
  async getTasks() {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('tasks').select('*, leads(data)')
      .eq('tenant_id', tenantId)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data;
  },
  async updateTask(id, updates) {
    const client = await getSupabase();
    const { data, error } = await client.from('tasks').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  },

  // Tenant Config API
  async getTenantConfig() {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') return null;
    const { data, error } = await client.from('tenants').select('pricing, templates, stages, config, name, email').eq('id', tenantId).single();
    if (error) throw error;
    return data;
  },
  
  async updateTenantConfig(updates) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') return null;
    const { data, error } = await client.from('tenants').update(updates).eq('id', tenantId).select();
    if (error) throw error;
    return data[0];
  }
};

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
