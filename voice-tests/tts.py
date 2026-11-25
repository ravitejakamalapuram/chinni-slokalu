import sys,json,base64,urllib.request,subprocess
model,voice,out=sys.argv[1],sys.argv[2],sys.argv[3]
text=sys.stdin.read()
import os
body={"systemInstruction":{"parts":[{"text":os.environ["STYLE"]}]}} if os.environ.get("STYLE") else {}
body.update({"contents":[{"parts":[{"text":text}]}],
 "generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}})
req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
 data=json.dumps(body).encode(),headers={"Content-Type":"application/json","x-goog-api-key":os.environ.get("GEMINI_API_KEY","dummy")})
try: r=json.load(urllib.request.urlopen(req,timeout=180))
except urllib.error.HTTPError as e: print(e.code,e.read()[:1500].decode()); sys.exit(1)
p=r["candidates"][0]["content"]["parts"][0]["inlineData"]
b=base64.b64decode(p["data"]); b=b[44:] if b[:4]==b"RIFF" else b; open(out+".pcm","wb").write(b)
rate=p["mimeType"].split("rate=")[-1].split(";")[0] if "rate=" in p["mimeType"] else "24000"
subprocess.run(["ffmpeg","-y","-loglevel","error","-f","s16le","-ar",rate,"-ac","1","-i",out+".pcm","-b:a","128k",out+".mp3"]);print("ok",out,p["mimeType"])
