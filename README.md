# E Commerce

A simple, user‑friendly e‑commerce demo built with **Next.js 15 (App Router)**, **React (JS)**, **Tailwind**, **Axios**, and **json-server**.

## Run Locally

```bash
npm install

# Create .env.local in the project root:
# NEXT_PUBLIC_API_BASE=http://localhost:4001

npm run seed       # populates products (fetches from FakeStore API)
npm run dev:all    # runs Next.js + json-server together
```

- App: **http://localhost:3000**
- API: **http://localhost:4001**
- Demo user: **demo@mobiversite.com** / **123456**

## Design Decisions

- **User‑friendly, web‑first UX:** Desktop layouts are prioritized; the UI is fully responsive and works cleanly across mobile screen sizes.
- **json-server for API:** Lightweight fake REST to keep focus on the frontend; no separate backend setup needed.
- **Themes & i18n:** Light/Dark/System theme support and TR/EN dictionaries for a realistic feel.
- **State model:** React Context + localStorage for cart and wishlist persistence.
- **App Router structure:** Lists/details as Server Components where possible; interactive parts (cart, modals, toggles) as Client Components.

## Implementation Summary

- **Authentication:** `/api/login`, `/api/logout`, and `/api/session` manage a cookie‑based session. The header listens for session changes.
- **State management:** `CartContext` and `WishlistContext` provide add/remove/quantity/update helpers; totals are derived and persisted in localStorage.
- **API communication:** Axios instance (`lib/api.js`) talks to json-server routes: `GET /products`, `GET /products/:id`, `POST /orders`, `GET /orders?userId=...`, `GET /users?email=&password=`.
- **Checkout flow:** `/cart` → login inline modal if needed → confirmation modal → `/profile?checkout=1`.
