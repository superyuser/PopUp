import os
import json
# from unicodedata import bidirectional
from supabase import create_client, Client
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))

def fetch(name: str) -> list:
    all_rows = []
    page_size = 1000
    page = 0
    while True:
        start_index = page * page_size
        end_index = (page + 1) * page_size - 1
        response = supabase.table(name).select("*").range(start_index, end_index).execute()
        if response.data:
            all_rows.extend(response.data)
            print(f"added >> {page_size * (page + 1)} in total to >> {name}")
        else:
            break
        if len(response.data) < page_size:
            break 
        page += 1
    with open(f"./processed_data/{name}_retrieved.json", "w") as f:
        json.dump(all_rows, f, indent = 4)
    print(f">> {name} retrieved!")

for table in ["chats", "communities", "events", "rsvps", "users"]:
    fetch(table)