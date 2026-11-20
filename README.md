# Express.js · Homework 03 · PUG & EJS

An Express 5 project for Homework 62.1: adding server-rendered HTML templates to an existing REST API while keeping its CRUD endpoints, middleware, and sessions working.

## Current baseline

This initial commit copies the **working Express HW-02 API**, without its static Playground or Pages deployment. PUG user pages and EJS article pages will be implemented in separate pull requests.

- Express 5 REST API for users and articles, backed by in-memory Maps
- Logging, validation, demo authentication, article access control, and error handling
- `express-session` for a demonstration session visit counter
- Vitest + Supertest regression suite (36 tests)

## Install and run

Requirements: Node.js 24 and Yarn Classic 1.22.22.

```bash
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile
npm test
npm start
```

The local server listens at `http://localhost:3000`. Stop it with `Ctrl+C`.

## Planned HTML pages

The next PRs will add the server-rendered pages required by the assignment:

| Route | Template engine | Page |
| --- | --- | --- |
| `GET /users` | PUG | Users list |
| `GET /users/:userId` | PUG | User details |
| `GET /articles` | EJS | Articles list |
| `GET /articles/:articleId` | EJS | Article details |

The existing JSON REST operations must remain available. Templates must render from the same server-side Maps, rather than from duplicated arrays or a browser-only simulation.

## Existing API and middleware

Existing `GET`, `POST`, `PUT`, and `DELETE` operations are under `/users` and `/articles`. Additional routes are `POST /users/strict`, `POST /articles/strict`, `GET /session`, and `DELETE /session`.

Demonstration authentication is **not production security**. Session state uses an in-memory store and is not appropriate for production deployment.

## Tests

```bash
npm test
```

The 36 existing HW-02 regression tests are preserved in this baseline. Separate tests for HTML rendering will be added with the new views. No tests are copied from the optional HW-03 reference archive.

---

Copyright © 2026 Andrii Dolzhenko.
