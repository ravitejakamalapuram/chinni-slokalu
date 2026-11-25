#!/bin/bash
# usage: sung_build.sh <id> <out.mp4> '<timings json>'
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
ID=$1; OUT=$2; TJ=$3
SRC=$REEL_ROOT/$ID
W=${2:-/tmp/sung_$ID}
rm -rf $W; cp -r $REEL_ROOT/template $W
cp $SRC/sloka.json $W/sloka.json; rm -rf $W/audio; cp -r $SRC/audio $W/audio
python3 - "$W/sloka.json" "$TJ" <<'PY'
import json,sys
p=sys.argv[1]; d=json.load(open(p))
seg=[s for s in d['segments'] if (s.get('caption_en') or '').startswith('ALL TOGETHER') or s.get('audio')=='10_sung.mp3'][0]
seg.update(audio='10_sung.mp3',caption='పాడుకుందాం!',caption_en='SING ALONG!')
d['word_timings']['10_sung.mp3']=json.loads(sys.argv[2])
json.dump(d,open(p,'w'),ensure_ascii=False,indent=1)
PY
cp $W/sloka.json $SRC/sloka.json
cd $W && python3 build.py . >/dev/null
HYPERFRAMES_TELEMETRY_DISABLED=1 npx -y hyperframes@0.9.81 render . -q standard -o raw.mp4 >/dev/null 2>&1
ffmpeg -y -loglevel error -i raw.mp4 -c:v libx264 -crf 22 -preset medium -c:a copy $OUT
ffmpeg -loglevel error -i $OUT -vf "fps=1/3,scale=216:-1,tile=8x5" -frames:v 1 -y $W/tile.png
ffmpeg -hide_banner -i $OUT -af silencedetect=noise=-45dB:d=2.5 -f null - 2>&1 | grep silence_ || echo "no gaps"
ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT
