const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// get all lessons.
async function getAllLessons(req, res) {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find({}).toArray();
    res.json(lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err.message);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
}

// get a single lesson.

async function getALesson(req, res) {
  const lessonId = req.params.id;
  try {
    const db = getDB();
    const lesson = await db
      .collection("lessons")
      .findOne({ _id: new ObjectId(lessonId) });
    if (!lesson) {
      return res.status(404).json({ error: "lesson not found" });
    }
    res.send(lesson);
  } catch (err) {
    console.error("Error fetching the lesson", err.message);
    res.status(500).json({ error: "Failed to fetch lessons " });
  }
}

// create a new order.

async function createOrder(req, res) {
  const orderData = req.body;
  try {
    const db = getDB();
    const order = await db.collection("Order").insertOne(orderData);
    res.send(order);
  } catch (err) {
    console.error("Error creating the lesson", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
}

//update a lessons space.

async function updateSpaces(req, res) {
  const { id } = req.params;
  const { spaces } = req.body;
  try {
    const db = getDB();
    const results = await db
      .collection("lessons")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { spaces } },
        { safe: true, multi: false }
      );

    res.send(results);
  } catch (err) {
    console.error("error updating the lesson", err.message);
    res.status(500).json({ error: "Failed to update the lesson" });
  }
}

//update a lessons details.

async function updateData(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const db = getDB();

    const results = await db
      .collection("Order")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
        { safe: true, multi: false }
      );

    res.send(results);
  } catch (err) {
    console.error("error updating the lesson", err.message);
    res.status(500).json({ error: "Failed to update the lesson" });
  }
}

// search lessons.

async function searchALesson(req, res) {
  const query = req.query.q?.trim();
  console.log(query);

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const db = getDB();
  try {
    const results = await db
      .collection("lessons")
      .find({
        $or: [
          { subject: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { price: parseFloat(query) },
          { spaces: parseInt(query) },
        ],
      })
      .toArray();

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching lessons found" });
    }

    res.json(results);
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({ message: "Error performing search" });
  }
}
module.exports = {
  getAllLessons,
  getALesson,
  createOrder,
  updateSpaces,
  updateData,
  searchALesson,
};
