# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (default http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint across all .js/.jsx files
- `npm run preview` — serve the production build locally

## Architecture

This is a single-page React expense tracker app built with Vite. The codebase is organized into modular child components:

- **`src/App.jsx`**: The main container component that manages the primary `transactions` state and orchestrates child components.
- **`src/components/Summary.jsx`**: Receives `transactions` as a prop, calculates total income, total expenses, and net balance, and renders summary metric cards.
- **`src/components/TransactionForm.jsx`**: Encapsulates form state (`description`, `amount`, `type`, `category`) and submits new transactions to the parent via `onAddTransaction`.
- **`src/components/TransactionList.jsx`**: Manages filtering controls (by type and category) and renders the filtered transaction table.
- **Root re-exports** (`src/Summary.jsx`, `src/TransactionForm.jsx`, `src/TransactionList.jsx`): Re-export components from `src/components/` for convenient root-level imports.

**Known intentional issues / notes:**
- Transaction amounts were originally stored as strings; calculations in `Summary.jsx` parse amounts with `parseFloat` to prevent string concatenation.
- In the initial seed data, "Freelance Work" is mislabeled as an expense as part of course exercises.

## Lint

ESLint is configured with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. The `no-unused-vars` rule ignores variables starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
