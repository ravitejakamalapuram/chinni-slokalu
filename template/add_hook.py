#!/usr/bin/env python3
"""Prepend a short sung "hook" to a reel: plays one line of an existing clip at the very start.
Usage: add_hook.py <sloka.json> <audio> <from_s> <to_s> <line_index or a-b range>
  e.g. add_hook.py sloka.json 10_sung.mp3 auto auto 0   (or explicit seconds)   (needs word_timings for <audio> in sloka.json)
The reel's html must handle segment type 'hook' (see mahamrityunjaya/mmj.html)."""
import json, sys
p, audio = sys.argv[1], sys.argv[2]
cfg = json.load(open(p, encoding='utf-8'))
L0 = [int(x) for x in sys.argv[5].split('-')]; lines = list(range(L0[0], L0[-1] + 1))  # '0' or '0-1'
wt = cfg['word_timings'][audio]; cnt = lambda ls: sum(len(cfg['lines'][k]['te'].split()) for k in ls)
n0 = cnt(range(lines[0]))
if sys.argv[4] == 'auto' and len(L0) == 1 and wt[n0 + cnt(lines) - 1][1] - wt[n0][0] < 4.5 and lines[-1] + 1 < len(cfg['lines']):
    lines.append(lines[-1] + 1)  # one short line makes too brief a hook: take the next one too
n = cnt(lines); line = lines
# 'auto': start 0.4s before the line's first word; end 1.0s after its last word, but before the next line's first word
a = max(0.0, wt[n0][0] - 0.4) if sys.argv[3] == 'auto' else float(sys.argv[3])
b = (min(wt[n0 + n - 1][1] + 1.0, wt[n0 + n][0] - 0.1) if n0 + n < len(wt) else wt[-1][1] + 1.0) if sys.argv[4] == 'auto' else float(sys.argv[4])
cfg['segments'] = [s for s in cfg['segments'] if s['type'] != 'hook']
cfg['segments'].insert(0, {'type': 'hook', 'audio': audio, 'clip': [a, b], 'lines': line, 'line': line[0], 'lead': 0.1, 'gap': 0.35,
                           'caption': 'పాడుకుందాం!', 'caption_en': 'SING ALONG!'})
json.dump(cfg, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
