const express = require("express");

const router = express.Router();

const {
  createPoll,
  getPolls,
  votePoll,
  getPollResults,
} = require("../controllers/pollController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

/*
========================================
CREATE POLL
========================================
*/

router.post(
  "/polls",
  authMiddleware,
  createPoll
);

/*
========================================
GET POLLS
========================================
*/

router.get(
  "/polls",
  authMiddleware,
  getPolls
);

/*
========================================
VOTE POLL
========================================
*/

router.post(
  "/polls/vote",
  authMiddleware,
  votePoll
);

/*
========================================
GET POLL RESULTS
========================================
*/

router.get(
  "/poll-results/:poll_id",
  authMiddleware,
  getPollResults
);

module.exports = router;