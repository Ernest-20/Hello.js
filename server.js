const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// Custom Middleware Logger
// =========================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// =========================
// JSON Parsing Middleware
// =========================
app.use(express.json());

// =========================
// Serve Static Files
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// Routes
// =========================

// GET /api
app.get("/api", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  // Error handling
  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }

  res.json({
    message: `Hello, ${name}!`,
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  res.send(`User ${id} profile`);
});

// =========================
// 404 Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// =========================
// Start Server
// =========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});