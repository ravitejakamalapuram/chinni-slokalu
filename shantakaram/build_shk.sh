#!/bin/bash
# usage: build_shk.sh <workdir> [hook]   -> builds index.html (template + Vishnu picture-story scenes) in workdir
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
R=$REEL_ROOT; SRC=$R/shantakaram; W=$1
rm -rf "$W"; cp -r $R/template $W
cp $R/mahamrityunjaya/mmj.html $W/template.html; cp $SRC/sloka.json $W/; cp -r $SRC/audio $W/audio
[ -n "$2" ] && python3 $R/template/add_hook.py $W/sloka.json ${2//:/ }
cd $W && sed -i "s/^    segs.append(s)/    s.update(seg.get(\"fix\", {})); segs.append(s)/" build.py && python3 build.py . > build.log && python3 - "$R" <<'PY'
import sys
R=sys.argv[1]; h=open('index.html',encoding='utf-8').read()
art=open(R+'/suprabhatam/art/lib.js',encoding='utf-8').read()+'\n'+open(R+'/shantakaram/scenes.js',encoding='utf-8').read()
h=h.replace('</style>','  .w { margin: 0 8px !important; } .card .men { font-size: 34px !important; }\n</style>',1)
h=h.replace('&& fs > 48)','&& fs > 34)')
h=h.replace('__ART__',art+'\ndocument.querySelector("#vis svg").innerHTML = SC.svg;').replace('__SC_SVG__','')
open('index.html','w',encoding='utf-8').write(h)
PY
cat build.log
