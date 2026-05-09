import json
import urllib.request
import csv

SUPABASE_URL = 'https://bhswnxyakmeiacqyriee.supabase.co'
# I need to read the anon key from core/supabase.js
with open('core/supabase.js', 'r') as f:
    content = f.read()
    anon_key = content.split("SUPABASE_ANON_KEY = '")[1].split("'")[0]

email = "burak.kahraman02@gmail.com"
password = "12345"

def request(method, path, data=None, token=None):
    url = f"{SUPABASE_URL}{path}"
    headers = {
        "apikey": anon_key,
        "Content-Type": "application/json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
        
    req = urllib.request.Request(url, method=method, headers=headers)
    if data:
        req.data = json.dumps(data).encode('utf-8')
        
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        if hasattr(e, 'read'):
            print("Error details:", e.read().decode())
        raise e

print("Logging in...")
auth_resp = request("POST", "/auth/v1/token?grant_type=password", {
    "email": email,
    "password": password
})
token = auth_resp['access_token']
print("Logged in!")

# Get tenant_id from user's profile
print("Fetching profile...")
profiles = request("GET", f"/rest/v1/profiles?id=eq.{auth_resp['user']['id']}&select=tenant_id", token=token)
if not profiles or not profiles[0].get('tenant_id'):
    print("User does not have a tenant linked!")
    # Let's create a tenant and link it
    print("Creating a default tenant...")
    tenant = request("POST", "/rest/v1/tenants", {"name": "Default Tenant", "slug": "default"}, token=token)
    # The REST API POST doesn't return the inserted row by default without Prefer: return=representation
    # We will just fetch it
    # Wait, the python script cannot update the profile if RLS doesn't allow it, but let's try.
    # Actually, let's just insert leads with a dummy tenant ID? No, tenant_id is foreign key to tenants.
    pass

tenant_id = profiles[0].get('tenant_id') if profiles else None

if not tenant_id:
    # Use a dummy tenant ID from state.js or we'll get FK error.
    # We must ensure the tenant_id is valid.
    print("WARNING: No tenant_id found for user. Will try to insert a dummy tenant.")
    req = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/tenants", method="POST", headers={
        "apikey": anon_key, "Authorization": f"Bearer {token}", "Content-Type": "application/json", "Prefer": "return=representation"
    }, data=json.dumps({"name": "Burak's Tenant", "slug": "burak"}).encode())
    try:
        with urllib.request.urlopen(req) as resp:
            t = json.loads(resp.read().decode())
            tenant_id = t[0]['id']
            print("Created tenant:", tenant_id)
            # Link profile
            req2 = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/profiles?id=eq.{auth_resp['user']['id']}", method="PATCH", headers={
                "apikey": anon_key, "Authorization": f"Bearer {token}", "Content-Type": "application/json"
            }, data=json.dumps({"tenant_id": tenant_id}).encode())
            urllib.request.urlopen(req2)
    except Exception as e:
        if hasattr(e, 'read'): print(e.read().decode())
        else: print(e)

if not tenant_id:
    print("Failed to get or create tenant_id. Cannot insert leads.")
    exit(1)

print(f"Using tenant_id: {tenant_id}")

# Read CSV
leads = []
with open('data/leads.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        lead_data = dict(row)
        leads.append({
            "tenant_id": tenant_id,
            "status": row.get('Status') or 'discovery',
            "data": lead_data
        })

print(f"Preparing to insert {len(leads)} leads...")

# Insert in chunks of 50
chunk_size = 50
for i in range(0, len(leads), chunk_size):
    chunk = leads[i:i+chunk_size]
    print(f"Inserting chunk {i//chunk_size + 1}...")
    req = urllib.request.Request(f"{SUPABASE_URL}/rest/v1/leads", method="POST", headers={
        "apikey": anon_key, "Authorization": f"Bearer {token}", "Content-Type": "application/json"
    }, data=json.dumps(chunk).encode('utf-8'))
    try:
        urllib.request.urlopen(req)
    except Exception as e:
        if hasattr(e, 'read'):
            print("Error inserting:", e.read().decode())
            
print("Import complete!")
