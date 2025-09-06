const API_KEY = "AIzaSyABtLPAmktf_wGWD1HBX7St2gn3wcGPCrI"; // Replace with your Gemini API key
const MODEL = "gemini-2.5-flash-lite";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

let portfolioData = null;

// Fetch portfolio.json
async function loadPortfolio() {
    try {
        const res = await fetch("portfolio.json");
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        portfolioData = await res.json();
    } catch (err) {
        console.error("Failed to load portfolio.json:", err);
        appendMessage("⚠️ Failed to load portfolio data.", false, true);
    }
}

// Append message to chat
function appendMessage(text, isUser = false, isError = false) {
    const div = document.createElement("div");
    div.classList.add("message", isUser ? "user-message" : (isError ? "error-message" : "ai-message"));
    div.innerHTML = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing indicator
function showTyping() {
    const div = document.createElement("div");
    div.classList.add("message", "ai-message");
    div.id = "typing";
    div.innerHTML = `<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// Dynamic Option-1 AI response
async function askGemini(question) {
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
        return "⚠️ Please configure your Gemini API key to enable AI responses.";
    }

    if (!portfolioData) return "⚠️ Portfolio data is still loading. Please try again.";

    const prompt = `
You are Adarsh Arya’s AI assistant for his portfolio website. Answer questions **only based on the provided portfolio JSON data**.

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
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = "";

    showTyping();

    const reply = await askGemini(text);
    removeTyping();
    const isError = reply.startsWith("⚠️");
    appendMessage(reply, false, isError);
}

// Event Listeners
chatToggle.addEventListener("click", () => chatWindow.classList.toggle("open"));
closeChat.addEventListener("click", () => chatWindow.classList.remove("open"));
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());

// Initialize
loadPortfolio();