# Portfolio Backend

CMS API for [Karan Shukla's portfolio site](https://github.com/Sh-karan27/portfolio) — a single-admin content-management backend that serves the portfolio's sections (hero, about, skills, experience, projects, education, contact, footer, social links) and lets the owner edit them from an admin panel.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 4
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (single access token, `httpOnly` cookie), bcrypt for password hashing
- **Image uploads:** ImageKit — the server only issues short-lived signed upload params; files upload directly from the browser to ImageKit and never touch this server (see [Image uploads](#image-uploads))

## Project Structure

```
api/
└── index.js                  # Vercel serverless entry — reuses the Express app per warm container
src/
├── app.js                    # Express app: middleware, CORS, route mounting
├── index.js                  # Traditional entry point — connects to MongoDB, then app.listen()
├── db/                       # Mongoose connection (readyState-checked, reused across invocations)
├── routes/
│   ├── content.routes.js     # Public GET + admin-only PUT per section
│   └── admin.routes.js       # Admin register/login + ImageKit auth
├── controllers/
│   ├── content.controller.js
│   └── admin.controller.js
├── models/
│   ├── admin.model.js        # Single-admin schema
│   └── portfolioContent.model.js
├── middlewares/
│   ├── auth.middleware.js    # verifyJWT
│   └── errorHandler.js
├── constants/
│   └── defaultContent.js     # Seed content mirrored by the frontend's fallbackContent.js
└── utils/
    ├── ApiError.js / ApiResponse.js / asyncHandler.js
    └── imagekit.js           # Lazy ImageKit client
```

## Setup

```bash
npm install
cp .env.sample .env   # fill in the values below
npm run dev
```

Runs at `http://localhost:5000` (or `PORT` from `.env`).

### Environment variables

```
PORT=5000
MONGODB_URL=mongodb+srv://<name>:<password>@<cluster>.mongodb.net
DB_NAME=portfolio
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=<random secret>
ACCESS_TOKEN_EXPIRY=15m

IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Set `NODE_ENV=production` in deployment — it controls the `secure` flag on the auth cookie.

## API

All routes are mounted under `/api/v1`.

### Content — `/api/v1/content`

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | Full portfolio content (all sections in one response) |
| GET | `/projects/:slug` | Public | Single project by slug, for the project details page |
| PUT | `/hero` | Admin | Update the hero section |
| PUT | `/about` | Admin | Update the about section |
| PUT | `/skills` | Admin | Update the skills section |
| PUT | `/experience` | Admin | Update the experience section |
| PUT | `/projects` | Admin | Update the projects list |
| PUT | `/education` | Admin | Update the education section |
| PUT | `/contact` | Admin | Update the contact section |
| PUT | `/footer` | Admin | Update the footer |
| PUT | `/social-links` | Admin | Update social links |

### Admin — `/api/v1/admin`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | Public, one-time | Creates the admin account — blocked once one already exists |
| POST | `/login` | Public | Logs in, sets the JWT as an `httpOnly` cookie |
| GET | `/imagekit-auth` | Admin | Issues short-lived ImageKit upload auth params |

## Image uploads

The admin panel uploads images (profile photo, project covers, before/after screenshots) **directly from the browser to ImageKit**, not through this server:

1. Browser calls `GET /api/v1/admin/imagekit-auth` (requires a valid session).
2. Server returns a signed `{ token, expire, signature }` from the ImageKit SDK.
3. Browser uploads the file straight to ImageKit using those signed params.

No file ever touches this server's filesystem or memory — there's no Multer, no disk storage, no temp files. This also means the API deploys cleanly to serverless/read-only-filesystem platforms without the upload path breaking.

## Deployment

### Vercel

`api/index.js` wraps the Express app as a serverless function, and `vercel.json` rewrites every path to it. Mongoose connection reuse is handled in `src/db/index.js` (checks `readyState` before reconnecting, so warm containers don't reopen a connection per request).

1. Import the repo in Vercel (or run `vercel` from this directory).
2. Add the environment variables listed below in the Vercel project settings (Production and Preview) — `.env` is not deployed.
3. Set `NODE_ENV=production` so the auth cookie's `secure`/`sameSite` flags are correct for cross-origin requests.
4. Deploy. All routes (`/`, `/api/v1/...`) are served through `api/index.js`.

### Traditional Node host

For a persistent Node process instead (e.g. **Render**, Railway, Fly.io), `src/index.js` still works as-is with `npm start` — it connects to MongoDB once at boot and calls `app.listen()`.

---

Point the frontend's `VITE_API_URL` at the deployed URL (e.g. `https://your-backend.vercel.app/api/v1`), and set `CORS_ORIGIN` here to the deployed frontend's origin.
