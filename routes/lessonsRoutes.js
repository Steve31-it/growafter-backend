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

router.get("/test", (req, res) => {
  res.send("✅ Test route is working.");
});

router.get("/lessons", getAllLessons);
router.get("/search", searchALesson);
router.get("/lessons/:id", getALesson);
router.post("/lessons/order", createOrder);
router.put("/lessons/:id", updateSpaces);
router.put("/lessons/order/:id", updateData);

// ✅ MUST export only `router` not { router }
module.exports = router;
