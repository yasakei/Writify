// proxy.js - Node.js Gemini API proxy for Grammar Fixer extension
const express = require('express');
const fetch = require('node-fetch'); // Ensure node-fetch v2 is installed
const fs = require('fs');
const app = express();
app.use(express.json());

// Read API key from local file (token)
const OPENROUTER_API_KEY = fs.readFileSync('token', 'utf8').trim();

app.post('/fix', async (req, res) => {
  const userText = req.body.text;
  console.log('[Proxy] Received text:', userText);
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Optional
          'X-Title': 'Grammar Fixer' // Optional
        },
        body: JSON.stringify({
          model: 'arcee-ai/trinity-large-preview:free',
          messages: [{
            role: 'user',
            content: `Fix only the grammar of this input. Do not add or remove words. Do not paraphrase. Do not quote the input or response. Only return the corrected version:\n\n${userText}`
          }]
        })
      }
    );
    console.log('[Proxy] OpenRouter API status:', response.status);
    const data = await response.json();
    console.log('[Proxy] OpenRouter API response:', JSON.stringify(data));
    
    // Extract text from OpenRouter response
    const correctedText = data.choices?.[0]?.message?.content || "";
    res.json({ corrected: correctedText });
  } catch (err) {
    console.error('[Proxy] Error:', err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log('Proxy listening on port 3000'));
