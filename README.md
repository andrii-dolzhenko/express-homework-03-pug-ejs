# Express.js · Homework 03 · PUG & EJS

An Express 5 application combining server-rendered PUG and EJS pages with a REST API for users and articles, while preserving CRUD operations, middleware, and server-side sessions.

## Features

- **PUG** renders user lists and individual user pages.
- **EJS** renders article lists and individual article pages.
- **REST API** supports creating, reading, updating, and deleting users and articles.
- **Shared data:** HTML pages and JSON responses use the same in-memory `Map` collections.
- **Middleware:** request logging, input validation, demonstration authentication, article access checks, resource checks, and centralized error handling.
- **Sessions:** a per-browser visit counter using `express-session`.
- **Responsive UI:** shared CSS, SVG favicon, accessible navigation, visible keyboard focus, and reduced-motion support.
- **Automated testing:** 52 Vitest and Supertest tests.

## Tech stack

Node.js 24, Express 5, PUG 3, EJS 7, `express-session`, JavaScript ES modules, CSS, Vitest, and Supertest. Dependencies are tracked in `yarn.lock` using Yarn Classic.

## Installation and running

From the project root:

```bash
npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile
npm test
npm start
```

Open <http://localhost:3000/users> or <http://localhost:3000/articles>. The server runs on **port 3000**; stop it with `Ctrl+C`. For automatic restarts during development, use `npm run dev`.

## Live demo

**[Open the PUG + EJS demo](https://andrii-dolzhenko.github.io/express-homework-03-pug-ejs/)**

The GitHub Pages version is a **static preview of HTML rendered by the actual Express application at build time**. It contains navigable PUG user lists/details and EJS article lists/details, generated from the server's seeded data. GitHub Pages cannot run Node.js: interactive REST writes, real-time data changes, and server-side sessions require running this repository locally (`npm start`). The preview is rebuilt and published by GitHub Actions when `main` changes.

## Server-rendered pages

| Route | Engine | Description |
| --- | --- | --- |
| `GET /users` | PUG | List all users with links to their details |
| `GET /users/:userId` | PUG | Show one user's name and ID |
| `GET /articles` | EJS | List all articles with links to their details |
| `GET /articles/:articleId` | EJS | Show one article's title and ID |

A browser sends `Accept: text/html`, so these four GET routes return server-rendered HTML via `res.render()`. Other clients continue to receive JSON. Both template engines read from the same in-memory data used by the REST API; neither a duplicate dataset nor a browser-side simulation is used.

PUG templates live in `src/views/users/`, and EJS templates live in `src/views/articles/`. Express selects the engine using the explicit `.pug` or `.ejs` extension.

## Routes and REST API

| Method | Route | Response / behavior |
| --- | --- | --- |
| `GET` | `/` | Plain-text root response |
| `GET` | `/users` | PUG user list with `Accept: text/html`; otherwise JSON array |
| `POST` | `/users` | Create a user from a JSON `name` field; return `201` and JSON |
| `GET` | `/users/:userId` | PUG user details with `Accept: text/html`; otherwise JSON object |
| `PUT` | `/users/:userId` | Update an existing user's `name`; return JSON |
| `DELETE` | `/users/:userId` | Delete an existing user; return `204 No Content` |
| `POST` | `/users/strict` | Create a user; a Basic Authorization header is required for this demo route |
| `GET` | `/articles` | EJS article list with `Accept: text/html`; otherwise JSON array |
| `POST` | `/articles` | Create an article from a JSON `title` field; return `201` and JSON |
| `GET` | `/articles/:articleId` | EJS article details with `Accept: text/html`; otherwise JSON object |
| `PUT` | `/articles/:articleId` | Update an existing article's `title`; return JSON |
| `DELETE` | `/articles/:articleId` | Delete an existing article; return `204 No Content` |
| `POST` | `/articles/strict` | Create an article; a Basic Authorization header is required for this demo route |
| `GET` | `/session` | Increment the current session's visit count; return `Visits: N` as text |
| `DELETE` | `/session` | Destroy the current session and clear its cookie; return `204` |
| `GET` | `/assets/css/styles.css` | Shared responsive stylesheet |
| `GET` | `/assets/favicon.svg` | SVG favicon |

A missing user or article returns `404 Not Found`. Invalid user/article data returns `400 Bad Request`. User names must be nonempty strings of at most 100 characters; article titles must be nonempty strings of at most 200 characters. Both are trimmed during validation. Unexpected errors are handled centrally with a `500` response.

### Example requests

```bash
# Server-rendered PUG page
curl -i http://localhost:3000/users -H 'Accept: text/html'

# JSON representation of the same users
curl -i http://localhost:3000/users -H 'Accept: application/json'

# Server-rendered EJS page
curl -i http://localhost:3000/articles -H 'Accept: text/html'

# Create a user
curl -i -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alex"}'
```

## Middleware and sessions

- **Request logging:** logs request metadata and redacts sensitive fields in logged request bodies.
- **Demo authentication:** logs whether an Authorization header is present; standard routes remain accessible.
- **Optional strict authentication:** `x-require-auth: true` requires a Basic Authorization header (`401` if missing or malformed).
- **Article access demonstration:** `DELETE /articles/:articleId` with `x-require-strict-access: true` requires the demo admin credential; otherwise it returns `403 Forbidden`.
- **Input validation and resource existence:** check incoming data and reject nonexistent records.
- **Sessions:** `GET /session` uses an HttpOnly `hw03.sid` cookie and a server-side visit counter; `DELETE /session` resets that session.

These authentication and role checks are **educational stubs, not production security**: they do not authenticate real accounts. `express-session` uses the in-memory store for local coursework, not persistent production storage. Its cookie uses `SameSite=Lax`, lasts 10 minutes, and uses `Secure=false` for local HTTP. A real deployment would require HTTPS, secure cookies, proper credential checks, and a production-grade session store.

## Testing

```bash
npm test
```

The test suite contains **52 tests**:

| Test suite | Tests | Coverage |
| --- | ---: | --- |
| REST API | 23 | Core routes and CRUD responses |
| Middleware | 9 | Logging, validation, authentication, and access control |
| Sessions | 4 | Cookie persistence, isolation, reset, and compatibility |
| PUG pages | 4 | HTML user pages and JSON compatibility |
| EJS pages | 6 | HTML article pages, JSON compatibility, and escaping |
| Shared styling | 6 | Stylesheet/favicon links and static assets |
| **Total** | **52** | |

## Project structure

```text
src/
├── __test__/             # Vitest + Supertest tests
├── controllers/          # Request handlers
├── data/                 # In-memory user and article Maps
├── middlewares/          # Logging, auth, validation, sessions, access checks
├── public/
│   ├── css/styles.css    # Shared responsive styling
│   └── favicon.svg
├── routes/               # Users, articles, and sessions
├── utils/wantsHtml.mjs   # HTML vs JSON response selection
├── views/
│   ├── users/            # list.pug, details.pug
│   └── articles/         # list.ejs, details.ejs
└── server.mjs            # Express configuration and server
```

Records are stored in memory and reset when the server restarts. This project does not use a database or a hosted Express backend.

---

Copyright © 2026 Andrii Dolzhenko.
