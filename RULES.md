# Standing rules for Chinni Slokalu reels

These are the owner's decisions. Follow them on every reel; ask before breaking one.

## Content
- Plan first: understand the sloka's meaning, then animate scenes that show it, so a child who can't read still gets it. The Hanuman Chalisa v2 reel is the quality bar.
- Every line gets its own picture-story scene (the `#vis` window; copy `asatoma/`, which shows scenes in all three places), shown while the line is taught, in the listen-first chant and in the sung finale. A plain template reel (one character bobbing on a gradient) is not acceptable for a new reel.
- Each scene must show the line's meaning as an action with a visible before and after, and the change happens on screen at the meaning moment: darkness to light means the room is dark and a lamp is lit; "protect us" means someone is protected from something. Pick the action before drawing anything: write one sentence per line, "we see X, then Y happens", in the reel's scenes.js header.
- Every character and object must come from the sloka. No mascots or decorations with no link to the meaning (Asatoma once had an owl that never did anything). The hero shown in the intro and outro is the sloka's deity, or an object from the sloka when there is none.
- Before rendering, snapshot every scene before and after its meaning moment and check that a child could tell what changed with the sound off.
- Every reel opens with a ~7 s sung hook: the first sung line from the reel's own `audio/10_sung.mp3`, with its scene, karaoke words and "SING ALONG! / పాడుకుందాం!". Then the normal reel; the full song plays once, at the end. The hook reuses existing audio and costs no credits. (The Chalisa has no sung finale, so no hook.)
- Every finished reel gets an Instagram cover (`./reel cover <id>`, row in `covers/covers.json`). Never put a cover frame inside the video.
- No 720p copies. Keep only the latest version of each reel.

## Voices
- Spoken parts: Gemini TTS, voice Leda (Achernar is a candidate). Free quota is about 10 clips per model per day, resetting 1:30 PM IST, shared by every run: never make several reels in parallel.
- Sung finale: ElevenLabs Music, one take (`generations_count` 1), checked before any retry; keep about 10k credits in reserve. When credits run out, use the free fallback: Leda chant over a synthesized drone (`voice-tests/bgm.py`).
- One voice per reel, never mixed. Reels already made with ElevenLabs Janaki stay as they are.
- Never pay ElevenLabs for word timings; derive them from silence or Gemini.

## Storage
- Voice clips live in Drive `Chinni Slokalu/Sources`, listed in `sources.json`, never in git. Each reel's Inbox item `sloka-<id>` names its clips so the Inbox can hand them out.
- Finished reels and covers go only to Drive `Chinni Slokalu/Reels`, through the Inbox upload (`./reel upload`). Never the How To Hero folder.
- Nothing is copied to the owner's Mac (no disk space). On the Mac, touch only this project's files.

## Redos of existing reels
- A rejected `video` item of app Chinni Slokalu named `sloka-<reel id>` (an existing reel in `reels.json`) is a redo, exactly like a rejected `sloka-video-*` item: the daily video job picks it first, one per run, and fixes what `data.rejections` says.
- A visual redo keeps the reel's voice clips as they are (`./reel fetch <id>`): no new voice, no ElevenLabs or Gemini voice credits. Rebuild it as a picture-story reel modelled on `asatoma/`: copy `asa.html`, `lib.js` and `build_asa.sh` into the reel's folder, rename the build script and fix its hardcoded `SRC` folder and html file name, write a new `scenes.js`, then point its `reels.json` "build" at the new script and keep its "out" name.
- A voice redo (a reason about pronunciation or the voice) keeps the pictures and fixes only the clips with the fault. Find them first: ask Gemini to transcribe each clip (`./reel fetch <id>`) and list the ones with the named mistake, including `10_sung.mp3`. Remake those clips in the reel's own voice, so the reel still sounds like one person (`voice-tests/redo_gen.py` takes clip names; Telugu script in the prompt helps pronunciation). Transcribe each new clip and check the word is right before rebuilding; retry at most twice. A faulty sung clip needs a new ElevenLabs song (one take) or the free Leda-over-drone fallback. Upload the new clips to Drive `Chinni Slokalu/Sources` and update `sources.json`, then rebuild, render and upload as below.
- Upload with `./reel upload` (`DRIVE_REELS_FOLDER` = Chinni Slokalu/Reels) so the new file replaces the old one, make a new cover, then update the same Inbox item: new `driveId`, `link`, `data.thumb` and `data.links`, a summary of what changed, status `pending`. Keep `data.rejections` and `data.posted`.
- Owner rule (2026-11-25): after a redo, don't ask for approval in chat or wait for it. Replace the old video and cover in Drive (`./reel upload` replaces by name; keep only the latest version) and update the same Inbox item to the new files with status `pending`; the owner reviews from the Inbox only. Posts already on YouTube or Instagram are left untouched.
