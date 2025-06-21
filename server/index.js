import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ollama API endpoint
const OLLAMA_API = 'http://localhost:11434/api';

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await fetch(`${OLLAMA_API}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-r1:8b',
        prompt: message,
        stream: false
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from Ollama' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 