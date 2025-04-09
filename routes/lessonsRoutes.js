const express = require("express");
const {
  getAllLessons,
  getALesson,
  createOrder,
  updateSpaces,
  updateData,
  searchALesson,
} = require("../controllers/lessonControllers");

const router = express.Router();
//testing.
router.get("/test", (req, res) => {
  res.send("test route is working ");
});

// // get all lessons.
router.get("/lessons", getAllLessons);

// //get a single lesson by id.

router.get("/lessons/:id", getALesson);

// // post a new order.
router.post("/lessons/order", createOrder);

// // update a lesson space.

router.put("/lessons/:id", updateSpaces);

// //update a order data.

router.put("/lessons/order/:id", updateData);
//search for lessons.

router.get("/search", searchALesson);

module.exports = router;
