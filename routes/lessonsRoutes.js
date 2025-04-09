const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// 📚 Get all lessons
const getAllLessons = async (req, res) => {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find().toArray();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

// 🔍 Search lessons
const searchALesson = async (req, res) => {
  const query = req.query.q || "";
  try {
    const db = getDB();
    const results = await db.collection("lessons").find({
      subject: { $regex: query, $options: "i" }
    }).toArray();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};

// 📘 Get a single lesson by ID
const getALesson = async (req, res) => {
  try {
    const db = getDB();
    const lesson = await db.collection("lessons").findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};

// 🛒 Submit an order
const createOrder = async (req, res) => {
  const { firstName, lastName, email, city, state, zipCode, phoneNumber, deliveryMethod, cart } = req.body;
  try {
    const db = getDB();
    const result = await db.collection("orders").insertOne({
      firstName,
      lastName,
      email,
      city,
      state,
      zipCode,
      phoneNumber,
      deliveryMethod,
      cart,
      createdAt: new Date()
    });
    res.status(201).json({ message: "Order placed", orderId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit order" });
  }
};

// ✏️ Update spaces after checkout
const updateSpaces = async (req, res) => {
  const { id } = req.params;
  const { spaces } = req.body;
  try {
    const db = getDB();
    await db.collection("lessons").updateOne(
      { _id: new ObjectId(id) },
      { $set: { spaces } }
    );
    res.status(200).json({ message: "Spaces updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson spaces" });
  }
};

// 🧾 Optional: Update order info (if needed)
const updateData = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const db = getDB();
    await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    res.status(200).json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

module.exports = {
  getAllLessons,
  getALesson,
  createOrder,
  updateSpaces,
  updateData,
  searchALesson
};
