#!/usr/bin/env python3
"""Build index.html for one sloka reel from sloka.json + audio/*.mp3.
Usage: python3 build.py [project_dir]   (then: npx hyperframes render)"""
import json, re, subprocess, sys, os
D = sys.argv[1] if len(sys.argv) > 1 else '.'
cfg = json.load(open(os.path.join(D, 'sloka.json'), encoding='utf-8'))
LEAD, GAP = 0.5, 0.7  # silence before each clip, breathing room after it

def dur(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))

def silences(f, min_d=0.45):
    out = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', f'silencedetect=noise=-38dB:d={min_d}', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return list(zip(st, en))

def spread(words, a, b):
    """Split [a,b] across words proportional to their length (for clips without word timings)."""
    w = [len(x) for x in words]; tot = sum(w); t = a; res = []
    for n in w:
        d = (b - a) * n / tot; res.append([round(t, 2), round(t + d * 0.92, 2)]); t += d
    return res

t = 0.0 if cfg['segments'][0]['type'] == 'hook' else 0.3; audio_tags = []; segs = []
all_words = [w for l in cfg['lines'] for w in l['te'].split()]
for i, seg in enumerate(cfg['segments']):
    f = os.path.join(D, 'audio', seg['audio'])
    if 'clip' in seg:  # hook: play only [from, to] of an existing clip (e.g. first sung line), faded out
        ca, cb = seg['clip']; src = seg['audio']; seg = dict(seg, audio=f'_clip{i}.mp3'); f = os.path.join(D, 'audio', seg['audio'])
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(ca), '-to', str(cb), '-i', os.path.join(D, 'audio', src),
                        '-af', f'afade=t=in:d=0.05,afade=t=out:st={cb - ca - 0.7:.2f}:d=0.7', f], check=True)
    d = dur(f); ld, gap = seg.get("lead", LEAD), seg.get("gap", GAP)
    s = dict(seg, start=round(t, 3), audio_offset=ld, span=round(ld + d + gap, 3))
    if seg['type'] == 'hook':  # karaoke times for the hooked line, taken from the source clip's word_timings
        ls = seg.get('lines', [seg['line']]); n0 = sum(len(l['te'].split()) for l in cfg['lines'][:ls[0]]); n = sum(len(cfg['lines'][k]['te'].split()) for k in ls)
        s['words'] = [[round(x - ca, 2), round(y - ca, 2)] for x, y in cfg['word_timings'][src][n0:n0 + n]]
    if seg['type'] == 'full':
        wt = cfg.get('word_timings', {}).get(seg['audio'])
        if not wt:  # fallback: spread over speech, ignore leading/trailing silence
            sil = silences(f); a = sil[0][1] if sil and sil[0][0] < 0.05 else 0.1
            wt = spread(all_words, a, d - 0.2)
        s['words'] = wt
    if seg['type'] == 'line':
        words = cfg['lines'][seg['line']]['te'].split()
        # the gap between the chanted line and its spoken meaning is the longest pause
        sil = [x for x in silences(f, 0.3) if 0.6 < x[0] < d * 0.7]
        gap = max(sil, key=lambda x: x[1] - x[0]) if sil else None
        chant_end, meaning_at = (gap[0], gap[1]) if gap else (d * 0.45, d * 0.5)
        lead = silences(f, 0.1); a = lead[0][1] if lead and lead[0][0] < 0.05 else 0.1
        s['words'] = spread(words, a, chant_end); s['meaning_at'] = round(meaning_at, 2)
    segs.append(s)
    audio_tags.append(f'  <audio id="a{i}" src="audio/{seg["audio"]}" data-start="{s["start"] + ld:.3f}" data-duration="{d:.3f}" data-volume="1"></audio>')
    t += s['span']
total = round(t + 0.6, 2)
data = dict(cfg, segments=segs, duration=total)
html = open(os.path.join(D, 'template.html'), encoding='utf-8').read()
ch = cfg.get('character', 'ganesha')
rd = lambda n: open(os.path.join(D, 'characters', n), encoding='utf-8').read()
html = html.replace('__HERO_SVG__', rd(ch + '.svg')).replace('__HERO_JS__', rd(ch + '.js'))
html = html.replace('__BG__', cfg.get('bg', 'radial-gradient(circle at 50% 38%, #F6C066 0%, #DE9441 38%, #B9672A 72%, #7E3F17 100%)'))
html = html.replace('__DURATION__', str(total)).replace('__AUDIO__', '\n'.join(audio_tags)).replace('__DATA__', json.dumps(data, ensure_ascii=False))
open(os.path.join(D, 'index.html'), 'w', encoding='utf-8').write(html)
print('duration', total)
for s in segs: print(s['type'], s.get('line', ''), s['start'], s['span'], s.get('meaning_at', ''), s.get('words', '')[:2] if s.get('words') else '')
