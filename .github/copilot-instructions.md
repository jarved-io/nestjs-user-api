<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot Instructions — nestjs-user-api

Purpose: Help an AI coding assistant be immediately productive in this repository.

- **Big picture:** This is a NestJS (v10) REST API split into feature modules. The primary modules are `UsersModule` and `AuthModule` and the app uses `TypeOrmModule` (Postgres) and `ConfigModule` for env-driven config. See the main application module (file: `User Management API - Main Application Module` / `app.module.ts` in README) which wires `ConfigModule.forRoot()` and `TypeOrmModule.forRootAsync()`.

- **Core runtime flows:**
  - App bootstraps in `main.ts` (standard Nest bootstrap). Modules register controllers/services under `users/` and `auth/`.
  - Authentication: `auth/` exposes login and JWT strategy (`auth/strategies/jwt.strategy.ts`) and guards (`auth/guards/jwt-auth.guard.ts`). Use `Authorization: Bearer <token>` for protected endpoints.
  - Persistence: Entities are auto-globbed with `entities: [__dirname + '/**/*.entity{.ts,.js}']`. Database connection values come from environment variables via `ConfigService`.

- **Important files / directories to reference:**
  - `README.md` — high-level usage, env vars, and npm scripts.
  - `User Management API - Main Application Module` (module source in repo root) — example of TypeORM + Config wiring.
  - `users/` — DTOs, `user.entity.ts`, `users.service.ts`, `users.controller.ts`, and unit tests `users.service.spec.ts`.
  - `auth/` — login DTOs, guards, strategy, `auth.service.ts`, `auth.controller.ts`, and `auth.service.spec.ts`.

- **Project-specific conventions** (be precise):
  - DTO-first validation: use `class-validator`/`class-transformer` DTOs for input validation — examine `users/dto/*.ts` and `auth/dto/*.ts` for examples.
  - Password handling: passwords are hashed with `bcrypt` (salt rounds = 10). Passwords must not be returned in API responses — strip or omit them explicitly in services/controllers.
  - Environment variables drive behavior: `NODE_ENV` toggles `synchronize` (disabled in production), and `JWT_SECRET` + `JWT_EXPIRATION` control tokens.
  - Tests: unit tests target services (Jest); tests live alongside the service (`*.spec.ts`) and frequently mock external dependencies.

- **Developer workflows / commands (use PowerShell on Windows):**
  - Install: `npm install`
  - Dev run (watch): `npm run start:dev`
  - Build + prod: `npm run build` ; `npm run start:prod`
  - Tests: `npm run test` ; coverage: `npm run test:cov` ; watch: `npm run test:watch`
  - DB setup: create Postgres DB (`CREATE DATABASE nestjs_api;`) and set `.env` with `DB_*` and `JWT_SECRET`.

- **When making code changes, follow these concrete rules:**
  - Keep Nest module boundaries: add new features as modules under `src/` (or sibling folders following README layout). Don't introduce global singletons unless added to `ConfigModule` or marked `isGlobal`.
  - For DB changes, add/modify entity files (`*.entity.ts`) and ensure migrations or `synchronize` behavior is considered. The repo currently uses TypeORM sync for non-production.
  - Match existing DTO patterns: prefer separate `create-*.dto.ts` and `update-*.dto.ts` files and reuse validation decorators.
  - Tests: update or add unit tests next to the modified service/controller, mocking TypeORM repositories via `getRepositoryToken`.

- **Examples to copy from codebase:**
  - TypeORM async config (from app module): use `ConfigService` to read `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`.
  - Guard usage: apply `@UseGuards(JwtAuthGuard)` on protected controllers or individual routes.

- **Integration & external dependencies**
  - Postgres (TypeORM): ensure migrations or DB schema management when changing entities.
  - JWT: `JWT_SECRET` must be provided in `.env` for auth flows and tests that depend on tokens.

Notes for the assistant: prefer minimal, focused diffs; reference the exact files above when suggesting changes. Ask about missing files or local setup if you need to run tests or start the app (I may not have access to a running Postgres instance).

If this is helpful, I can update or expand any section (examples, test patterns, or a short checklist for PR reviews).
