
import argparse
import json
import os
import time
import re
from typing import Dict, List
import requests
from dotenv import load_dotenv

load_dotenv()
API_URL = "https://api.calorieninjas.com/v1/nutrition"

#load preset items
def load_json(path: str) -> Dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def normalize_name(s: str) -> str:
    # Case-insensitive, collapse whitespace, strip punctuation commonly seen
    s = s.strip().lower()
    s = re.sub(r"[_\-]+", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s


def build_batches(items, qty=1, max_query_len=300, max_items_per_batch=10):
    """
    Build comma-separated batches like '1 apple, 1 banana, ...' while
    keeping each batch under both a length limit and max item count.
    """
    batches, cur, cur_len = [], [], 0
    for name in items:
        token = f"{qty} {name}".strip()
        extra = (2 if cur else 0) + len(token)  # +2 for ", "
        # finalize this batch if we'd exceed either limit
        if cur and (cur_len + extra > max_query_len or len(cur) >= max_items_per_batch):
            batches.append(", ".join(cur))
            cur, cur_len = [token], len(token)
        else:
            cur.append(token)
            cur_len += extra if cur_len else len(token)
    if cur:
        batches.append(", ".join(cur))
    return batches


def fetch_batch(query: str, api_key: str, timeout: int = 30) -> List[Dict]:
    headers = {"X-Api-Key": api_key}
    resp = requests.get(API_URL, headers=headers, params={"query": query}, timeout=timeout)
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and isinstance(data.get("items"), list):
        return data["items"]
    return []

def update_item_direct(meta_obj: Dict, api_row: Dict) -> None:
    # Write the fields *directly* in the shape used by your meta-data.json
    meta_obj["calories"] = api_row.get("calories")
    meta_obj["serving size"] = api_row.get("serving_size_g")
    
    # Delete old key if present
    if "nutrients" in meta_obj:
        del meta_obj["nutrients"]
    meta_obj["macros"] = {
        "carbs": api_row.get("carbohydrates_total_g"),
        "protein": api_row.get("protein_g"),
        "fat": api_row.get("fat_total_g"),
    }
    meta_obj["micros"] = {
        "cholesterol": api_row.get("cholesterol_mg"),
        "sodium": api_row.get("sodium_mg"),
        "potassium": api_row.get("potassium_mg"),
        "fiber": api_row.get("fiber_g"),
        "sugar": api_row.get("sugar_g"),
    }

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default="../src/data/meta-data.json", help="Path to meta-data.json")
    ap.add_argument("--qty", type=int, default=1, help="Quantity to prefix before each item name")
    args = ap.parse_args()

    api_key = os.getenv("CALORIE_NINJAS_API_KEY")
    if not api_key:
        raise SystemExit(f"Missing API key. Please export {"CALORIE_NINJAS_API_KEY"}=<your_key>")

    meta = load_json(args.input)
    item_names = list(meta.keys())
    if len(item_names) > 48:
        item_names = item_names[:48]

    print(f"[i] Processing {len(item_names)} items...")

    # Build map for name matching
    normalized_to_item = {normalize_name(n): n for n in item_names}

    # Fetch in batches
    batches = build_batches(item_names, qty=args.qty)
    matched = set()
    for idx, q in enumerate(batches, 1):
        print(f"[i] Fetching batch {idx}/{len(batches)}")
        rows = fetch_batch(q, api_key=api_key)
        for row in rows:
            api_name_norm = normalize_name(row.get("name", ""))
            # exact or naive singular form
            target_key = normalized_to_item.get(api_name_norm) or normalized_to_item.get(api_name_norm.rstrip("s"))
            if not target_key:
                continue
            update_item_direct(meta[target_key], row)
            matched.add(target_key)

    # Warn for unmatched
    unmatched = [n for n in item_names if n not in matched]
    if unmatched:
        print(f"[!] Unmatched items ({len(unmatched)}): " + ", ".join(unmatched[:10]) + (" ..." if len(unmatched) > 10 else ""))

    # Save file
    with open(args.input, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print(f"[✓] Updated {args.input}")

if __name__ == "__main__":
    main()