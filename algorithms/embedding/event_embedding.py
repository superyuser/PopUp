from supabase import create_client, Client
import json
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

load_dotenv()

#  ======================== initialize embedding model ============================
model = SentenceTransformer('BAAI/bge-small-en-v1.5')

#  ============================= initialize supabase ===============================
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY"))


# ============================ fetch =================================================

# fetch k_latest events from supabase globally
def fetch_latest_events(k_latest = 100):
    data, _ = supabase.table('events').select("*").order("created_at", desc = True).limit(k_latest).execute()
    if data:
        return data[1] # ( response, data )
    else:
        print("😭 failed to fetch events!")

events = fetch_latest_events()
with open("events_100_latest.json", "w") as f:
    json.dump(events, f, indent = 4)
print("ok!")


# ============================== embedding ====================================
sample = {
        "id": "9841a477-e175-491b-892c-acc7219178fc",
        "community_id": "d512e2ad-f538-4a60-b400-83e04684d4c3",
        "name": "Open Mic @ Campus Lawn",
        "description": "Come join a high-energy study session for Stanford undergrads.",
        "tags": [
            "tech",
            "creative"
        ],
        "address": "Studio 2",
        "start_time": "2025-05-02T17:07:48.376822+00:00",
        "end_time": "2025-05-02T18:07:48.376822+00:00",
        "created_at": "2025-04-21T00:07:48.376834+00:00",
        "creator_id": "f15ee965-18ae-42da-993c-887486dd0ec7"
    }

# padding for embedddings (1536)
def pad_embedding(embedding, target_dim):
    return embedding + [0.0] * (target_dim - len(embedding))

# generate embedding for single event
def generate_embedding(event, target_dim = 1536, model = model):
    summary = f"{event['name']} is planned to be a {' and '.join(event['tags'])} event: {event['description']}"
    print(f"summary: {summary}")
    embedding = model.encode(summary).tolist()
    print(">> embedding ready.")
    return pad_embedding(embedding, target_dim)

# ============================================== prepopulating all events with embedding ======================

data_filepath = "../../database/processed_data/events_retrieved.json"

def prepopulate_embeddings():
    with open(data_filepath, "r") as f:
        events = json.load(f)
    events_embedded = [
        {
            **event, "embedding": generate_embedding(event)
        }
        for event in events
    ]
    response = supabase.table("events").upsert(events_embedded, on_conflict = "id").execute()
    if response.error:
        print("😭", response.error)
    else:
        print(" >> upsert successful.")

embed = generate_embedding(sample)
print(embed)