import pg8000
import ssl

def run_sql():
    regions = [
        "eu-central-1", "eu-west-1", "eu-west-2", "eu-west-3", 
        "us-east-1", "us-east-2", "us-west-1", "us-west-2"
    ]
    
    port = 6543
    user = "postgres.bhswnxyakmeiacqyriee"
    password = "Kuleli4353"
    database = "postgres"
    
    with open("data/supabase_schema.sql", "r") as f:
        sql = f.read()

    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    for region in regions:
        host = f"aws-0-{region}.pooler.supabase.com"
        print(f"Trying {host}...")
        try:
            conn = pg8000.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database,
                ssl_context=ssl_context,
                timeout=5
            )
            print(f"Connected to {region}! Executing schema...")
            conn.autocommit = True
            cursor = conn.cursor()
            cursor.execute(sql)
            print("Schema execution successful.")
            return
        except Exception as e:
            print(f"Failed: {e}")

if __name__ == "__main__":
    run_sql()
