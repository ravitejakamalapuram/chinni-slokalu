#!/bin/bash
# usage: build_sitaram.sh <workdir>   -> index.html for the Sitaram 108 chant-along reel (song clip in audio/song.mp3)
set -e
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
SRC=$REEL_ROOT/sitaram; W=$1
mkdir -p $W/audio
cp $SRC/audio/song.mp3 $W/audio/
cp $SRC/sitaram.html $SRC/lib.js $SRC/scenes.js $SRC/counts.json $SRC/build.py $W/
rm -rf $W/assets; cp -r $REEL_ROOT/template/assets $W/
cd $W && python3 build.py .
