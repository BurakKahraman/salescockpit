import pg8000
import ssl

def test_passwords():
    # Only test eu-central-1 and eu-west-1
    regions = ["eu-central-1", "eu-west-1"]
    port = 6543
    user = "postgres.bhswnxyakmeiacqyriee"
    database = "postgres"
    
    passwords = ["Kuleli4353", "Kule4353", "12345"]
    
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    for region in regions:
        host = f"aws-0-{region}.pooler.supabase.com"
        for pwd in passwords:
            print(f"Trying {host} with password {pwd}...")
            try:
                conn = pg8000.connect(
                    host=host,
                    port=port,
                    user=user,
                    password=pwd,
                    database=database,
                    ssl_context=ssl_context,
                    timeout=5
                )
                print(f"✅ SUCCESS on {region} with password {pwd}!")
                
                # Execute schema
                with open("data/supabase_schema.sql", "r") as f:
                    sql = f.read()
                conn.autocommit = True
                cursor = conn.cursor()
                cursor.execute(sql)
                print("Schema execution successful.")
                return
            except Exception as e:
                print(f"Failed: {e}")

if __name__ == "__main__":
    test_passwords()
