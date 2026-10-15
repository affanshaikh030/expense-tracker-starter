# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (default http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint across all .js/.jsx files
- `npm run preview` — serve the production build locally

## Architecture

This is a single-page React expense tracker app using Vite. All application logic currently lives in `src/App.jsx` as one monolithic component — there are no separate components, routing, or state management libraries.

**Known intentional issues:** The app has a bug where transaction amounts are stored as strings instead of numbers, causing the income/expense/balance summary to concatenate strings instead of summing. "Freelance Work" is also mislabeled as an expense. These are part of the course exercises.

## Lint

ESLint is configured with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. The `no-unused-vars` rule ignores variables starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
