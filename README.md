# Script AI — Server

AI-powered screenwriting workspace with a secure backend proxy.

## Deploy to Railway (free)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select this repo
4. Go to **Variables** tab → add:
   ```
   ANTHROPIC_API_KEY = sk-ant-api03-your-key-here
   ```
5. Railway auto-deploys — your app is live at the provided URL

## Deploy to Render (free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo
4. Set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
5. Go to **Environment** → add `ANTHROPIC_API_KEY`
6. Click Deploy

## Local Development

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... node server.js
# Open http://localhost:3000
```

## Structure

```
├── server.js          # Express proxy server
├── package.json
├── public/
│   ├── index.html     # App UI
│   ├── style.css      # Styles
│   └── script.js      # Frontend logic
```
