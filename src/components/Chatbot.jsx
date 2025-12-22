import React, { useState, useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-lite";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const ChatbotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,255.99431,255.99431">
    <g fill="#fff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"
      strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none"
      fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
      <g transform="scale(5.33333,5.33333)">
        <path
          d="M20,4.09961c-0.82746,-0.00022 -1.65415,0.40807 -2.0332,1.22461c-0.00065,0.00065 -0.0013,0.0013 -0.00195,0.00195l-2.0293,4.39063c-1.26863,2.74673 -3.47203,4.95202 -6.21875,6.2207c-0.00065,0 -0.0013,0 -0.00195,0l-4.39063,2.0293c-1.6365,0.75684 -1.6365,3.31152 0,4.06836l4.39063,2.0293c0.00065,0 0.0013,0 0.00195,0c2.74672,1.26868 4.95007,3.47203 6.21875,6.21875c0,0.00065 0,0.0013 0,0.00195l2.0293,4.39063c0.75684,1.6365 3.31152,1.6365 4.06836,0l2.0293,-4.39062c0,-0.00065 0,-0.0013 0,-0.00195c1.26868,-2.74672 3.47398,-4.95007 6.2207,-6.21875l4.39063,-2.0293c1.6365,-0.75684 1.6365,-3.31151 0,-4.06836l-4.39062,-2.0293c-2.74672,-1.26868 -4.95202,-3.47398 -6.2207,-6.2207l-2.0293,-4.39062c-0.37812,-0.8176 -1.20575,-1.22634 -2.0332,-1.22656zM20,8.07617l1.33984,2.89844c1.56732,3.39328 4.29227,6.11823 7.68555,7.68555l2.89844,1.33984l-2.89844,1.33984c-3.39328,1.56732 -6.11823,4.29227 -7.68555,7.68555l-1.33984,2.89844l-1.33984,-2.89844c-1.56732,-3.39328 -4.29227,-6.11823 -7.68555,-7.68555l-2.89844,-1.33984l2.89844,-1.33984c3.39328,-1.56732 6.11823,-4.29227 7.68555,-7.68555zM36.97656,30c-0.71278,0.01099 -1.31939,0.52207 -1.45117,1.22266c-0.41248,2.18863 -2.11411,3.89026 -4.30273,4.30273c-0.70991,0.1327 -1.22451,0.7524 -1.22451,1.47461c0,0.72221 0.5146,1.34191 1.22451,1.47461c2.18863,0.41248 3.89026,2.11411 4.30273,4.30273c0.1327,0.70991 0.7524,1.22451 1.47461,1.22451c0.72221,0 1.34191,-0.5146 1.47461,-1.22451c0.41248,-2.18863 2.11411,-3.89026 4.30273,-4.30273c0.70991,-0.1327 1.22451,-0.7524 1.22451,-1.47461c0,-0.72221 -0.5146,-1.34191 -1.22451,-1.47461c-2.18863,-0.41248 -3.89026,-2.11411 -4.30273,-4.30273c-0.13504,-0.71794 -0.76761,-1.23422 -1.49805,-1.22266zM37,35.02148c0.54785,0.77186 1.20666,1.43066 1.97852,1.97852c-0.77186,0.54785 -1.43066,1.20666 -1.97852,1.97852c-0.54785,-0.77186 -1.20666,-1.43066 -1.97852,-1.97852c0.77186,-0.54785 1.43066,-1.20666 1.97852,-1.97852z">
        </path>
      </g>
    </g>
  </svg>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "⚡ Hey! I'm Adarsh's Digital Twin - ask me anything about his skills, projects, experience, or contact info!",
      isUser: false,
      isError: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch portfolio data
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await fetch('/portfolio.json');
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        const data = await res.json();
        setPortfolioData(data);
      } catch (err) {
        console.error("Failed to load portfolio.json:", err);
        setMessages(prev => [...prev, {
          text: "⚠️ Failed to load portfolio data.",
          isUser: false,
          isError: true
        }]);
      }
    };
    loadPortfolio();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const askGemini = async (question) => {
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
      return "⚠️ Please configure your Gemini API key to enable AI responses.";
    }

    if (!portfolioData) return "⚠️ Portfolio data is still loading. Please try again.";

    const prompt = `
You are Adarsh Arya's AI assistant for his portfolio website. Answer questions **only based on the provided portfolio JSON data**.

Rules:
- Always speak in the first person: "I live in...", "I study...", "I work on...".
- Keep responses concise and engaging.
- Use **HTML formatting**: <p>, <ul>, <li>, <a href="..." target="_blank">, <strong>, <em>.
- Add **relevant emojis** naturally to make responses friendly and visually appealing. Example: 💻 for coding, 🚀 for projects, 📚 for education.
- If asked about something not in the data, politely say you can only provide information from the portfolio.
- For inappropriate, hateful, or vulgar messages, respond with the predefined safety_responses in the JSON.

Portfolio JSON: ${JSON.stringify(portfolioData, null, 2)}  

User Question: ${question}
`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        return data.candidates[0].content.parts.map(p => p.text).join(" ");
      } else if (data.error) {
        return `⚠️ API Error: ${data.error.message}`;
      } else {
        return "⚠️ Sorry, I couldn't process that request right now.";
      }
    } catch (err) {
      return `⚠️ Connection Error: ${err.message}`;
    }
  };

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add user message
    setMessages(prev => [...prev, { text, isUser: true, isError: false }]);
    setInputValue('');
    setIsTyping(true);

    // Get AI response
    const reply = await askGemini(text);
    setIsTyping(false);
    
    const isError = reply.startsWith("⚠️");
    setMessages(prev => [...prev, { text: reply, isUser: false, isError }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chatbot-float" id="chatToggle" onClick={toggleChat}>
        <ChatbotIcon />
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`} id="chatWindow">
        <div className="chat-header glow-37ff8b-pulse">
          ⚡ Meet Adarsh's Digital Twin
          <button 
            id="closeChat" 
            onClick={closeChat}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'white' }}
          >
            ✖
          </button>
        </div>
        <div className="chat-messages" id="chatMessages">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`message ${message.isUser ? 'user-message' : (message.isError ? 'error-message' : 'ai-message')}`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
          ))}
          {isTyping && (
            <div className="message ai-message" id="typing">
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            id="chatInput" 
            placeholder="Enter your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="sendBtn" onClick={sendMessage}>➤</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
