# Video job (daily 2:11 PM IST)

Make at most ONE reel per run. Follow `README.md` and `RULES.md` in this repo. Render here in the cloud; never copy reels to the owner's Mac (no disk space).

## 1. Pick and claim the work

In this order:

a. A rejected redo: a `video` item of app "Chinni Slokalu" with status `rejected`, either `sloka-video-*` or `sloka-<reel id>` (see `RULES.md`, Redos). A rejected item is closed, so `claim` refuses it: first `update` it to status `building` with `ifVersion`, then `claim` it. Read every reason in `data.rejections` and fix exactly that.

b. Otherwise an approved idea: `claimNext` with `type` `idea`, `status` `approved`, `set` `{"status":"building"}`. Use its text, meaning, scene plan and any approval note.

If neither exists, finish with one line saying nothing was approved.

## 2. Plan

Write the scene plan from the meaning first (`RULES.md`, Content): one "we see X, then Y happens" sentence per line in the reel's `scenes.js` header. Copy `asatoma/` for a new reel; a visual redo keeps its voice clips (`./reel fetch <id>`).

## 3. Voice (new reels only)

- Spoken parts: Gemini TTS voice Leda. Prefer the AI Studio speech playground in the owner's Brave (Claude in Chrome) when the Mac is on, since it has no quota wait; otherwise `GEMINI_API_KEY` (free tier, about 10 clips per model per day).
- Sung finale: ElevenLabs Music, one take (`generations_count` 1), checked before any retry, keeping about 10k credits in reserve. If credits are short, use the free Leda-over-drone fallback (`voice-tests/bgm.py`).
- If the voice can't be made today, put the item back to `approved`, release the claim, and finish with one line saying why.

## 4. Build, check, render

`./reel build <id>`, then snapshot every scene before and after its meaning moment and check a child could tell what changed with the sound off. Then `./reel render <id>` (about 10 minutes; run it in the background) and `./reel cover <id>`.

## 5. Upload and update the Inbox

- `./reel upload` the video and the cover (`DRIVE_REELS_FOLDER` must point at chittiSlokalu/Reels). Uploading the same name replaces the old file and gives a new id.
- New reel: upload its voice clips to Drive `chittiSlokalu/Sources` and add them to `sources.json`. Add a `video` item `sloka-video-<slug>`, title `<Sloka name> reel`, status `pending`, summary = one line on what it shows plus the Drive links to the video and cover, with `driveId`, `link`, and `data` `{"app":"Chinni Slokalu","icon":"🪔","group":"Reels","reel":"<slug>","idea":"<idea id>","thumb":"<cover id>","links":{...},"sources":{...}}`. Set the idea to `done`.
- Redo: update the same item (new `driveId`, `link`, `data.thumb`, `data.links`, a summary of what changed, status `pending`), keeping `data.rejections` and `data.posted`. Don't ask for approval in chat; the owner reviews in the Inbox.
- Release the claim.

## 6. Save the code

Commit the reel's code (scenes, build script, `reels.json`, `sources.json`, `covers/covers.json`) on a branch, open a pull request, and merge it, so the next run starts from it. Add one line about the run, and any new gotcha, to project memory `video-job-runs.md`.

Publishing stays manual: never post anywhere.

Finish with one short line: what was built or redone and its Drive link, or why nothing was.
