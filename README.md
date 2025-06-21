# DeepSeekExperiment

A local web application for interacting with the DeepSeek language model via Ollama, featuring a modern React + Vite frontend and an Express backend.

## Features
- **Chat UI**: Clean, responsive chat interface built with React
- **Ollama Integration**: Communicates with a locally running DeepSeek model via Ollama's API
- **Thinking Process**: Displays both the model's main response and its "thinking" (content between `<think>...</think>` tags)
- **Modern Styling**: Custom, user-friendly CSS for a pleasant chat experience

## Prerequisites
- Node.js (v18+ recommended)
- Ollama installed and running with the DeepSeek model (e.g., `deepseek-r1:8b`)
- (Optional) Chrome for best experience

## Getting Started

### 1. Clone the repository
```bash
git clone <this-repo-url>
cd DeepSeekExperiment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the backend server
This server proxies requests to your local Ollama instance.
```bash
npm run server
```

### 4. Start the frontend (Vite dev server)
```bash
npm run dev
```

The frontend will be available at the URL shown in your terminal (e.g., http://localhost:5174/).

### 5. Using the App
- Type a message in the input box and press Send.
- The chat will display your message, the model's response, and (if present) a "Thinking" section extracted from `<think>...</think>` tags.
- The UI is responsive and works well on both desktop and mobile.

## Project Structure
```
DeepSeekExperiment/
├── server/           # Express backend for Ollama API proxy
│   └── index.js
├── src/              # React frontend
│   ├── App.jsx
│   ├── Chat.jsx
│   ├── Chat.css
│   └── ...
├── package.json
├── vite.config.js
├── README.md
└── ...
```

## Customization
- **Model**: Change the model name in `server/index.js` if you want to use a different DeepSeek or Ollama model.
- **Styling**: Edit `src/Chat.css` for custom UI/UX.

## Troubleshooting
- Make sure Ollama is running and the DeepSeek model is available (default Ollama API port: 11434).
- If the backend or frontend ports are in use, Vite/Express will try the next available port.
- Check the browser console for raw responses if you want to debug the model output.

## License
MIT
