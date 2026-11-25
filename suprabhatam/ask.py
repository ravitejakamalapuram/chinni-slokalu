import os, sys,json,base64,urllib.request
f,q=sys.argv[1],sys.argv[2]; model=sys.argv[3] if len(sys.argv)>3 else "gemini-2.5-flash"
body={"contents":[{"parts":[{"inlineData":{"mimeType":"audio/mp3","data":base64.b64encode(open(f,'rb').read()).decode()}},{"text":q}]}]}
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"Content-Type":"application/json","x-goog-api-key":os.environ.get("GEMINI_API_KEY","dummy")})
try: r=json.load(urllib.request.urlopen(req,timeout=180)); print(r["candidates"][0]["content"]["parts"][0]["text"])
except urllib.error.HTTPError as e: print(e.code,e.read()[:400].decode())
