# Express.js · Homework 03 · PUG & EJS

An Express 5 project for Homework 62.1: adding server-rendered HTML templates to an existing REST API while keeping its CRUD endpoints, middleware, and sessions working.

## Current baseline

This project is based on the **working Express HW-02 API**, without its old static Playground or Pages deployment. PUG user pages and EJS article pages use separate rendering engines and share the same server data.

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

## Server-rendered HTML pages

The assignment calls for these server-rendered pages:

| Route | Template engine | Page |
| --- | --- | --- |
| `GET /users` | PUG | Users list (implemented for `Accept: text/html`) |
| `GET /users/:userId` | PUG | User details (implemented for `Accept: text/html`) |
| `GET /articles` | EJS | Articles list (implemented for `Accept: text/html`) |
| `GET /articles/:articleId` | EJS | Article details (implemented for `Accept: text/html`) |

The existing JSON REST operations must remain available. Templates must render from the same server-side Maps, rather than from duplicated arrays or a browser-only simulation.

## Existing API and middleware

Existing `GET`, `POST`, `PUT`, and `DELETE` operations are under `/users` and `/articles`. Additional routes are `POST /users/strict`, `POST /articles/strict`, `GET /session`, and `DELETE /session`.

Demonstration authentication is **not production security**. Session state uses an in-memory store and is not appropriate for production deployment.

## HTML and JSON responses

Browsers requesting `Accept: text/html` receive PUG-rendered user pages or EJS-rendered article pages. Other API clients continue to receive JSON. Express renders both formats on the server via `res.render()` with explicit `.pug` and `.ejs` extensions.

After starting the server, open `http://localhost:3000/users` (PUG) and `http://localhost:3000/articles` (EJS), then follow a link to the details page.

## Tests

```bash
npm test
```

The 36 HW-02 regression tests are preserved. Four PUG tests cover user pages, and six additional EJS tests cover article pages, JSON compatibility, missing records, shared data, and HTML escaping (46 total). No tests are copied from the optional HW-03 reference archive.

---

Copyright © 2026 Andrii Dolzhenko.
