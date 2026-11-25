# trim.py <name>...: raw/<name>.mp3 -> audio/<name>.mp3, cut the end click (last silence + 0.25s, else -0.22s) and fade in/out
import subprocess, re, sys
for n in sys.argv[1:]:
    f = f"raw/{n}.mp3"
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
    o = subprocess.run(["ffmpeg", "-i", f, "-af", "silencedetect=n=-40dB:d=0.15", "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", o) if float(x) > d * 0.8]
    end = min(st[-1] + 0.25, d - 0.22) if st else d - 0.22
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f, "-af", f"atrim=0:{end},afade=t=in:d=0.08,afade=t=out:st={end - 0.12}:d=0.12", "-b:a", "128k", f"audio/{n}.mp3"])
    print(n, round(d, 2), "->", round(end, 2))
