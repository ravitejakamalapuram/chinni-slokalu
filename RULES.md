# Standing rules for Chitti Slokalu reels

These are the owner's decisions. Follow them on every reel; ask before breaking one.

## Content
- Plan first: understand the sloka's meaning, then animate scenes that show it, so a child who can't read still gets it. The Hanuman Chalisa v2 reel is the quality bar.
- Every reel opens with a ~7 s sung hook: the first sung line from the reel's own `audio/10_sung.mp3`, with its scene, karaoke words and "SING ALONG! / పాడుకుందాం!". Then the normal reel; the full song plays once, at the end. The hook reuses existing audio and costs no credits. (The Chalisa has no sung finale, so no hook.)
- Every finished reel gets an Instagram cover (`./reel cover <id>`, row in `covers/covers.json`). Never put a cover frame inside the video.
- No 720p copies. Keep only the latest version of each reel.

## Voices
- Spoken parts: Gemini TTS, voice Leda (Achernar is a candidate). Free quota is about 10 clips per model per day, resetting 1:30 PM IST, shared by every run: never make several reels in parallel.
- Sung finale: ElevenLabs Music, one take (`generations_count` 1), checked before any retry; keep about 10k credits in reserve. When credits run out, use the free fallback: Leda chant over a synthesized drone (`voice-tests/bgm.py`).
- One voice per reel, never mixed. Reels already made with ElevenLabs Janaki stay as they are.
- Never pay ElevenLabs for word timings; derive them from silence or Gemini.

## Storage
- Voice clips live in Drive `chittiSlokalu/Sources`, listed in `sources.json`, never in git. Each reel's Inbox item `sloka-<id>` names its clips so the Inbox can hand them out.
- Finished reels and covers go only to Drive `chittiSlokalu/Reels`, through the Inbox upload (`./reel upload`). Never the How To Hero folder.
- Nothing is copied to the owner's Mac (no disk space). On the Mac, touch only this project's files.
