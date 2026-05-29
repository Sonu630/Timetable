const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.post(
  "/requests",
  authMiddleware,
  createRequest
);

router.get(
  "/requests",
  authMiddleware,
  getRequests
);

router.put(
  "/requests/:id",
  authMiddleware,
  updateRequestStatus
);

module.exports = router;