# InfoAPI - Full setup (Frontend + Cloudflare Workers)

This project is a Cloudflare Pages-ready Vite + React frontend and a set of **Cloudflare Workers templates**
that act as API endpoints (placeholders). The Workers currently return dummy JSON; replace the worker logic
to call your real APIs or set secrets via the Cloudflare dashboard / Wrangler.

## What is included
- Frontend (Vite + React + Tailwind)
  - `src/App.jsx` - UI that calls `/api/*` endpoints
- Workers templates (in `/workers`)
  - `number.js`, `vehicle_basic.js`, `vehicle_advanced.js`, `ifsc.js`, `upi.js`, `ip.js`, `aadhar.js`
  - These are example workers that echo received params. Edit them to proxy real third-party APIs.
- `wrangler.toml` - basic config for Wrangler. Replace `account_id` before using Wrangler publish.

## Quick local dev
1. Install Node 18+ and npm.
2. Install deps:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173`.

## Deploy to Cloudflare Pages (frontend)
1. Push this repo to GitHub.
2. In Cloudflare Dashboard -> Pages -> Create project -> Connect GitHub repo.
3. Set:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Install command: `npm install`
4. Deploy. Cloudflare Pages will host frontend at `https://<your-project>.pages.dev`.

## Deploy Workers (backend)
Option A) Use Wrangler (recommended for development)
1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```
2. Authenticate:
   ```bash
   wrangler login
   ```
3. Publish a worker:
   ```bash
   wrangler publish workers/number.js --name infoapi-number
   ```
   (Repeat for other workers.)

Option B) Create functions in Cloudflare dashboard manually:
- Copy worker JS into a new Worker and publish. Use routes or bind with Pages as Functions.

## Production setup notes
- Use Cloudflare environment variables (secrets) to store API keys (do NOT hardcode).
- Update frontend `src/App.jsx` endpoints if you deploy workers to custom subdomain (or use Pages Functions routes).
- Add rate-limiting / abuse protections on Workers.

## Next steps I can help with (reply with a number)
1) I will edit the workers to proxy **specific real APIs** (tell me endpoints or keys).  
2) I will create a GitHub-ready repo and push it for you (you must provide access or push yourself).  
3) I will show exact Wrangler publish commands for each worker and bind them to Pages routes.

Enjoy! — Generated on 2025-10-17
