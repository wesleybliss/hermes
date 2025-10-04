# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Hermes Mail** is a Gmail clone built with Next.js 15, Firebase Authentication, and Google Genkit AI for Gmail API integration. The app authenticates users via Google OAuth, fetches their Gmail messages, and displays them in a modern mail client interface.

**Stack:**
- Next.js 15.3.3 (App Router)
- React 18 with TypeScript
- Firebase (Auth, Firestore)
- Google Genkit AI (for Gmail API integration flows)
- Tailwind CSS v3 + shadcn/ui components
- Package Manager: pnpm

**Key Characteristics:**
- Modern ES7+ syntax: no semicolons, minimal brackets/parens
- JSDoc typedefs organized by category in `src/lib/typedefs/`
- Server components by default; client components marked with `'use client'`
- Path alias: `@/*` maps to `./src/*`

## Essential Commands

### Development
```bash
pnpm dev              # Start Next.js dev server on port 9002 (custom port)
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
```

### Genkit AI Development
```bash
pnpm genkit:dev       # Start Genkit dev UI (for testing AI flows)
pnpm genkit:watch     # Start Genkit dev UI with hot reload
```

### Package Management
```bash
pnpm add <package>                        # Install dependency
pnpm add -D <package>                     # Install dev dependency
pnpm dlx shadcn@latest add <component>    # Add shadcn/ui component
```

### Testing & Quality
```bash
pnpm lint             # Check ESLint rules
pnpm typecheck        # Verify TypeScript types
```

## Environment Setup

Create a `.env` file in the project root with:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** Firebase config is in `src/firebase/config.ts` and is designed to work with both development (local config) and production (Firebase App Hosting environment variables).

## Architecture Overview

### Directory Structure
```
src/
├── ai/                         # Genkit AI flows and configuration
│   ├── genkit.ts              # Genkit instance with Google AI plugin
│   ├── dev.ts                 # Entry point for Genkit dev tools
│   └── flows/
│       └── gmail.ts           # Gmail API integration flow (OAuth + message fetching)
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout with Firebase & Tooltip providers
│   └── page.tsx               # Main page: auth flow + mail display
├── components/
│   ├── mail/                  # Email-specific components
│   │   ├── mail-app.tsx       # Main mail application container
│   │   ├── mail-list.tsx      # Email list view
│   │   ├── mail-view.tsx      # Individual email detail view
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── compose-dialog.tsx # Email compose dialog
│   └── ui/                    # shadcn/ui components (DO NOT modify directly)
├── firebase/                  # Firebase initialization and hooks
│   ├── config.ts              # Firebase project configuration
│   ├── index.ts               # Firebase SDK initialization
│   ├── provider.tsx           # Context provider for Firebase services
│   ├── client-provider.tsx    # Client-side Firebase provider wrapper
│   └── firestore/
│       ├── use-collection.tsx # Firestore collection hook
│       └── use-doc.tsx        # Firestore document hook
├── hooks/
│   ├── use-mobile.tsx         # Responsive mobile detection hook
│   └── use-toast.ts           # Toast notification hook
└── lib/
    ├── types.ts               # Core TypeScript types (Mail, Label, Account)
    ├── mail-data.ts           # Static mail data and labels
    └── utils.ts               # Utility functions (cn, etc.)
```

### Key Architectural Patterns

#### 1. Firebase Authentication Flow
- `FirebaseClientProvider` wraps the app in `app/layout.tsx`
- Initializes Firebase on client side with auto-detection of production vs. development
- `useUser()` hook provides authenticated user state throughout the app
- Google OAuth with Gmail API scopes requested during sign-in

#### 2. Genkit AI Flows
- AI flows are defined in `src/ai/flows/` using Genkit's `defineFlow` API
- `listMessagesFlow`: Fetches Gmail messages with OAuth authentication
  - Enforces required Gmail scopes via `authPolicy`
  - Accesses Gmail API using user's access token
  - Parses email headers and body content
  - Returns structured `Mail[]` objects
- Flows are executed from client components but run on the server (`'use server'`)

#### 3. Component Architecture
- **Server Components (default):** Most components render on server unless interactive state is needed
- **Client Components:** Marked with `'use client'`, used for:
  - Forms and user interactions
  - Firebase hooks (`useUser`, `useAuth`)
  - React state management
- **Mail App Structure:**
  - `mail-app.tsx`: Top-level container managing mail list and detail view
  - `mail-list.tsx`: Displays list of emails with sender, subject, date
  - `mail-view.tsx`: Shows full email content
  - `sidebar.tsx`: Navigation with folders (Inbox, Sent, etc.) and labels

#### 4. State Management
- Small state: use `useState` within components
- Global state: use `useWireState` and `useWireValue` from `@forminator/react-wire`
  - Define global state in `src/store/` (pattern, but directory may not exist yet)
- Firebase auth state: managed by `FirebaseProvider` context

#### 5. Type System
- TypeScript with JSDoc typedefs for additional documentation
- Core types in `src/lib/types.ts`: `Mail`, `Label`, `Account`
- Typedefs should be organized by category in `src/lib/typedefs/` (e.g., `users.typedefs.js`)

## Development Notes

### Custom Port
The dev server runs on **port 9002** (not the default 3000). This is configured in `package.json`:
```json
"dev": "next dev --turbopack -p 9002"
```

### Genkit Dev Tools
To test Gmail API flows independently:
1. Run `pnpm genkit:dev` to start the Genkit developer UI
2. Navigate to the local URL (usually http://localhost:4000)
3. Test flows with authentication in the browser

### Firebase Initialization
`src/firebase/index.ts` contains special logic:
- In production (Firebase App Hosting): attempts to auto-initialize without config
- In development: falls back to `firebaseConfig` object
- **Do not modify the initialization logic** without understanding this dual-mode behavior

### shadcn/ui Components
- Located in `src/components/ui/`
- **Ask before modifying** these components directly
- Prefer wrapping them in custom components for app-specific behavior
- Add new components via: `pnpm dlx shadcn@latest add <component>`

### Code Style
- **No semicolons**, minimal brackets/parens (ES7+ style)
- Match existing component patterns before writing new code
- Review similar files for spacing and formatting conventions
- Run `pnpm lint` after refactoring to catch issues

### Linting and Type Checking
- Always run `pnpm lint` before committing
- Run `pnpm typecheck` to catch TypeScript errors
- Use `pnpm lint --fix` for auto-fixable issues (if available in ESLint config)
- Next.js build **ignores** TypeScript and ESLint errors (see `next.config.ts`)

### Git Workflow
- **Do NOT auto-commit** unless explicitly instructed
- Run `pnpm lint` and `pnpm typecheck` before committing
- Use conventional commit messages
- Keep commits atomic and focused

## Common Development Tasks

### Adding a New Component
1. Check for similar components in `src/components/mail/` or `src/components/ui/`
2. Match existing patterns (client vs. server, prop typing, file structure)
3. Use JSDoc for complex prop types
4. Import types from `src/lib/types.ts`

### Working with Gmail API
- Gmail integration is handled through Genkit flows in `src/ai/flows/gmail.ts`
- OAuth scopes are defined in the flow's `authPolicy`
- Access tokens are passed from Firebase Auth to the Gmail API via `googleapis` library

### Fetching Emails
- Emails are fetched in `src/app/page.tsx` via `listMessagesFlow()`
- Flow requires authenticated user with Gmail readonly scope
- Messages are parsed and converted to `Mail` objects with structured fields

### Adding a New Route
- Create new directories/files under `src/app/` following App Router conventions
- Use `layout.tsx` for shared layouts
- Use `page.tsx` for page components
- Mark as `'use client'` only if client-side interactivity is needed

## Troubleshooting

### Build Fails
- Run `pnpm typecheck` to identify TypeScript errors
- Run `pnpm lint` to check for linting issues
- Check that all imports resolve correctly

### Firebase Auth Issues
- Verify Firebase config in `src/firebase/config.ts`
- Ensure user is authenticated before accessing protected resources
- Check browser console for Firebase SDK errors

### Gmail API Errors
- Verify `GEMINI_API_KEY` is set in `.env`
- Check that OAuth scopes include `https://www.googleapis.com/auth/gmail.readonly`
- Use Genkit dev tools (`pnpm genkit:dev`) to debug flows

### Port Already in Use
The dev server uses port 9002. If unavailable:
```bash
# Find and kill process using port 9002
lsof -ti:9002 | xargs kill -9

# Or change port in package.json
"dev": "next dev --turbopack -p <new_port>"
```

## Testing Guidance

While there's no test suite defined yet, follow these principles:
- Add tests for any new utility functions
- Test complex component logic
- Verify Firebase integration with actual auth flows
- Use Genkit dev UI to test AI flows independently

## References

- **AGENTS.md**: Contains detailed code style guidelines and project conventions
- **docs/blueprint.md**: Original project specification and design goals
- Next.js 15 Documentation: https://nextjs.org/docs
- Firebase Documentation: https://firebase.google.com/docs
- Genkit Documentation: https://firebase.google.com/docs/genkit
- shadcn/ui: https://ui.shadcn.com/
