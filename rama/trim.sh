#!/bin/bash
# trim.sh name  : raw/name.mp3 -> audio/name.mp3, drop the end click (cut at last silence start + 0.25s, or len-0.22) with a short fade
f=raw/$1.mp3; L=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)
S=$(ffmpeg -i $f -af silencedetect=n=-40dB:d=0.3 -f null - 2>&1 | grep -oE "silence_start: [0-9.]+" | tail -1 | awk '{print $2}')
E=$(python3 -c "L=$L;S='$S';s=float(S) if S else L;e=min(s+0.25,L-0.22) if s>L-3 else L-0.22;print(round(e,3))")
ffmpeg -y -loglevel error -i $f -af "atrim=0.03:$E,afade=t=in:d=0.02,afade=t=out:st=$(python3 -c "print($E-0.15)"):d=0.12" -b:a 128k audio/$1.mp3 && echo "$1 $L -> $E"
