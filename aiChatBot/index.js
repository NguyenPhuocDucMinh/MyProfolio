const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.listen(5000, () => {
  console.log('Server is running on port 5001');
});

const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

app.use(bodyParser.json());

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const API_KEY = process.env.MISTRAL_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== 'string') {
        return res.status(400).json({ error: 'Invalid message format. Please provide a valid string.' });
    }

    try {
        const response = await axios.post(
            MISTRAL_API_URL,
            {
                model: "mistral-medium", // Hoặc mistral-small nếu muốn dùng bản nhẹ hơn
                messages: [
                    { role: "system",
                         content: "you are a senior software engineer. your is assistant user"},
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        res.status(500).send('Có lỗi xảy ra.');
    }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
