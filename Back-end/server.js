const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
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
              "you create a quiz with ALWAYS 5 questions and return it in json format based on the data given by the user.only give back json and no other texts. json structure is ALWAYS following{ 'title': 'string', 'questions': [ { 'question': 'string', 'options': [ 'string', 'string', 'string' ], 'answer': 'string' } ] }              ",
          },
          { role: "user", content: req.body.params.prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Access the variable
          "Content-Type": "application/json",
        },
      }
    );
    console.log(req);
    const messageContent = response.data.choices[0].message.content;
    res.json({ message: messageContent });
  } catch (error) {
    console.log("prompt:" + req.body);
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
