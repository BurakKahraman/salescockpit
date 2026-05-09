import psycopg2

def run():
    host = "db.bhswnxyakmeiacqyriee.supabase.co"
    port = 5432
    user = "postgres"
    database = "postgres"
    
    passwords = ["Kuleli4353", "Kule4353", "12345"]
    
    with open("data/supabase_schema.sql", "r") as f:
        sql = f.read()
        
    for pwd in passwords:
        print(f"Trying direct connection to {host} with password {pwd}...")
        try:
            conn = psycopg2.connect(
                host=host,
                port=port,
                user=user,
                password=pwd,
                dbname=database,
                connect_timeout=5
            )
            print("✅ SUCCESS!")
            conn.autocommit = True
            cursor = conn.cursor()
            cursor.execute(sql)
            print("Schema execution successful.")
            return
        except Exception as e:
            print(f"Failed: {e}")

if __name__ == "__main__":
    run()
