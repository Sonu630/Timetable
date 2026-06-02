const express = require("express");

const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.post(
  "/announcements",
  authMiddleware,
  createAnnouncement
);

router.get(
  "/announcements",
  authMiddleware,
  getAnnouncements
);

module.exports = router;