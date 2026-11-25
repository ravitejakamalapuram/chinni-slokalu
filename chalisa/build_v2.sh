#!/bin/bash
# usage: build_v2.sh <workdir>   -> index.html for the Hanuman Chalisa v2 reel (no sung hook: the Chalisa has no sung finale)
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
SRC=$REEL_ROOT/chalisa; W=$1
rm -rf "$W"; mkdir -p $W
cp -r $SRC/audio $SRC/art $SRC/verses.tsv $SRC/chunks.json $W/
cp -r $SRC/v2/* $W/; cp -r $REEL_ROOT/template/assets $W/
cd $W && python3 build_v2.py .
