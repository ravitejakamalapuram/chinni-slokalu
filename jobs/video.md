# Video job (daily 2:11 PM IST)

Make at most ONE reel per run. Follow `README.md` and `RULES.md` in this repo. Render here in the cloud; never copy reels to the owner's Mac (no disk space).

## 1. Pick and claim the work

In this order:

a. A rejected redo: a `video` item of app "Chinni Slokalu" with status `rejected`, either `sloka-video-*` or `sloka-<reel id>` (see `RULES.md`, Redos). A rejected item is closed, so `claim` refuses it: first `update` it to status `building` with `ifVersion`, then `claim` it. Read `data.rejections`: fix the reasons dated after the item was last redone (normally just the newest one). Older reasons were fixed by earlier runs, so don't redo that work. A reason about pronunciation or the voice is a voice redo (`RULES.md`, Redos); a reason about the pictures is a visual redo.

b. Otherwise an approved idea: `list` `type` `idea`, `status` `approved`, `"limit":1000`, keep only `data.app` "Chinni Slokalu", take the oldest, `claim` it by `id`, then `update` it to status `building` with `ifVersion`. Don't use `claimNext`: it has no app filter and takes other apps' ideas. Use the idea's text, meaning, scene plan and any approval note.

If neither exists, finish with one line saying nothing was approved.

## 2. Plan

Write the scene plan from the meaning first (`RULES.md`, Content): one "we see X, then Y happens" sentence per line in the reel's `scenes.js` header. Copy `asatoma/` for a new reel; a visual redo keeps its voice clips (`./reel fetch <id>`).

## 3. Voice (new reels and voice redos)

- Spoken parts: Gemini TTS voice Achernar for new reels (owner's choice 2026-11-26; voice redos keep the reel's own voice). The reel's `gen.py` (see `karagre/`) makes all nine clips; one reel uses about 10 TTS requests. Prefer the AI Studio speech playground in the owner's Brave (Claude in Chrome) when the Mac is on, since it has no quota wait; otherwise `GEMINI_API_KEY` (free tier, about 10 clips per model per day).
- Sung finale: ElevenLabs Music, one take (`generations_count` 1), checked before any retry, keeping about 10k credits in reserve. If credits are short, use the free fallback, a chant in the reel's own voice over a drone (`voice-tests/bgm.py`).
- If the voice can't be made today, put the item back to `approved`, release the claim, and finish with one line saying why.

## 4. Build, check, render

`./reel build <id>`, then snapshot every scene before and after its meaning moment and check a child could tell what changed with the sound off. Then `./reel render <id>` (about 10 minutes; run it in the background) and `./reel cover <id>`.

## 5. Upload and update the Inbox

- `./reel upload` the video and the cover (`DRIVE_REELS_FOLDER` must point at Chinni Slokalu/Reels). Uploading the same name replaces the old file and gives a new id.
- New reel: upload its voice clips to Drive `Chinni Slokalu/Sources` and add them to `sources.json`. Add a `video` item `sloka-<reel id>` (the id `./reel fetch` asks the Inbox for), title `<Sloka name> reel`, status `pending`, summary = one line on what it shows plus the Drive links to the video and cover, with `driveId`, `link`, and `data` `{"app":"Chinni Slokalu","icon":"🪔","group":"Reels","reel":"<slug>","idea":"<idea id>","thumb":"<cover id>","links":{...},"sources":{...}}`. Set the idea to `done`.
- Redo: update the same item (new `driveId`, `link`, `data.thumb`, `data.links`, a summary of what changed, status `pending`), keeping `data.rejections` and `data.posted`. Don't ask for approval in chat; the owner reviews in the Inbox.
- Release the claim.

### Post text

Every reel item carries `data.meta`: the YouTube title and description and the Instagram and Facebook captions, which the publisher posts as they are. Write the reel's `"post"` entry in `reels.json`, in the owner's caption style (see the guru and karpura entries):

- `name`, `name_te`: the sloka's common name in English and Telugu.
- `hook`: one line, 1 or 2 emojis that fit the deity, the sloka's best-known words, " – ", what it is "for Kids", one closing emoji. Example: "🙏✨ Guru Brahma Guru Vishnu – A Beautiful Sloka for Kids 🌸".
- `blurb`: two warm sentences to parents: what it teaches the child, then "Let this … fill their hearts with …", ending in " ❤️🪔".
- `blessing`: the deity's greeting, like "🙏 Jai Guru Deva!" or "🙏 Har Har Mahadev!".
- `when`: when it is said, in English then Telugu.
- `tags`: 2 or 3 CamelCase hashtags for the sloka and deity, like "KarpuraGauram", "LordShiva" (the standard channel tags are added).

`./reel meta` adds the rest by itself: the tagline, the channel hashtags, and on YouTube the sloka with its meaning and the Instagram link. Check the text with `./reel meta <id>`, then save it with `./reel meta <id> --push`. The script stops if a field is missing or a text is over a platform's limit (Instagram 5 hashtags and 2,200 characters, YouTube title 100 characters and description 5,000 bytes). A redo keeps its meta, and pushes again only when the sloka or its meaning changed.

Each run, also push meta for one existing Chinni reel item that is not posted yet and whose meta is missing or in the old style (its caption has no "🎶 Learn • Chant • Grow with Devotion!"); fill its `post` entry first. Keep going until every unposted reel has it.

## 6. Save the code

Commit the reel's code (scenes, build script, `reels.json`, `sources.json`, `covers/covers.json`) on a branch, open a pull request, and merge it, so the next run starts from it. Add one line about the run, and any new gotcha, to project memory `video-job-runs.md`.

Never post anywhere yourself. Once the owner approves a reel, the How To Hero publisher posts it at its slot (one a day) to the accounts in the Inbox's "Posts to" for Chinni Slokalu.

Finish with one short line: what was built or redone and its Drive link, or why nothing was.
