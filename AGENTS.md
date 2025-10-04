# AGENTS.md

## Project Overview
- **Stack**: Next.js, Tailwind CSS v4, shadcn/ui
- **Package Manager**: pnpm
- **Style**: Modern ES7+ (no semicolons, minimal brackets/parens)
- **Type System**: JSDoc typedefs organized by category in `@src/lib/typedefs/`

## Dev Environment Tips
- Use `pnpm dev` to start the Next.js development server
- Run `pnpm add <package>` to install dependencies (always use latest versions unless specified)
- Check `package.json` scripts for project-specific commands before inventing new ones
- Use `pnpm dlx` for one-off CLI tools instead of global installs
- shadcn/ui components should be added via `pnpm dlx shadcn@latest add <component>`

## Code Style Guidelines
- **No semicolons, minimal brackets/parens**: Follow ES7+ concise syntax
- **Spacing & formatting**: Match existing component patterns—review similar files first
- **Typedefs**: Use JSDoc typedefs sparingly where they add value, not for every variable
- **Typedef organization**: Group by category in `@src/lib/typedefs/` (e.g., `users.typedefs.js`, `api.typedefs.js`)
- **Component structure**: Follow Next.js 14+ patterns (app directory, server/client components)
- **Tailwind**: Use v4 syntax and utility classes consistently with existing components

## Linting & Quality Checks
- Run `pnpm lint` to check ESLint rules before committing
- Fix all linting errors—don't bypass rules without discussion
- After refactoring imports or moving files, always run `pnpm lint` to catch issues
- Use `pnpm lint --fix` to auto-fix formatting issues when possible

## Testing Instructions
- Run `pnpm test` to execute the full test suite
- Run `pnpm test:watch` for interactive test development (if defined in scripts)
- Add or update tests for any code changes, even if not explicitly requested
- Ensure all tests pass before considering work complete
- For specific test files: `pnpm test <filename>` or use test runner patterns

## Git & Commit Guidelines
- **Do NOT make automatic Git commits** unless explicitly instructed
- Write clear, descriptive commit messages following conventional commits format
- Keep commits focused and atomic when possible
- Run `pnpm lint` and `pnpm test` before committing

## Decision Making
- **Ask for clarification** if requirements are ambiguous or multiple approaches are viable
- **Check existing patterns** before introducing new conventions
- **Use latest versions** of all packages unless explicitly told otherwise
- **Follow project conventions** over general best practices when they differ

## Component Development
- Review similar components for style/structure patterns before creating new ones
- Use TypeScript-style JSDoc comments for complex component props
- Prefer composition over prop drilling
- Keep server components as default; mark client components explicitly with `'use client'`
- Co-locate related utilities/helpers with components when appropriate
- Ask before modifying any Shadcn/UI components (in `@src/components/ui`), or prefer wrapping them in a custom component
- Do not delete comments unless you've written them yourself

## State management
- For a small number of `useState` values, keep them in the component
- For larger sets of state values, or for values that would benefit from being global, use `useWireState` and `useWireValue` from `@forminator/react-wire`, defining global state values in `@src/store`

## Common Commands Reference
```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Check linting rules
pnpm lint:fix         # Auto-fix linting issues
pnpm test             # Run test suite
pnpm add <package>    # Add dependency
```
