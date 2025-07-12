// proxy.js - Node.js Gemini API proxy for Grammar Fixer extension
const express = require('express');
const fetch = require('node-fetch'); // Ensure node-fetch v2 is installed
const fs = require('fs');
const app = express();
app.use(express.json());

// Read Gemini API key from local file (token)
const GEMINI_API_KEY = fs.readFileSync('token', 'utf8').trim();

app.post('/fix', async (req, res) => {
  const userText = req.body.text;
  console.log('[Proxy] Received text:', userText);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Fix only the grammar of this input. Do not add or remove words. Do not paraphrase. Do not quote the input or response. Only return the corrected version:\n\n${userText}`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512
          }
        })
      }
    );
    console.log('[Proxy] Gemini API status:', response.status);
    const data = await response.json();
    console.log('[Proxy] Gemini API response:', JSON.stringify(data));
    res.json(data);
  } catch (err) {
    console.error('[Proxy] Error:', err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log('Proxy listening on port 3000'));
