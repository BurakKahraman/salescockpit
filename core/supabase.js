/* ══════════════════════════════════════════════════════════
 * SalesCockpit — core/supabase.js
 * Supabase client wrapper (EU Frankfurt)
 * ══════════════════════════════════════════════════════════ */

const SUPABASE_URL      = 'https://bhswnxyakmeiacqyriee.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc3dueHlha21laWFjcXlyaWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzg5MTAsImV4cCI6MjA5Mzg1NDkxMH0.XVRz2NUV0eirjhdhoyyPYpjbUcvNqIvNibUYQOZ8MeY';

let _supabase = null;

export async function getSupabase() {
  if (_supabase) return _supabase;
  if (!window.supabase) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

export async function getUser() {
  const sb = await getSupabase();
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

export async function signInWithPassword(email, password) {
  const sb = await getSupabase();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password) {
  const sb = await getSupabase();
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const sb = await getSupabase();
  await sb.auth.signOut();
}

export function onAuthStateChange(callback) {
  getSupabase().then(sb => sb.auth.onAuthStateChange(callback));
}

import { get } from './state.js';

export const db = {

  /* ── TENANT ── */
  async getTenant() {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') return null;
    const { data, error } = await client.from('tenants').select('*').eq('id', tenantId).single();
    if (error) throw error;
    return data;
  },

  async updateTenant(updates) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    if (!tenantId || tenantId === '00000000-0000-0000-0000-000000000000') return null;
    const { data, error } = await client.from('tenants').update(updates).eq('id', tenantId).select().single();
    if (error) throw error;
    return data;
  },

  /* ── LEADS ── */
  async getLeads(statusFilter = null) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    let q = client.from('leads').select('*').eq('tenant_id', tenantId).order('created_at', { ascending: false });
    if (statusFilter) q = q.eq('status', statusFilter);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  },

  async createLead(lead) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('leads').insert([{ ...lead, tenant_id: tenantId }]).select();
    if (error) throw error;
    return data[0];
  },

  async updateLead(id, updates) {
    const client = await getSupabase();
    const { data, error } = await client.from('leads').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select();
    if (error) throw error;
    return data[0];
  },

  async upsertLead(lead) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('leads').upsert({ ...lead, tenant_id: tenantId }).select();
    if (error) throw error;
    return data[0];
  },

  async deleteLead(id) {
    const client = await getSupabase();
    const { error } = await client.from('leads').delete().eq('id', id);
    if (error) throw error;
  },

  /* ── TASKS ── */
  async getTasks() {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client
      .from('tasks').select('*, leads(data)')
      .eq('tenant_id', tenantId)
      .eq('status', 'todo')
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createTask(task) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client.from('tasks').insert([{ ...task, tenant_id: tenantId }]).select();
    if (error) throw error;
    return data[0];
  },

  async updateTask(id, updates) {
    const client = await getSupabase();
    const { data, error } = await client.from('tasks').update(updates).eq('id', id).select();
    if (error) throw error;
    return data[0];
  },

  async deleteTask(id) {
    const client = await getSupabase();
    const { error } = await client.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },

  /* ── SEARCH ── */
  async searchLeads(query) {
    const client = await getSupabase();
    const tenantId = get('tenant')?.id;
    const { data, error } = await client
      .from('leads').select('*')
      .eq('tenant_id', tenantId)
      .or(`data->>Name.ilike.%${query}%,data->>Email.ilike.%${query}%,data->>Phone.ilike.%${query}%`)
      .limit(8);
    if (error) throw error;
    return data;
  }
};

export { SUPABASE_URL, SUPABASE_ANON_KEY };
