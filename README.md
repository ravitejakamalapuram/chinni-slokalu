# Chinni Slokalu

Animated Telugu sloka reels for kids (1080x1920, about 1.5 to 3 minutes). Everything needed to rebuild every finished reel lives here, except the voice clips, which live in Google Drive and are fetched on demand.

Read [RULES.md](RULES.md) before making or changing a reel. The daily scheduled jobs read their instructions from [jobs/](jobs/README.md).

## What's where

| Path | What |
| --- | --- |
| `reels.json` | Every finished reel: its build script, sung-hook setting and output name |
| `<id>/sloka.json` | The sloka: lines, meanings, word timings, character, scenes |
| `<id>/*.html, scenes.js, lib.js, build_*.sh` | Custom picture-story reels only (mahamrityunjaya, surya, rama, ...) |
| `template/` | The shared reel engine: `template.html`, `build.py`, `add_hook.py`, `characters/`, fonts, GSAP |
| `covers/` | Instagram cover builder and its `covers.json` |
| `sources.json` | Every voice clip: path, Drive file id, sha256 |
| `voice-tests/` | Voice generation helpers (Gemini TTS prompt format, drone music) |
| `checklist/`, `covers/kit/` | Sources of the checklist and posting-kit pages |

## Set up a new machine

1. Install Python 3.10+, Node 18+, ffmpeg (with ffprobe), then in the repo run `npm install` (Playwright, for covers) and `npx playwright install chromium`. `pip install pillow`.
2. `cp .env.example .env`, fill in `INBOX_URL`, `INBOX_TOKEN` and `DRIVE_REELS_FOLDER`, then `set -a; . ./.env; set +a`.
3. `./reel fetch all` downloads the voice clips (about 46 MB) from Drive through the Inbox and checks each checksum.
4. `./reel render gayatri` builds and renders one reel to `out/gayatri-hook-reel.mp4` (about 5 minutes).

## Everyday commands

```bash
./reel list                 # all reels
./reel build  <id>          # index.html only, fast; open it to check timings
./reel render <id>          # full render to out/ (hyperframes 0.9.81, pinned; CRF 22)
./reel cover  <id>          # cover from out/<name>.mp4
./reel upload out/<file>    # to Drive Chinni Slokalu/Reels (replaces a file with the same name)
```

`build` fetches any missing clips first. Rendering is repeatable: the same `sloka.json`, clips and hyperframes version give the same video. Voice generation is not, which is why the clips are kept, not regenerated.

## Making a new reel

1. Copy `asatoma/` to `<new-id>/` (it shows a scene per line in teaching, the listen-first chant and the sung finale; `mahamrityunjaya/` only shows scenes in the sung finale's full chant). Rename `build_asa.sh` and fix its hardcoded `SRC` folder and html file name, fill `sloka.json` (lines, meanings, hero character; `template/sloka.json` shows every field), and rewrite `scenes.js` with one scene per line that acts out its meaning (see RULES.md).
2. Make the clips `01_intro … 09_jai, 10_sung` in `<new-id>/audio/` (see RULES.md for voices; `03_learn` and `08_together` can be copied from another reel).
3. Add word timings for `02_full` and `10_sung` to `sloka.json`, add the reel to `reels.json`, then `./reel build`, check it, `./reel render`.
4. Upload the clips: they go to Drive `Chinni Slokalu/Sources` and into `sources.json`, and the reel's Inbox item `sloka-<id>` lists them under `data.sources`.
5. Add a cover row, `./reel cover`, `./reel upload` the video and the cover.

## Secrets

None in git. The Inbox URL and token, and any API keys, come from the environment (`.env`, git-ignored).
