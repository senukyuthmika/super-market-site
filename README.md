# AstraMart - Neon Commerce Galaxy

AstraMart is a high-impact, fully responsive Single Page Application built for the **CS3404 GUI Programming Mini Project**. It turns the DummyJSON products dataset into a futuristic shopping experience with a polished visual system, strict TypeScript models, and all major bonus features from the brief.

## Core idea

Instead of creating a plain product grid, AstraMart presents the store like a cinematic mission dashboard:

- immersive neon hero section and glassmorphism card system
- responsive search, category filtering, and sorting controls
- dynamic product detail pages with galleries, specs, and review panels
- persistent cart and favorites powered by Pinia + localStorage
- JWT authentication simulation using DummyJSON `/auth/login`
- light/dark theme toggle with manual class-based dark mode

## Features implemented

### Mandatory requirements

- Vue 3 with Composition API
- TypeScript with strict interfaces and no `any`
- Vite build setup
- Tailwind CSS styling
- reusable components instead of one large `App.vue`
- fully responsive layout for mobile, tablet, and desktop
- data fetched from DummyJSON products endpoints
- live search and category filtering
- detail view for each item via dynamic routing

### Bonus features included

- **Authentication simulation** using `/auth/login`
- **Shopping cart** with persistent localStorage state
- **Bookmarks / favorites** with persistent localStorage state
- **Dynamic routing** with Vue Router (`/product/:id`)
- **Dark mode** toggle using Tailwind `dark:` modifiers

## Tech stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Pinia
- Vue Router
- DummyJSON REST API

## Project structure

```
astramart-spa/
├── src/
│   ├── components/
│   ├── composables/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── App.vue
│   ├── main.ts
│   └── styles.css
├── README.md
├── Report.pdf
└── prompts.txt
```

## Installation

1. Make sure you have a recent Node.js version installed.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build:

```bash
npm run preview
```

## Demo login credentials

Use the DummyJSON demo account shown inside the modal:

- Username: `emilys`
- Password: `emilyspass`

## Architecture summary

- `pages/` contain route-level screens.
- `components/` contain reusable UI building blocks.
- `stores/` manage auth, cart, favorites, and modal state.
- `services/` wraps all API calls.
- `types/` contains strict interfaces for DummyJSON responses.
- `composables/` manages theme behavior.
- `utils/` stores formatting and localStorage helpers.

## Submission note

This package includes the full source code, this README, a PDF report, and a `prompts.txt` log aligned with the course brief.
