const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// 📚 Get all lessons
async function getAllLessons(req, res) {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find({}).toArray();
    console.log("✅ Lessons fetched:", lessons.length);
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err.message);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
}

// 📘 Get a single lesson by ID
async function getALesson(req, res) {
  const lessonId = req.params.id;
  try {
    const db = getDB();
    const lesson = await db.collection("lessons").findOne({ _id: new ObjectId(lessonId) });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.send(lesson);
  } catch (err) {
    console.error("Error fetching the lesson:", err.message);
    res.status(500).json({ error: "Failed to fetch the lesson" });
  }
}

// 🛒 Create a new order
async function createOrder(req, res) {
  const orderData = req.body;
  try {
    const db = getDB();
    const result = await db.collection("orders").insertOne(orderData);
    res.status(201).json({ message: "Order created", orderId: result.insertedId });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
}

// 🔄 Update lesson spaces after booking
async function updateSpaces(req, res) {
  const { id } = req.params;
  const { spaces } = req.body;
  try {
    const db = getDB();
    const result = await db.collection("lessons").updateOne(
      { _id: new ObjectId(id) },
      { $set: { spaces } }
    );
    res.json({ message: "Spaces updated", result });
  } catch (err) {
    console.error("Error updating spaces:", err.message);
    res.status(500).json({ error: "Failed to update lesson spaces" });
  }
}

// 🧾 Update order data
async function updateData(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const db = getDB();
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    res.json({ message: "Order updated", result });
  } catch (err) {
    console.error("Error updating order:", err.message);
    res.status(500).json({ error: "Failed to update order" });
  }
}

// 🔍 Search lessons by subject, location, price, or spaces
async function searchALesson(req, res) {
  const query = req.query.q?.trim();
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const db = getDB();
    const results = await db.collection("lessons").find({
      $or: [
        { subject: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { price: isNaN(query) ? null : parseFloat(query) },
        { spaces: isNaN(query) ? null : parseInt(query) }
      ]
    }).toArray();

    if (!results.length) {
      return res.status(404).json({ message: "No matching lessons found" });
    }

    res.json(results);
  } catch (err) {
    console.error("Error performing search:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = {
  getAllLessons,
  getALesson,
  createOrder,
  updateSpaces,
  updateData,
  searchALesson
};
