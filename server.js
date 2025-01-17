const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

app.post('/api/fortune', async (req, res) => {
    const { color } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Give me a fun, personalized fortune for someone whose favorite color today is ${color}. Keep it under 200 characters and use emojis.`,
                max_tokens: 60,
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
