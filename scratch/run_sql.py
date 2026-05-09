import pg8000
import ssl

def run_sql():
    # Connection details
    host = "aws-0-eu-central-1.pooler.supabase.com"
    port = 6543
    user = "postgres.bhswnxyakmeiacqyriee"
    password = "Kuleli4353"
    database = "postgres"

    print("Connecting to database...")
    
    # Read the SQL file
    with open("data/supabase_schema.sql", "r") as f:
        sql = f.read()

    try:
        # Create SSL context
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # Connect
        conn = pg8000.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database,
            ssl_context=ssl_context
        )
        
        print("Connected! Executing schema...")
        
        conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute(sql)
        print("Schema execution successful.")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    run_sql()
