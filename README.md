# Exam Prep — Year 5 (11+ practice)

Private revision app for Maths, English and Science. Static SPA built with Vite + React + Tailwind. Deployed to GitHub Pages.

## Run locally

```sh
npm install
npm run dev
```

Then open <http://localhost:5173/exam-prep/>.

## Layout

- `materials/` — raw photos + cleaned `.md` notes per section (one source of truth for content)
- `src/data/` — typed content compiled from the notes
- `src/modes/` — the study modes (Home, Study, Quiz, Flashcards, …)
- `src/lib/` — `storage` (localStorage progress), `grading` (fuzzy short-answer match)
