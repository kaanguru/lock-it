# SvelteKit SSG Starter with Zod Form Validation

## Local-First Development Template

Single User offline-first app template to start your next project.
Using Dexie.js, SuperForms with SvelteKit and Skeleton UI for TailwindCSS styling.

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

[![Use this template](https://img.shields.io/badge/Generate-Use_this_template-2ea44f?style=for-the-badge)](https://github.com/kaanguru/local-first-template/generate)

![Static Badge](https://img.shields.io/badge/superforms-yellow?link=https%3A%2F%2Fsuperforms.rocks%2F)
![Static Badge](https://img.shields.io/badge/Skeleton_UI-red?link=https%3A%2F%2Fwww.skeleton.dev%2F)
![Static Badge](https://img.shields.io/badge/%20Dexie.js-blue?link=https%3A%2F%2Fdexie.org%2F)


</div>

## Ready for PWA development

**Using:**

- [Static site generation](https://kit.svelte.dev/docs/adapter-static) client-rendered single-page app (SPA) or (SSG)
- [Client-side Storage](https://dexie.org/)
IndexeDB database
- [SuperForms](https://superforms.rocks/concepts/spa) Single-page applications (SPA)

----
## Usage

- `pnpm install`
- `pnpm update`
- `pnpm dev`

## Used Formula

- [x] [Skeleton — UI Toolkit for Svelte + Tailwind](https://www.skeleton.dev/docs/get-started)
  - [x] `-npm create skeleton-app@latest my-skeleton-app`
- [x] [SvelteKit | Tauri Apps](https://tauri.app/v1/guides/getting-started/setup/sveltekit/#sveltekit-in-ssg-mode)
  - [ ] ` pnpm add -D @sveltejs/adapter-static `
  - [ ] Then update the `adapter` import in the `svelte.config.js` file
- [x] [Get started with Dexie in Svelte](https://dexie.org/docs/Tutorial/Svelte)
  - [ ]  ` pnpm install dexie@next `
  - [ ]  `src\lib\db.ts`
- [x] [Superforms for SvelteKit](https://superforms.rocks/concepts/spa)
  - [ ] `pnpm i -D sveltekit-superforms zod`
