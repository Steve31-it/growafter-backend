require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./config/db");
const lessonsRoutes = require("./routes/lessonsRoutes");

const app = express();
const port = process.env.PORT || 10000;

// 🔌 Connect MongoDB
connectDB();

// 🌐 Allow CORS from GitHub Pages & local dev
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",                  // for local development
    "https://steve31-it.github.io"           // for deployed GitHub frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

// 🧠 Parse JSON requests
app.use(express.json());

// 📦 API Routes
app.use("/api", lessonsRoutes);

// 🖼️ Serve uploaded/static images
app.use("/images", express.static(path.join(__dirname, "images")));

// ❌ Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send("No file was found");
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`🚀 GrowAfter backend running on port ${port}`);
});
