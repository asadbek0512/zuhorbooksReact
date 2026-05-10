# ZuhorBooks Frontend

React SPA frontend for the ZuhorBooks book platform — catalog browsing, ordering, member profiles, and help pages.

## Tech Stack

- Framework: React 18 + TypeScript (Create React App)
- UI: MUI 5 (MaterialTheme)
- State: React Context + local state
- API: REST service layer (Axios-based)
- Real-time: Socket.IO via `SocketContext`
- Styling: CSS modules
- Deploy: serve (port 3004 in production)

## Architecture

```
src/
├── app/
│   ├── App.tsx                   # Root component with providers
│   ├── MaterialTheme/            # MUI theme customization
│   ├── components/               # Reusable UI components
│   ├── context/
│   │   ├── ContextProvider.tsx   # Global auth and cart state
│   │   └── SocketContext.tsx     # Socket.IO connection
│   ├── hooks/                    # Custom hooks
│   ├── screens/                  # Page components
│   │   ├── homePage/
│   │   ├── productsPage/
│   │   ├── ordersPage/
│   │   ├── userPage/
│   │   └── helpPage/
│   └── services/                 # API call functions
│       ├── MembertService.ts
│       ├── OrderService.ts
│       └── ProductService.ts
└── lib/
    ├── config.ts                 # API base URL and constants
    ├── data/                     # Static data
    ├── enums/                    # Shared enums
    ├── sweetAlert.ts             # sweetalert2 helpers
    └── types/                    # TypeScript interfaces

public/
```

## Key Conventions

- React SPA (not Next.js) — all routing is client-side
- All API calls go through `src/app/services/` — never call axios directly from components
- Global state via React Context (`ContextProvider.tsx`) — no Redux
- Socket.IO connected globally via `SocketContext.tsx`
- User alerts via `sweetalert2` through `src/lib/sweetAlert.ts`

## Auth Flow

1. User calls `MembertService.ts` login → POST to backend REST endpoint
2. Backend returns JWT → stored in `ContextProvider` state
3. All protected API calls include `Authorization: Bearer {token}` header
4. On logout: token cleared from Context, user redirected to home

## Commands

```bash
npm start           # Dev server (port 3000)
npm run build       # Production build (output: build/)
npm run start:prod  # Serve production build on port 3004
npm test            # Run tests
```

## Environment Variables

Key variable (configured in `src/lib/config.ts`):

- `REACT_APP_API_URL` — Backend REST API base URL

## Deployment

VPS: production build served via `serve` on port 3004. Deployed via `deploy.sh`.
