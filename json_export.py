import json
import psycopg2
from pathlib import Path

# PostgreSQL connection details
host = 'evchargerdb.cjlsbfswobs8.us-east-1.rds.amazonaws.com'
database = 'evchargerinst'
user = 'postgres'
password = 'charger2024'
port = '5432'

# File path for JSON export
JSON_FILE = Path("data/tristate_northeast.json")

# Connect to PostgreSQL
conn = psycopg2.connect(
    host=host,
    database=database,
    user=user,
    password=password,
    port=port
)
query = 'SELECT * FROM "evChargers".tristate_northeast_v;'

# Execute query and fetch results
cur = conn.cursor()
cur.execute(query)
rows = cur.fetchall()

# Convert rows to JSON
data = []
for row in rows:
    data.append(dict(zip([col[0] for col in cur.description], row)))

# Write JSON data to file
with open(JSON_FILE, "w") as json_file:
    json.dump(data, json_file, indent=4)

# Close cursor and connection
cur.close()
conn.close()
