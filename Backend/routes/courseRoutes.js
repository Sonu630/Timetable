const express = require("express");

const router = express.Router();

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/courses",
  authMiddleware,
  roleMiddleware("admin"),
  createCourse
);

router.get(
  "/courses",
  authMiddleware,
  getCourses
);

router.put(
  "/courses/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCourse
);

router.delete(
  "/courses/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourse
);

module.exports = router;