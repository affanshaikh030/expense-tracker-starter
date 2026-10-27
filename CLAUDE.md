# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (default http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint across all .js/.jsx files
- `npm test` — run tests / code quality validation
- `npm run preview` — serve the production build locally

## Architecture

This is a single-page React expense tracker app built with Vite. The codebase is organized into modular child components:

- **`src/App.jsx`**: The main container component that manages the primary `transactions` state (seeded from `INITIAL_TRANSACTIONS`) and orchestrates child components. It owns transaction `id` (`crypto.randomUUID()`) and `date` creation in `handleAddTransaction`.
- **`src/constants.js`**: Shared `CATEGORIES`, `CATEGORY_COLORS`, `PALETTE`, and the seed `INITIAL_TRANSACTIONS`.
- **`src/utils/format.js`**: Shared helpers `formatCurrency`, `capitalize`, and `normalizeCategory` (lowercases, defaults to `other`).
- **`src/components/Summary.jsx`**: Receives `transactions` as a prop, calculates total income, total expenses, and net balance in a single memoized pass, and renders summary metric cards.
- **`src/components/SpendingChart.jsx`**: Visualizes expense spending aggregated by category using Recharts (supporting both responsive Bar and Pie chart views with tooltips and legends). Aggregation is memoized and static Recharts props are hoisted to module constants.
- **`src/components/TransactionForm.jsx`**: Encapsulates form state (a single `form` object with `description`, `amount`, `type`, `category`), validates input (trimmed description, positive finite amount, inline error), and submits only those four fields to the parent via `onAddTransaction`.
- **`src/components/TransactionList.jsx`**: Takes only `transactions` and `onDeleteTransaction`. Manages filtering controls (by type and category) internally, renders the memoized filtered transaction table, and supports deleting transactions.
- **Root re-exports** (`src/Summary.jsx`, `src/SpendingChart.jsx`, `src/TransactionForm.jsx`, `src/TransactionList.jsx`): Re-export components from `src/components/` for convenient root-level imports.

**Skills & Workflows:**
- **`deploy`** (`.agents/skills/deploy/SKILL.md`): Custom deployment skill that runs tests first, builds the production bundle, and pushes release assets to the staging area.

- **`frontend-design`** (`.agents/skills/frontend-design/SKILL.md`): Creative, production-grade frontend design guidance.


**Known intentional issues / notes:**
- Transaction amounts were originally stored as strings; calculations in `Summary.jsx` and `SpendingChart.jsx` parse amounts with `parseFloat` to prevent string concatenation.
- In the initial seed data, "Freelance Work" is mislabeled as an expense as part of course exercises.
- Uses `recharts` alongside `react-is` for React 19 compatibility.

## Lint

ESLint is configured with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. The `no-unused-vars` rule ignores variables starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
