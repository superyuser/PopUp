import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import math
from tqdm import tqdm

load_dotenv()

filepath_dict = {
    "communities": "stanford_test_data/communities.json",
    "events": "stanford_test_data/events.json",
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

# ====================== insert into tables ========================

def insert_chats():
    chats = load_data(filepath_dict["chats"])
    print(">> chats loaded from filepath")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(chats), batch_size)):
            batch = chats[i:i + batch_size]
            response = supabase.table("chats").insert(batch).execute()
            # print(response)
    batch_insert()
    print(">> all inserted!")

# def process_communities(batch):
#     batch = map(lambda x: {
#         'id': x['community_id'],
#         'name': x['name'],
#         'bio': x['description'],
#         'tags': x['tags'],
#         'address': x['address'],
#         'start_time': x['start_time'],
#         'end_time': x['end_time'],
#         'created_at': x['created_at'],
#         'creator_id': x['creator_id']
#     }, batch)
#     return list(batch)
def verify_uniqueness(data, field):
    unique_entries = []
    seen_fields = []
    for entry in data:
        if entry[field] not in seen_fields:
            unique_entries.append(entry)
            seen_fields.append(entry[field])
    print(len(unique_entries) / len(data))
    return unique_entries

def generate_creator_id(data):
    import random
    users = load_data(filepath_dict["communities"])
    user_ids = list(map(lambda x: x["user_id"], users))
    return map(lambda x: x["creator_id"] = random.choice(user_ids), data)


def insert_communities():
    users = load_data(filepath_dict["communities"])
    users = verify_uniqueness(users, "name")
    # users = process_communities(users)
    print(">> communities loaded from filepath")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(users), batch_size)):
            batch = users[i:i + batch_size]
            response = supabase.table("communities").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")

insert_communities()

# insert users into `users` table -- done
def insert_users():
    users = load_data(filepath_dict["users"])
    print(">> users loaded from filepath")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(users), batch_size)):
            batch = users[i:i + batch_size]
            response = supabase.table("users").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")
