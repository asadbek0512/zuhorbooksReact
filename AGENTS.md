# AI Agent Guide — ZuhorBooks Frontend

This file helps AI coding agents understand the React frontend quickly.

## What is this?

A React 18 SPA (Create React App) for the ZuhorBooks book platform. Uses MUI for UI, React Context for global state, and a REST service layer to talk to the Express backend. This is plain React — no Next.js routing or SSR.

## Quick orientation

| What | Where |
|---|---|
| Page components | `src/app/screens/{feature}/` |
| Reusable UI | `src/app/components/` |
| API calls | `src/app/services/` |
| Global state | `src/app/context/ContextProvider.tsx` |
| Socket.IO | `src/app/context/SocketContext.tsx` |
| Custom hooks | `src/app/hooks/` |
| MUI theme | `src/app/MaterialTheme/` |
| TypeScript types | `src/lib/types/` |
| Enums | `src/lib/enums/` |
| Constants / base URL | `src/lib/config.ts` |

## Architecture decisions

- React SPA — all routing is client-side, no server-side pages
- Service layer pattern: all API calls go through `src/app/services/`, not inline in components
- React Context for auth state and cart — no Redux or external state library
- MUI 5 with custom MaterialTheme for consistent styling
- Socket.IO connected globally via `SocketContext`

## Key patterns to follow

- New screen: add to `src/app/screens/{feature}/`, register in router inside `App.tsx`
- New API call: add a method to the appropriate service in `src/app/services/`
- New type: add to `src/lib/types/` — keep in sync with backend response shapes
- Alerts: use `sweetalert2` via `src/lib/sweetAlert.ts`
- Never call `fetch` or `axios` directly from components — always go through services

## Auth flow

1. Login calls `MembertService.ts` → POST to backend login endpoint
2. JWT token stored in `ContextProvider` state
3. Services read token from context and include it in `Authorization` header
4. Logout: clears context state, redirects to homepage

## Build and verify

```bash
npm install         # Install deps
npm run build       # Production build — catches type errors
npm test            # Run tests
npm start           # Dev server
```

## Things to avoid

- Using Next.js patterns (`getServerSideProps`, `app/` directory, etc.)
- Calling API endpoints directly from components — use service functions
- Hardcoding the backend URL — read from `src/lib/config.ts`
- Using `console.log` in production code
- Adding new state management libraries (use existing React Context)
