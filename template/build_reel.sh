#!/bin/bash
# Build a template-based sloka reel: build_reel.sh <id> <workdir> [hook]
#   hook = "audio:from:to:line" (from/to may be 'auto'), e.g. 10_sung.mp3:auto:auto:0 -> sung first line opens the reel.
# Reels with their own html (mahamrityunjaya, sahana, ...) use their own build_*.sh, which take the same [hook] arg.
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
R=$REEL_ROOT; W=$2
rm -rf "$W"; cp -r $R/template $W; cp $R/$1/sloka.json $W/; cp -r $R/$1/audio $W/audio
[ -n "$3" ] && python3 $R/template/add_hook.py $W/sloka.json ${3//:/ }
cd $W && python3 build.py . > build.log; cat build.log
