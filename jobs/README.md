# Scheduled jobs

Each daily scheduled task has a tiny saved prompt that says: clone this repo (main) and follow `jobs/<job>.md`. The real instructions live here, so changing a job is a pull request, not an edit to the scheduled task.

| Job | When (IST) | File |
| --- | --- | --- |
| Chitti Slokalu idea scout | daily 9:47 AM | [scout.md](scout.md) |
| Chitti Slokalu video job | daily 2:11 PM (after the 1:30 PM Gemini quota reset) | [video.md](video.md) |

What's merged to `main` is what the next run does, so review changes here like code.

Both jobs use the Inbox API at `$INBOX_URL` with `$INBOX_TOKEN` (environment variables; never print them). The API is documented in `docs/FAQ.md` of github.com/ravitejakamalapuram/inbox. Every Chitti Slokalu item has `data.app` "Chitti Slokalu"; the Inbox sends it to the "Chitti Slokalu approvals" Telegram group by itself.
