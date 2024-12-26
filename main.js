require("dotenv").config();
const express = require("express");
const { generateMatches, getCompatibilityScore } = require("./matching/algorithm");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// Routes
app.post("/api/v1/match/:userId", async (req, res) => {
  try {
    const matches = await generateMatches(req.params.userId);
    res.json(matches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/v1/compatibility/:userId1/:userId2", async (req, res) => {
  try {
    const score = await getCompatibilityScore(req.params.userId1, req.params.userId2);
    res.json(score);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
