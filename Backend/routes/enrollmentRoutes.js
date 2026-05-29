const express = require("express");

const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
} = require("../controllers/enrollmentController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.post(
  "/enroll",
  authMiddleware,
  enrollCourse
);

router.get(
  "/my-enrollments",
  authMiddleware,
  getMyEnrollments
);

module.exports = router;