#!/bin/bash
# usage: build_sup.sh <workdir> [hook]   -> index.html for the Suprabhatam reel; pass "hook" to open with the sung half-verse
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
SRC=$REEL_ROOT/suprabhatam; W=$1
rm -rf $W; mkdir -p $W
cp -r $SRC/sup.html $SRC/build_sup.py $SRC/segs.json $SRC/disp.json $SRC/sung.json $SRC/art $SRC/audio $W/
cp -r $REEL_ROOT/template/assets $W/; cp $REEL_ROOT/chalisa/v2/art/hanuman_rig.js $W/art/
cd $W && python3 build_sup.py . ${2:+hook}
