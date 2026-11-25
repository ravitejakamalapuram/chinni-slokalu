#!/bin/bash
# usage: build_lak.sh <workdir> [hook, e.g. 10_sung.mp3:0.3:6.2:0]  -> index.html (template + Lakshmi character + picture-story scenes)
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
SRC=$REEL_ROOT/lakshmi; W=$1
rm -rf "$W"; cp -r $REEL_ROOT/template $W
cp $SRC/character/lakshmi.* $W/characters/
cp $SRC/lak.html $W/template.html; cp $SRC/sloka.json $W/; cp -r $SRC/audio $W/audio
[ -n "$2" ] && python3 $REEL_ROOT/template/add_hook.py $W/sloka.json ${2//:/ }
cd $W && sed -i "s/^    segs.append(s)/    s.update(seg.get(\"fix\", {})); segs.append(s)/" build.py && python3 build.py . > build.log && python3 - "$SRC" <<'PY'
import sys,os
S=sys.argv[1]; h=open('index.html',encoding='utf-8').read()
art=open(os.environ['REEL_ROOT']+'/suprabhatam/art/lib.js',encoding='utf-8').read()+'\n'+open(S+'/scenes.js',encoding='utf-8').read()
h=h.replace('__ART__',art+'\ndocument.querySelector("#vis svg").innerHTML = SC.svg;').replace('__SC_SVG__','')
open('index.html','w',encoding='utf-8').write(h)
PY
cat build.log
