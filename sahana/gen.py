# usage: python3 gen.py [clip names...]  -> raw/<name>.mp3 via Gemini Leda, falls back across TTS models on quota errors
import json, subprocess, sys, time
d = json.load(open('sloka.json')); only = sys.argv[1:]
MODELS = ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts", "gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"]
T = """# AUDIO PROFILE: Janaki, a soft-spoken young Telugu teacher
## THE SCENE: A calm morning class, teaching a sloka to small children.
### DIRECTOR'S NOTES
Style: soft, warm, gentle, smiling. Pace: slow and clear. %s
#### TRANSCRIPT
%s"""
LINE = "Chant the Sanskrit words slowly with a short pause between them, then a long pause before the Telugu meaning."
words = lambda te: "... ".join(te.replace("॥", "").split())
chant = "\n".join(words(l['te']) + "..." for l in d['lines'])
CHANT = f"""# AUDIO PROFILE: Janaki, a sweet-voiced young Telugu woman leading a devotional chant
## THE SCENE: A peaceful ashram classroom at dawn; she chants the Shanti mantra slowly so small children can follow.
### DIRECTOR'S NOTES
Style: traditional Vedic-style sloka chanting, slow and rhythmic, with a gentle rising and falling sing-song tone. Stretch the long vowels softly. Warm, devotional, calm. Pace: slow, one line per breath, a short pause after each line. Say the final shantih three times softly, each quieter.
#### TRANSCRIPT
{chant}"""
jobs = [("01_intro", T % ("Cheerful and excited, like greeting the class.", "హలో పిల్లలూ! ఈ రోజు మనం ఓం సహనావవతు అనే శాంతి మంత్రం నేర్చుకుందాం. గురువూ శిష్యులూ కలిసి చదువు మొదలుపెట్టే ముందు ఈ మంత్రం చెప్తారు. రండి!")), ("02_full", CHANT)]
for i, l in enumerate(d['lines']):
    jobs.append((f"0{4+i}_line{i+1}", T % (LINE, words(l['te']) + ". ... ... అంటే, " + l['mean_te'])))
jobs.append(("09_jai", T % ("Joyful and proud of the children.", "చాలా బాగా చెప్పారు పిల్లలూ! రోజూ చదువు మొదలుపెట్టే ముందు ఈ మంత్రం చెప్పండి. ఓం శాంతిః శాంతిః శాంతిః!")))
for name, text in jobs:
    if only and name not in only: continue
    for m in MODELS:
        r = subprocess.run(["python3", "-I", "../voice-tests/tts.py", m, "Leda", f"raw/{name}"], input=text, text=True, capture_output=True)
        out = r.stdout.strip(); print(name, m, out[:160], flush=True)
        if out.startswith("ok"): break
        if not out.startswith("429"): time.sleep(5)
    subprocess.run(["rm", "-f", f"raw/{name}.pcm"]); time.sleep(8)
