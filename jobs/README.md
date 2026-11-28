# Scheduled jobs

Each daily scheduled task has a tiny saved prompt that says: clone this repo (main) and follow `jobs/<job>.md`. The real instructions live here, so changing a job is a pull request, not an edit to the scheduled task.

| Job | When (IST) | File |
| --- | --- | --- |
| Chinni Slokalu idea scout | daily 9:47 AM | [scout.md](scout.md) |
| Chinni Slokalu video job | daily 2:11 PM (after the 1:30 PM Gemini quota reset) | [video.md](video.md) |

What's merged to `main` is what the next run does, so review changes here like code.

Both jobs use the Inbox API at `$INBOX_URL` with `$INBOX_TOKEN` (environment variables; never print them). The API is documented in `docs/FAQ.md` of github.com/ravitejakamalapuram/inbox. Every Chinni Slokalu item has `data.app` "Chinni Slokalu"; the Inbox sends it to the "Chinni Slokalu approvals" Telegram group by itself.

Every `list` call needs `"limit":1000`. Without it the Inbox returns only the oldest 100 items of all apps, which can leave out every recent Chinni Slokalu item, so a job would think nothing is pending and add duplicates.
