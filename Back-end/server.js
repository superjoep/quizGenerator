const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/query", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "you create a quiz and return it in json format based on the data given by the user.",
          },
          { role: "user", content: req.body.prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Access the variable
          "Content-Type": "application/json",
        },
      }
    );
    const messageContent = response.data.choices[0].message.content;
    res.json({ message: messageContent });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({
      error: "Failed to fetch response from OpenAI",
      details: error.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
