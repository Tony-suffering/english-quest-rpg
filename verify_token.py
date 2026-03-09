import urllib.request
import json
import os

TOKEN = "zdNbC6G9GwbsdHc-FX2rbRRf1NYH-5RR5IwRsJ79"

req = urllib.request.Request(
    "https://api.cloudflare.com/client/v4/user/tokens/verify",
    headers={"Authorization": f"Bearer {TOKEN}"}
)

try:
    with urllib.request.urlopen(req) as response:
        data = json.load(response)
        print("Response:", json.dumps(data, indent=2))
        if data.get("success"):
            print("Token is VALID")
        else:
            print("Token is INVALID")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} {e.reason}")
    print(e.read().decode())
except Exception as e:
    print(f"Error: {e}")
