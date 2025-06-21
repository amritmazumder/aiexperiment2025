import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  // State for managing the input field value
  const [input, setInput] = useState('');
  
  // State for storing the chat history
  // Each message is an object with:
  // - role: 'user' | 'bot'
  // - content: string (the main message)
  // - thinkContent: string | null (optional thinking process from the model)
  const [messages, setMessages] = useState([]);
  
  // State to track when we're waiting for a response from the model
  const [loading, setLoading] = useState(false);

  // Function to handle sending messages to the model
  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    // Don't send empty messages
    if (!input.trim()) return;
    
    // Add user's message to chat history immediately
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state and clear input field
    setLoading(true);
    setInput('');
    
    try {
      // Send message to our backend server
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      // Parse the response from the server
      const data = await res.json();
      
      // Log the raw response for debugging
      console.log('Raw Ollama Response:', data);
      
      // Extract any content between <think> tags
      // This captures the model's thinking process
      const thinkMatch = data.response.match(/<think>([\s\S]*?)<\/think>/);
      const thinkContent = thinkMatch ? thinkMatch[1].trim() : null;
      
      // Get the main response by removing think tags and their content
      const mainResponse = data.response
        .replace(/<think>[\s\S]*?<\/think>/g, '')
        .trim();
      
      // Add bot's response to chat history
      // Includes both the main response and any thinking content
      const botMessage = { 
        role: 'bot', 
        content: mainResponse || 'No response received',
        thinkContent: thinkContent // Store the thinking process separately
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Handle any errors by adding an error message to chat
      setMessages((prev) => [...prev, { 
        role: 'bot', 
        content: 'Error: Could not reach backend.' 
      }]);
    } finally {
      // Always turn off loading state when done
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat history section - displays all messages */}
      <div className="chat-history">
        {/* Map through all messages and render them */}
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            {/* Display the main message content */}
            {msg.role === 'user' ? 'You' : 'Bot'}: {msg.content}
            {/* If there's thinking content, display it in a separate section */}
            {msg.thinkContent && (
              <div className="think-content">
                <strong>Thinking:</strong> {msg.thinkContent}
              </div>
            )}
          </div>
        ))}
        {/* Show loading indicator while waiting for response */}
        {loading && (
          <div className="chat-message bot loading">
            Bot: <span className="loading-dots">thinking</span>
          </div>
        )}
      </div>

      {/* Input form for new messages */}
      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading} // Disable input while waiting for response
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()} // Disable button if loading or input is empty
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 