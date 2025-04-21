import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import math
from tqdm import tqdm
import random

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

# ====================== helpers =================================
def verify_uniqueness(data, field):
    unique_entries = []
    seen_fields = []
    for entry in data:
        if entry[field] not in seen_fields:
            unique_entries.append(entry)
            seen_fields.append(entry[field])
    print(len(unique_entries) / len(data))
    return unique_entries


# for communities (2)
def generate_creator_id(data):
    import random
    users = load_data(filepath_dict["users"])
    user_ids = list(map(lambda x: x["user_id"], users))
    updated_data = [
        {**community, "creator_id" : random.choice(user_ids)}
        for community in data
    ]
    return updated_data

def generate_community_id(data):
    import random
    communities = load_data("processed_data\communities.json")
    community_ids = list(map(lambda x: x["id"], communities))
    updated_data = [
        {**event, "community_id" : random.choice(community_ids)}
        for event in data
    ]
    return updated_data

def generate_id(data, fp, target_id):
    import random
    source = load_data(fp)
    source_ids = list(map(lambda x: x["id"], source))
    updated_data = [
        {**event, "target_id" : random.choice(source_ids)}
        for event in data
    ]
    return updated_data

# copy over community_id, creator_id
def prepare_events(raw_events):
    # with creator ids
    events = generate_creator_id(raw_events)
    print(f">> creator_id generated!")
    events = generate_community_id(events)
    print(f">> community_id generated!")
    return events

# ====================== insert into tables ========================
# users✅ -> communities✅ -> events✅ -> chats✅ -> rsvps

# rsvps (4)
def insert_rsvps():
    template = {
        "user_id": "cdf4df81-6341-4be6-8c4f-7cff3353459b",
        "event_id": "86b36f73-39ec-47ef-abc4-82ee8b37cbde",
        "created_at": "2025-04-21T00:07:48.378929"
    }
    user_ids = [user["user_id"] for user in load_data("stanford_test_data/users.json")]
    event_ids = [event["id"] for event in load_data("stanford_test_data/events.json")]
    new_data = [
        {**entry, 'user_id': random.choice(user_ids), 'event_id': random.choice(event_ids)}
        for entry in load_data("stanford_test_data/rsvps.json")
    ]
    with open("processed_data/rsvps.json", "w") as f:
        json.dump(new_data, f, indent = 4)
    print(">> rsvps loaded from filepath")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(new_data), batch_size)):
            batch = new_data[i:i + batch_size]
            response = supabase.table("rsvps").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")
    
# events (3) 
def insert_chats():
    chats = load_data(filepath_dict["chats"])
    print(">> chats loaded from filepath")
    chats = generate_id(chats, "stanford_test_data/events.json", "event_id")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(chats), batch_size)):
            batch = chats[i:i + batch_size]
            response = supabase.table("chats").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")

# events (3) 
def insert_events():
    events = load_data(filepath_dict["events"])
    print(">> events loaded from filepath")
    events = prepare_events(events)
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(events), batch_size)):
            batch = events[i:i + batch_size]
            response = supabase.table("events").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")

# insert communities (1)
def insert_communities():
    users = load_data(filepath_dict["communities"])
    users = verify_uniqueness(users, "name")
    users = generate_creator_id(users)
    with open("./processed_data/communities.json", "w") as f:
        json.dump(users, f, indent = 4)
        print(">> wrote to processed file!")
    # print(">> communities loaded from filepath")
    def batch_insert(batch_size = 500):
        for i in tqdm(range(0, len(users), batch_size)):
            batch = users[i:i + batch_size]
            response = supabase.table("communities").insert(batch).execute()
            print(response)
    batch_insert()
    print(">> all inserted!")

# insert users into `users` table -- done (1)
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


# ================================ call fns here ==============================
import os
if not os.path.exists("processed_data"):
    os.makedirs("processed_data")

# insert_communities()
# insert_events()
# insert_chats()
insert_rsvps()
