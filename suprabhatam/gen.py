import json, subprocess, sys, time
V = json.load(open('verses.json')); out = sys.argv[1]; model = sys.argv[2]; only = sys.argv[3:]
HEAD = """# AUDIO PROFILE: Janaki, a sweet-voiced young Telugu teacher
## THE SCENE: Dawn at a temple courtyard; she teaches the Venkateswara Suprabhatam to small children.
### DIRECTOR'S NOTES
%s
#### TRANSCRIPT
%s"""
VN = "First chant the Sanskrit verse in a slow, traditional, gently sing-song devotional style, stretching long vowels softly, with a clear pause in the middle. Then pause for a long breath. Then explain the Telugu meaning warmly and clearly, like a teacher to small children."
jobs = [("intro", HEAD % ("Style: cheerful, warm and excited, like greeting the class. Pace: slow and clear.",
  "పిల్లలూ! తెల్లవారుజామున తిరుమల కొండపై శ్రీ వేంకటేశ్వర స్వామిని మేల్కొలిపే పాటే, సుప్రభాతం. రండి, మొదటి నాలుగు శ్లోకాలు అర్థంతో నేర్చుకుందాం!"))]
for v in V:
    jobs.append(("v" + v["key"], HEAD % (VN, v["halves"][0] + ". ... " + v["halves"][1] + ". ... ... ... అంటే, " + v["mean"])))
for name, text in jobs:
    if only and name not in only: continue
    r = subprocess.run(["python3", "-I", "tts.py", model, "Leda", f"{out}/{name}"], input=text, text=True, capture_output=True)
    print(name, (r.stdout + r.stderr).strip()[:300], flush=True)
    subprocess.run(["rm", "-f", f"{out}/{name}.pcm"]); time.sleep(22)
