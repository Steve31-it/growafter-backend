const { MongoClient } = require("mongodb");

let client;
let db;

// ✅ Use environment variable from Render
const uri = process.env.MONGODB_URI;
const dbName = "GrowAfter";

function connectDB() {
  client = new MongoClient(uri);
  return client
    .connect()
    .then(() => {
      console.log("✅ MongoDB connected to GrowAfter database");
      db = client.db(dbName);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    });
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
// Compare this snippet from backend/controllers/lessonControllers.js:
//   console.error("Error updating spaces:", err.message);
//     res.status(500).json({ error: "Failed to update lesson spaces" });
//   }
// }
//
// // 🔄 Update order data