const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ── Middleware ──
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ── API routes FIRST (before static files) ──
app.post('/api/chat', async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: { message: 'ANTHROPIC_API_KEY environment variable is not set on the server.' }
    });
  }

  try {
    // Uses built-in fetch (Node 18+) — no node-fetch dependency needed
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[proxy] Anthropic error:', response.status, JSON.stringify(data));
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('[proxy error]', err.message);
    res.status(500).json({ error: { message: err.message } });
  }
});

// Health check — visit /api/health to confirm server + key are working
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: !!ANTHROPIC_API_KEY });
});

// ── Static files AFTER API routes ──
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Script AI running on port', PORT);
  console.log('API key set:', !!ANTHROPIC_API_KEY);
});
