import json
import os
# from posix import umask
from tqdm import tqdm

def clean_data(raw, id_field = "id"):
    unique_fields = []
    data = raw
    for row in data:
        if row[id_field] not in unique_fields:
            unique_fields.append(row[id_field])
            row["isUnique"] = True
        else:
            row["isUnique"] = False
    unique_entries = [entry for entry in data if entry["isUnique"] == True]
    print(f"{len(unique_entries)} / {len(data)} are unique!")
    return unique_entries

def clean_all(base_dir = "./stanford_test_data"):
    for filepath in os.listdir(base_dir):
        if filepath.endswith(".json"):
            print(f"processing {filepath}...")
            with open(os.path.join(base_dir, filepath), "r") as f:
                raw_data = json.load(f)
            
            if isinstance(raw_data, dict):
                for key in raw_data.keys():
                    cleaned_data = clean_data(raw_data[key])
                    with open(os.path.join(base_dir, f"processed_{key}.json"), "w") as f:
                        json.dump(cleaned_data, f, indent=4)
                    print(f"{key} cleaned!")
                    # print(f"{key} cleaned!")
            else:
                cleaned_data = clean_data(raw_data)
                with open(f"processed_{filepath}", "w") as f:
                    json.dump(cleaned_data, f, indent=4)
                print(f"{filepath} cleaned!")

with open(f"./stanford_test_data/communities.json", "r") as f:
    communities = json.load(f)
with open("./stanford_test_data/users.json", "r") as f:
    user_data = json.load(f)
with open("./stanford_test_data/events.json", "r") as f:
    events = json.load(f)

def creator_ids():
    import random
    user_ids = set([d["id"] for d in user_data])
    diff = creator_ids - user_ids
    print(diff)
    # with open("./stanford_test_data/events.json", "w") as f:
    #     processed_events = []
    #     for event in tqdm(events):
    #         if event["creator_id"] not in user_ids:
    #             print(f"{event["creator_id"]} -> {random.choice(list(user_ids))}")
    #             event["creator_id"] = random.choice(list(user_ids))
    #         processed_events.append(event)
    #     json.dump(processed_events, f, indent = 4)
    #     print("Events updated!")

    # with open("./stanford_test_data/communities.json", "w") as f:
    #     processed_communities = []
    #     for community in tqdm(communities):
    #         if community["creator_id"] not in user_ids:
    #             print(f"{community["creator_id"]} -> {random.choice(list(user_ids))}")
    #             community["creator_id"] = random.choice(list(user_ids))
    #         processed_communities.append(community)
    #     json.dump(processed_events, f, indent = 4)
    #     print("Communities updated!")
    
creator_ids()
    
    