import os
import json
import hashlib
import hmac
import datetime
import urllib.request
import urllib.error

# Load Config
with open('.r2-config.json', 'r') as f:
    config = json.load(f)['r2']

ACCESS_KEY = config['accessKeyId']
SECRET_KEY = config['secretAccessKey']
ENDPOINT = config['endpoint'] # https://....
BUCKET = config['bucketName']
PUBLIC_URL_BASE = config['publicUrl']

REGION = 'auto'
SERVICE = 's3'

# Helper for signing
def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def get_signature_key(key, dateStamp, regionName, serviceName):
    kDate = sign(('AWS4' + key).encode('utf-8'), dateStamp)
    kRegion = sign(kDate, regionName)
    kService = sign(kRegion, serviceName)
    kSigning = sign(kService, 'aws4_request')
    return kSigning

def upload_file(local_path, object_name):
    with open(local_path, 'rb') as f:
        content = f.read()

    method = 'PUT'
    # Parse endpoint to get host
    # ENDPOINT is like https://ACCOUNTID.r2.cloudflarestorage.com
    # We need to construct URL: https://ACCOUNTID.r2.cloudflarestorage.com/BUCKET/KEY
    
    # R2 Virtual Hosted-Style: https://bucket.account.r2.cloudflarestorage.com/key ?
    # Or Path-Style: https://account.r2.cloudflarestorage.com/bucket/key
    # config['endpoint'] is usually the account endpoint. 
    # Let's try path style: endpoint/bucket/key
    
    host = ENDPOINT.replace("https://", "").replace("http://", "").split('/')[0]
    url = f"{ENDPOINT}/{BUCKET}/{object_name}"
    
    # Date
    t = datetime.datetime.utcnow()
    amz_date = t.strftime('%Y%m%dT%H%M%SZ')
    date_stamp = t.strftime('%Y%m%d')

    # Canonical Request
    canonical_uri = f"/{BUCKET}/{object_name}"
    canonical_querystring = ''
    canonical_headers = f'host:{host}\nx-amz-content-sha256:{hashlib.sha256(content).hexdigest()}\nx-amz-date:{amz_date}\n'
    signed_headers = 'host;x-amz-content-sha256;x-amz-date'
    payload_hash = hashlib.sha256(content).hexdigest()
    
    canonical_request = (method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash)
    
    # String to Sign
    algorithm = 'AWS4-HMAC-SHA256'
    credential_scope = date_stamp + '/' + REGION + '/' + SERVICE + '/aws4_request'
    string_to_sign = algorithm + '\n' +  amz_date + '\n' +  credential_scope + '\n' +  hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
    
    # Signature
    signing_key = get_signature_key(SECRET_KEY, date_stamp, REGION, SERVICE)
    signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()
    
    # Authorization Header
    authorization_header = algorithm + ' ' + 'Credential=' + ACCESS_KEY + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature
    
    headers = {
        'x-amz-date': amz_date,
        'x-amz-content-sha256': payload_hash,
        'Authorization': authorization_header,
        'Content-Type': 'image/png' # hardcoded for now
    }
    
    try:
        print(f"Uploading {object_name}...")
        req = urllib.request.Request(url, data=content, headers=headers, method=method)
        with urllib.request.urlopen(req) as response:
            if response.status in [200, 201]:
                final_url = f"{PUBLIC_URL_BASE}/{object_name}"
                print(f"SUCCESS: {final_url}")
                return final_url
            else:
                print(f"FAILED status: {response.status}")
                return None
    except Exception as e:
        print(f"ERROR: {e}")
        # Try to read error body
        try: 
            if hasattr(e, 'read'): print(e.read().decode())
        except: pass
        return None

images = [
    {'path': 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_hero_craftsman_1769935013019.png', 'name': 'blog_hero_craftsman.png'},
    {'path': 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_ambiance_lighting_1769935034550.png', 'name': 'blog_ambiance_lighting.png'},
    {'path': 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_fresh_wall_1769935054896.png', 'name': 'blog_fresh_wall.png'},
    {'path': 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_trustworthy_pro_1769935073118.png', 'name': 'blog_trustworthy_pro.png'},
    {'path': 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_taking_photo_1769935089960.png', 'name': 'blog_taking_photo.png'}
]

results = []
for img in images:
    url = upload_file(img['path'], img['name'])
    if url:
        results.append({'name': img['name'].replace('.png', ''), 'url': url})

print("\n--- RESULTS JSON ---")
print(json.dumps(results))
