# usage: gen.py <model> [clip names...]  -> raw/<name>.mp3 (Leda)
import json, subprocess, sys, time
model = sys.argv[1]; only = sys.argv[2:]
d = json.load(open('sloka.json'))
T = """# AUDIO PROFILE: Janaki, a soft-spoken young Telugu teacher
## THE SCENE: A calm morning class, teaching a sloka to small children.
### DIRECTOR'S NOTES
Style: soft, warm, gentle, smiling. Pace: slow and clear. Pronounce the Sanskrit words exactly as written, with long vowels held (మహామాయే = ma-haa-maa-ye, శ్రీపీఠే = shree-pee-the, సురపూజితే = su-ra-poo-ji-te). %s
#### TRANSCRIPT
%s"""
LINE = "Chant the Sanskrit words slowly with a short pause between them, then a long pause before the Telugu meaning."
chant = "\n".join(l['say'] + "..." for l in d['lines'])
CHANT = f"""# AUDIO PROFILE: Janaki, a sweet-voiced young Telugu woman leading a devotional chant
## THE SCENE: A peaceful temple at dawn; she chants a Mahalakshmi sloka slowly so small children can follow.
### DIRECTOR'S NOTES
Style: traditional sloka chanting, slow and rhythmic, with a gentle rising and falling sing-song tone. Stretch the long vowels softly. Warm, devotional, calm. Pace: slow, one line per breath, a short pause after each line and a longer pause after the second line.
#### TRANSCRIPT
{chant}"""
INTRO = "నమస్తే పిల్లలూ! ఈ రోజు మనం లక్ష్మీ అమ్మ శ్లోకం నేర్చుకుందాం. లక్ష్మీ అమ్మ మనకు సంపద, శుభం, సంతోషం ఇస్తుంది. ముందు విందాం!"
OUTRO = "చాలా బాగా చెప్పారు పిల్లలూ! జై మహాలక్ష్మీ!"
jobs = [("01_intro", T % ("Cheerful and excited, like greeting the class.", INTRO)), ("02_full", CHANT)]
for i, l in enumerate(d['lines']):
    jobs.append((f"0{4+i}_line{i+1}", T % (LINE, l['say'] + ". ... ... అంటే, " + l['mean_te'] + "!")))
jobs.append(("09_jai", T % ("Joyful and proud of the children.", OUTRO)))
for name, text in jobs:
    if only and name not in only: continue
    r = subprocess.run(["python3", "-I", "../voice-tests/tts.py", model, "Leda", f"raw/{name}"], input=text, text=True, capture_output=True)
    print(name, (r.stdout + r.stderr).strip()[:3000], flush=True)
    subprocess.run(["rm", "-f", f"raw/{name}.pcm"])
    if "ok" not in r.stdout: break
    time.sleep(30)
