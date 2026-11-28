"""build.py <workdir>: fills sitaram.html with the art library, the scenes, the count times and the song -> index.html.
workdir has sitaram.html, lib.js, scenes.js, counts.json, assets/ and audio/song.mp3."""
import json, os, sys
W = sys.argv[1]; P = lambda *a: os.path.join(W, *a)
c = json.load(open(P('counts.json')))
total = round(c['song_dur'] + 0.4, 3)
h = open(P('sitaram.html')).read()
h = h.replace('__DURATION__', str(total)).replace('__LIB__', open(P('lib.js')).read()).replace('__SCENES__', open(P('scenes.js')).read())
h = h.replace('__SCENES_SVG__', '').replace('__DATA__', json.dumps({'duration': total, 'counts': c['counts']}))
h = h.replace('__AUDIO__', f'<audio id="a0" src="audio/{c["song"]}" data-start="0" data-duration="{c["song_dur"]}" data-volume="1"></audio>')
# scene SVG is built by scenes.js at load: inject it before the timeline is made
h = h.replace('<script>\n', '<script>\n', 1)
open(P('index.html'), 'w').write(h)
print(P('index.html'), total)
