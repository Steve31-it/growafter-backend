require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./config/db");
const lessonsRoutes = require("./routes/lessonsRoutes");

const app = express();
const port = process.env.PORT || 10000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration (Allow GitHub Pages + Localhost)
const allowedOrigins = [
  "http://127.0.0.1:5500",                   // local dev
  "https://steve31-it.github.io"             // GitHub Pages
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ API Routes
app.use("/api", lessonsRoutes);

// ✅ Serve images from /images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// ❌ 404 for other routes
app.use((req, res) => {
  res.status(404).send("No file was found");
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 GrowAfter backend running on port ${port}`);
});
