# Agent Guidelines for Brobond Overseas

## Commands
- **Install**: `pnpm install`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Test**: `pnpm test` (Runs Vitest)
- **Single Test**: `pnpm vitest run path/to/test.ts`

## Code Style & Conventions
- **Stack**: React (Vite), TypeScript, Tailwind CSS, Shadcn UI, React Query.
- **Imports**: Use absolute paths with `@/` alias (e.g., `import { Button } from "@/components/ui/button"`).
- **Naming**:
  - Components/Pages: PascalCase (e.g., `ProductCard.tsx`, `AdminDashboard.tsx`).
  - Shadcn UI Components & Hooks: kebab-case filenames (e.g., `button.tsx`, `use-toast.ts`).
  - Functions/Variables: camelCase.
- **Styling**: Use Tailwind CSS classes. Avoid inline styles or CSS files unless necessary.
- **State**: Use React Query for server state; Context/local state for UI.
- **Types**: Strict TypeScript usage. Avoid `any`. Define interfaces/types in component files or `types.ts`.
- **Testing**: Write tests for logic-heavy components/hooks using Vitest + React Testing Library.

## Rules
- **Package Manager**: Use `pnpm` for all dependency management and script execution.
- Prefer existing Shadcn UI components over custom CSS.
- Ensure all new dependencies are strictly necessary and compatible with the existing stack.
