#!/usr/bin/env python3
"""Build index.html for the Suprabhatam reel. Usage: python3 build_sup.py <workdir>; workdir has sup.html, assets/, art/, audio/, segs.json, disp.json, optional sung.json.
Optional 2nd arg "hook": open with the first sung half-verse of verse 1 (cut from the sung clip, needs sung.json) before the intro."""
import json, subprocess, sys, os
W = sys.argv[1] if len(sys.argv) > 1 else '.'
P = lambda *a: os.path.join(W, *a)
from PIL import ImageFont
_F = ImageFont.truetype(P('assets/fonts/f3.woff2'), 76)
def fit(t):
    ws = t.split(' ')
    w = sum(_F.getlength(x) for x in ws) + _F.getlength(' ') * (len(ws) - 1)
    if ', ' in t and w + 18 * len(ws) > 1300:
        return -min(56, min(fit(x) for x in t.split(', ')))
    return int(min(76, (880 - 18 * len(ws)) * 76 / w))
def dur(f): return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
def spread(txt, a, b, t):
    ws = txt.split(); tot = sum(len(w) for w in ws); x = a; out = []
    for w in ws:
        dd = (b - a) * len(w) / tot; out.append([round(t + x, 2), round(t + x + dd * 0.9, 2)]); x += dd
    return out
S = json.load(open(P('segs.json'))); Dp = json.load(open(P('disp.json'), encoding='utf-8'))
t = 0.4; audio = []; verses = []; hook = None
if len(sys.argv) > 2 and sys.argv[2] == 'hook':
    sj0 = json.load(open(P('sung.json')))[0]; ca, cb = sj0[0] - 0.4, sj0[1] + 0.25
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(ca), '-to', str(cb), '-i', P('audio', S['sung']),
                    '-af', f'afade=t=in:d=0.05,afade=t=out:st={cb - ca - 0.55:.2f}:d=0.55', P('audio', '_hook.mp3')], check=True)
    dh = dur(P('audio', '_hook.mp3')); audio.append(('_hook.mp3', 0.1, dh))
    hook = dict(l1=Dp[0]['l1'], fs1=fit(Dp[0]['l1']), end=round(0.1 + dh + 0.3, 2), words=spread(Dp[0]['l1'], 0.4, 0.4 + sj0[1] - sj0[0], 0.1))
    t = hook['end'] + 0.4
di = dur(P('audio', S['intro'])); audio.append((S['intro'], t, di)); intro = {'start': t, 'end': t + di + 0.3}; t += di + 1.0
for i, (v, d) in enumerate(zip(S['verses'], Dp)):
    L = dur(P('audio', v['file'])); audio.append((v['file'], t, L))
    (a1, b1), (a2, b2) = v['h']; words = spread(d['l1'], a1, b1, t) + spread(d['l2'], a2, b2, t)
    verses.append(dict(key=str(i + 1), l1=d['l1'], l2=d['l2'], fs1=fit(d['l1']), fs2=fit(d['l2']), mte=d['mte'], men=d['men'], label=f'శ్లోకం {i + 1}/4',
                       start=round(t + a1, 2), h2=round(t + a2, 2), cend=round(t + b2, 2), ms=round(t + v['m'][0], 2), me=round(t + v['m'][1], 2), end=round(t + L, 2), words=words))
    t += L + 0.8
dt = dur(P('audio', S['together'])); audio.append((S['together'], t, dt)); tog = {'start': t, 'end': t + dt}; t += dt + 0.4
ds = dur(P('audio', S['sung'])); audio.append((S['sung'], t, ds))
sj = json.load(open(P('sung.json'))) if os.path.exists(P('sung.json')) else [[ds * i / 4 + 1, ds * (i + 1) / 4 - 1] for i in range(4)]
sung = {'start': t, 'end': t + ds, 'verses': []}
for i, (seg, d) in enumerate(zip(sj, Dp)):
    a, b = seg[0], seg[-1]; m = (a + b) / 2 if len(seg) == 2 else seg[1]; m2 = m if len(seg) == 2 else seg[2]
    sung['verses'].append(dict(l1=d['l1'], l2=d['l2'], fs1=fit(d['l1']), fs2=fit(d['l2']), start=round(t + a, 2), end=round(t + b, 2),
                               words=spread(d['l1'], a, m, t) + spread(d['l2'], m2, b, t)))
t += ds; outro = {'start': t - 1.0}; t += 3.0
total = round(t, 2)
tags = '\n'.join(f'<audio id="a{i}" src="audio/{f}" data-start="{s:.3f}" data-duration="{d:.3f}" data-volume="1"></audio>' for i, (f, s, d) in enumerate(audio))
data = dict(duration=total, hook=hook, intro=intro, verses=verses, tog=tog, sung=sung, outro=outro)
h = open(P('sup.html'), encoding='utf-8').read()
R = lambda f: open(P('art', f), encoding='utf-8').read()
h = h.replace('__RIG__', R('hanuman_rig.js')).replace('__STORY__', R('lib.js') + '\n' + R('story.js')).replace('__INFRA__', R('infra.js'))
h = h.replace('__DURATION__', str(total)).replace('__AUDIO__', tags).replace('__DATA__', json.dumps(data, ensure_ascii=False))
open(P('index.html'), 'w', encoding='utf-8').write(h)
print('duration', total, [ (v['start'], v['ms'], v['end']) for v in verses ], 'tog', tog, 'sung', sung['start'])
