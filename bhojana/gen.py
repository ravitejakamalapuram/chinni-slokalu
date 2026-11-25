# usage: gen.py <model> <outdir> [clip names...]
import json, os, subprocess, sys, time
model, out = sys.argv[1:3]; only = sys.argv[3:]
d = json.load(open(os.environ['REEL_ROOT']+'/bhojana/sloka.json'))
T = """# AUDIO PROFILE: Janaki, a soft-spoken young Telugu teacher
## THE SCENE: A calm morning class, teaching a sloka to small children.
### DIRECTOR'S NOTES
Style: soft, warm, gentle, smiling. Pace: slow and clear. Pronounce the Sanskrit words carefully, exactly as written in Telugu script. %s
#### TRANSCRIPT
%s"""
LINE = "Chant the Sanskrit words slowly with a short pause between them, then a long pause before the Telugu meaning."
chant = "\n".join("... ".join(l['te'].split()) + "..." for l in d['lines'])
CHANT = f"""# AUDIO PROFILE: Janaki, a sweet-voiced young Telugu woman leading a devotional chant
## THE SCENE: A family sits down for a meal; before eating, she chants the Bhagavad Gita bhojana mantra slowly so small children can follow.
### DIRECTOR'S NOTES
Style: traditional sloka chanting, slow and rhythmic, with a gentle rising and falling sing-song tone. Warm, devotional, calm. Pace: slow, one line per breath, a short pause after each line and a longer pause after the second line.
#### TRANSCRIPT
{chant}"""
intro = "హాయ్ పిల్లలూ! మనం రోజూ అన్నం తినే ముందు, దేవుడికి థాంక్స్ చెప్పే ఒక చిన్న మంత్రం ఉంది. అదే భోజన మంత్రం! కృష్ణుడు భగవద్గీతలో చెప్పిన ఈ శ్లోకం, మనం కలిసి నేర్చుకుందామా?"
outro = "భలే పిల్లలూ! ఇక రోజూ భోజనానికి ముందు ఈ మంత్రం చెప్పి, అన్నాన్ని దేవుడి ప్రసాదంలా ఆనందంగా తిందాం! ఓం శాంతిః శాంతిః శాంతిః!"
jobs = [("01_intro", T % ("Cheerful and excited, like greeting the class.", intro)), ("02_full", CHANT)]
for i, l in enumerate(d['lines']):
    jobs.append((f"0{4+i}_line{i+1}", T % (LINE, "... ".join(l['te'].split()) + ". ... ... అంటే, " + l['mean_te'] + "!")))
jobs.append(("09_jai", T % ("Joyful and proud of the children.", outro)))
for name, text in jobs:
    if only and name not in only: continue
    r = subprocess.run(["python3", "-I", __import__("os").path.dirname(__file__)+"/tts.py", model, "Leda", f"{out}/{name}"], input=text, text=True, capture_output=True)
    print(name, (r.stdout + r.stderr).strip()[:300], flush=True)
    subprocess.run(["rm", "-f", f"{out}/{name}.pcm"])
    if "ok" not in r.stdout: sys.exit(1)
    time.sleep(20)
