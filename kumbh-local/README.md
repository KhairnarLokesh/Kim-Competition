# Kumbh Local — Monorepo

This directory contains the source code monorepo for **Kumbh Local** (KIM Ignite 2026 — Track 3).

Please see the root documentation for full project details, architecture diagrams, and the judge walkthrough pitch:
👉 [**Root README.md**](../README.md)

---

## Workspaces Structure

- [`apps/web`](apps/web): Next.js 16 + React 19 + Tailwind CSS v4 Web Application
- [`apps/api`](apps/api): Express.js + TypeScript REST API Server
- [`apps/mobile`](apps/mobile): Android Native Kotlin / Jetpack Compose Application

## Quick Run Commands

```bash
# Install all dependencies across workspaces
npm install

# Run web client (http://localhost:3000)
npm run dev:web

# Run Express API server (http://localhost:5000)
npm run dev:api

# Run web + API concurrently
npm run dev
```
