# usage: gen.py <model> [clip names...]   -> shuklam/audio/<clip>.mp3, Gemini TTS voice Achernar
import json, os, subprocess, sys, time
model = sys.argv[1]; only = sys.argv[2:]
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.join(here, 'audio')
d = json.load(open(os.path.join(here, 'sloka.json')))
T = """# AUDIO PROFILE: Achernar, a soft-spoken young Telugu teacher
## THE SCENE: In a classroom; she teaches a sloka said before starting any work to small children.
### DIRECTOR'S NOTES
Style: soft, warm, gentle, smiling. Pace: slow and clear. Pronounce the Sanskrit words carefully, exactly as written in Telugu script. %s
#### TRANSCRIPT
%s"""
LINE = "Chant the Sanskrit words slowly with a short pause between them, then a long pause before the Telugu meaning."
chant = "\n".join("... ".join(l['te'].split()) + "..." for l in d['lines'])
CHANT = f"""# AUDIO PROFILE: Achernar, a sweet-voiced young Telugu woman leading a devotional chant
## THE SCENE: Before starting her studies, she chants the Shuklambaradharam sloka to Lord Vinayaka slowly so small children can follow.
### DIRECTOR'S NOTES
Style: traditional sloka chanting, slow and rhythmic, with a gentle rising and falling sing-song tone. Warm, devotional, calm. Pace: slow, one line per breath, a short pause after each line.
#### TRANSCRIPT
{chant}"""
intro = "హాయ్ పిల్లలూ! ఏ పని మొదలుపెట్టే ముందైనా మనం ముందు ఎవరిని తలచుకుంటాం? మన వినాయకుడినే! ఆయనను తలచుకుంటే అడ్డంకులన్నీ తొలగిపోతాయి. రండి, ఆ చిన్న శ్లోకం కలిసి నేర్చుకుందాం!"
outro = "భలే పిల్లలూ! ఇక చదువు మొదలుపెట్టే ముందు, ఏ పని మొదలుపెట్టే ముందైనా, ఈ శ్లోకం చెప్పుకుందాం. వినాయకుడు మనకు దారి చూపిస్తాడు! జై గణేశ!"
learn = "ఇప్పుడు ఒక్కో వరుస నేర్చుకుందాం!"
together = "ఇప్పుడు అందరం కలిసి చెబుదాం!"
jobs = [("01_intro", T % ("Cheerful and excited, like greeting the class.", intro)), ("02_full", CHANT),
        ("03_learn", T % ("Cheerful.", learn))]
for i, l in enumerate(d['lines']):
    jobs.append((f"0{4+i}_line{i+1}", T % (LINE, "... ".join(l['te'].split()) + ". ... ... అంటే, " + l['mean_te'] + "!")))
jobs += [("08_together", T % ("Cheerful, inviting.", together)), ("09_jai", T % ("Joyful and proud of the children.", outro))]
for name, text in jobs:
    if only and name not in only: continue
    for attempt in range(2):
        r = subprocess.run(["python3", "-I", os.path.join(here, '..', 'voice-tests', 'tts.py'), model, "Achernar", f"{out}/{name}"], input=text, text=True, capture_output=True)
        print(name, (r.stdout + r.stderr).strip()[:300], flush=True)
        subprocess.run(["rm", "-f", f"{out}/{name}.pcm"])
        if "ok" in r.stdout: break
        time.sleep(25)
    else:
        sys.exit(1)
    time.sleep(22)
