const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My AI server is working!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.json({ reply: "ERROR: API key not linked in Render" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://my-ai-app-9502.onrender.com",
        "X-Title": "My AI App",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("OpenRouter Error:", data);
      return res.json({ reply: `OpenRouter Error: ${JSON.stringify(data)}` });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.log("Server Error:", error);
    res.json({ reply: `Server Error: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
