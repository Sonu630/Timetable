const express = require("express");

const router = express.Router();

const {
  createTimetable,
  getTimetable,
  getStudentTimetable,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetableController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

/*
========================================
CREATE TIMETABLE
ADMIN ONLY
========================================
*/

router.post(
  "/timetable",
  authMiddleware,
  roleMiddleware("admin"),
  createTimetable
);

/*
========================================
GET ALL TIMETABLES
========================================
*/

router.get(
  "/timetable",
  authMiddleware,
  getTimetable
);

/*
========================================
GET STUDENT TIMETABLE
ONLY ENROLLED COURSES
========================================
*/

router.get(
  "/student-timetable",
  authMiddleware,
  roleMiddleware("student"),
  getStudentTimetable
);

/*
========================================
UPDATE TIMETABLE
ADMIN ONLY
========================================
*/

router.put(
  "/timetable/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateTimetable
);

/*
========================================
DELETE TIMETABLE
ADMIN ONLY
========================================
*/

router.delete(
  "/timetable/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTimetable
);

module.exports = router;