import json
import supabase

with open("stanford_test_data/stanford_communities_and_events.json", "r") as f:
    events = json.load(f)

print(events)