import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import math
from tqdm import tqdm

load_dotenv()

filepath_dict = {
    # "communities": "stanford_test_data/communities.json",
    # "events": "stanford_test_data/events.json",
    "rsvps": "stanford_test_data/rsvps.json",
    "users": "stanford_test_data/users.json",
    "chats": "stanford_test_data/chats.json"
}

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))

# load data from filepath
def load_data(fp):
    with open(fp, "r") as f:
        data = json.load(f)
    return data

users = load_data(filepath_dict["users"])
print(users[0])
response = supabase.table("users").insert(users[0]).execute()
print(response)