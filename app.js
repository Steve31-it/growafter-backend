require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const lessonsRoutes = require("./routes/lessonsRoutes");
const { logger } = require("./routes/logger");
const cors = require("cors");
const path = require("path");

// Init Express
const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api", lessonsRoutes);

// Serve lesson images
app.use("/images", express.static(path.join(__dirname, "images")));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("No file was found");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Growafter server running on port: ${port}`);
});
