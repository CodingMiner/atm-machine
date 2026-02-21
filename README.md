# ATM Machine

A browser based ATM simulator built with React, TypeScript, Tailwind CSS and Vite.

**Live demo:** https://codingminer.github.io/atm-machine/

## Features

- Deposit and withdraw money from a single virtual account
- ATM style numeric keypad(digits 0-9, clear, backspace)
- Real time amount display as you type
- Overdraft protection — cannot withdraw more than the current balance
- Zero amount validation

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Install and run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test                # unit tests, run once
npm run test:watch      # unit tests, watch mode
npm run test:e2e        # Playwright e2e tests(starts dev server automatically)
```

### Money utilities

All money logic lives in `src/utils/atm.ts` as pure functions with no side effects.

These are fully unit tested in `src/utils/atm.test.ts`.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Vitest(unit tests)
- Playwright(e2e tests)
