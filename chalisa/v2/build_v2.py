#!/usr/bin/env python3
"""Build index.html for the Hanuman Chalisa reel. Usage: python3 build_chalisa.py <workdir>
workdir has chalisa.html, assets/, art/, audio/ (intro.mp3, c00..c11.mp3, outro.mp3), verses.tsv, chunks.json."""
import json, re, subprocess, sys, os
W = sys.argv[1] if len(sys.argv) > 1 else '.'
P = lambda *a: os.path.join(W, *a)
from PIL import ImageFont
_F = ImageFont.truetype(os.environ['REEL_ROOT']+'/template/assets/fonts/f3.woff2', 76)
def fit(t):
    ws = t.split(' ')
    w = sum(_F.getlength(x) for x in ws) + _F.getlength(' ') * (len(ws) - 1)
    if ', ' in t and w + 18 * len(ws) > 1300:
        return -min(52, min(fit(x) for x in t.split(', ')))
    return int(min(76, (880 - 18 * len(ws)) * 76 / w))
def dur(f): return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
def gaps(f):
    out = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'silencedetect=noise=-35dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return list(zip(st, en))
rows = {r[0]: r for r in (l.rstrip('\n').split('\t') for l in open(P('verses.tsv'), encoding='utf-8'))}
chunks = json.load(open(P('chunks.json'), encoding='utf-8'))
GAP = 0.5
t = 0.4; audio = []; verses = []
di = dur(P('audio', 'intro.mp3')); audio.append(('intro.mp3', t, di)); intro = {'start': t, 'end': t + di + 0.3}; t += di + 0.9
for c in chunks:
    f = P('audio', c['file']); d = dur(f); g = gaps(f)
    lead = g[0][1] if g and g[0][0] < 0.05 else 0.05
    tail = g[-1][0] if g and g[-1][1] > d - 0.05 else d
    inner = [x for x in g if x[0] > lead + 0.3 and x[1] < tail - 0.3]
    n = len(c['keys']) * 2
    inner = sorted(sorted(inner, key=lambda x: x[0] - x[1])[:n - 1])  # longest n-1 gaps, in time order
    if len(inner) != n - 1: print('WARN gaps', c['file'], len(inner), n - 1)
    bounds = [lead] + [x for p in inner for x in p] + [tail]
    halves = [(bounds[2 * i], bounds[2 * i + 1]) for i in range(n)]
    audio.append((c['file'], t, d))
    for vi, k in enumerate(c['keys']):
        r = rows[k]; hs = halves[2 * vi:2 * vi + 2]; words = []
        for txt, (a, b) in zip([r[1], r[2]], hs):
            ws = txt.split(); tot = sum(len(w) for w in ws); x = a
            for w in ws:
                dd = (b - a) * len(w) / tot; words.append([round(t + x, 2), round(t + x + dd * 0.9, 2)]); x += dd
        label = 'దోహా' if k.startswith('D') else f'చౌపాయి {k}/40'
        verses.append(dict(key=k, l1=r[1], l2=r[2], fs1=fit(r[1]), fs2=fit(r[2]), mte=r[3], men=r[4], scene=r[5], label=label,
                           start=round(t + hs[0][0], 2), end=round(t + hs[1][1], 2), halves=[[round(t + a, 2), round(t + b, 2)] for a, b in hs], words=words))
    t += d + GAP
do = dur(P('audio', 'outro.mp3')); t += 0.4; audio.append(('outro.mp3', t, do)); outro = {'start': t}; t += do + 2.5
total = round(t, 2)
tags = '\n'.join(f'<audio id="a{i}" src="audio/{f}" data-start="{s:.3f}" data-duration="{d:.3f}" data-volume="1"></audio>' for i, (f, s, d) in enumerate(audio))
data = dict(duration=total, intro=intro, outro=outro, verses=verses)
h = open(P('chalisa2.html'), encoding='utf-8').read()
R = lambda f: open(P('art', f), encoding='utf-8').read()
h = h.replace('__RIG__', R('hanuman_rig.js')).replace('__STORY__', R('lib.js') + '\n' + R('story.js')).replace('__INFRA__', R('infra.js')).replace('__TAIL__', R('tail.js'))
h = h.replace('__DURATION__', str(total)).replace('__AUDIO__', tags).replace('__DATA__', json.dumps(data, ensure_ascii=False))
open(P('index.html'), 'w', encoding='utf-8').write(h)
print('duration', total, 'verses', len(verses))
