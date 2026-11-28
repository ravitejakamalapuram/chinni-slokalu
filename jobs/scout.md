# Idea scout (daily 9:47 AM IST)

Suggest new sloka reel ideas and send them to the Inbox for approval. Nothing else: no building, no voice, no publishing.

## Steps

1. List Inbox items for app "Chinni Slokalu" (all statuses), with `"limit":1000`. If 3 or more ideas (type `idea`) are still `pending`, stop and add nothing: the owner hasn't caught up.
2. Build the "already done or planned" list: every reel in `reels.json`, plus every Chinni Slokalu `idea` and `video` item in the Inbox in any status. A rejected idea is never suggested again.
3. Pick 2 slokas that are short, well known, kid-friendly and not on that list. Take them from the backlog below, in order; when the backlog is used up, choose your own and say so in the summary.
4. Check each sloka's exact text and meaning on the web (two sources must agree) before using it.
5. For each, add an Inbox item:
   - `id` `sloka-idea-<short-slug>`, `type` `idea`, `status` `pending`, `title` `<Sloka name> (idea)`
   - `summary`: the sloka in Telugu script, then a 2-3 line simple meaning in English, then a 3-5 line scene plan: one picture-story action per line that a child who can't read still gets (see `RULES.md`, Content).
   - `data`: `{"app":"Chinni Slokalu","icon":"🪔","group":"Ideas","sloka":"<slug>","text_te":"...","meaning":"...","scenes":["..."]}`
6. Finish with one short line: which ideas were sent, or why none.

## Backlog (in order)

Edit this list to steer the scout.

1. Karagre Vasate Lakshmi
2. Samudra Vasane Devi
3. Shuklam Baradharam
4. Om Namah Shivaya
5. Annapurne Sadapurne
6. Dakshinamurthy (Gurave Sarva Lokanam)
7. Ya Devi Sarva Bhuteshu
8. Manojavam Maruta Tulya Vegam
