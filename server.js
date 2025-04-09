require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./config/db");
const lessonsRoutes = require("./routes/lessonsRoutes");

const app = express();
const port = process.env.PORT || 10000;

connectDB();

app.use(cors({
  origin: ["http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

app.use(express.json());

// Routes
app.use("/api", lessonsRoutes);

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// 404 fallback
app.use((req, res) => {
  res.status(404).send("No file was found");
});

app.listen(port, () => {
  console.log(`🚀 GrowAfter backend running on port ${port}`);
});
