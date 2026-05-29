const db = require("../config/db");

/*
========================================
CREATE POLL
========================================
*/

exports.createPoll = (
  req,
  res
) => {
  const {
    course_id,
    question,
    option_one,
    option_two,
    option_three,
  } = req.body;

  const sql = `
    INSERT INTO polls
    (
      professor_id,
      course_id,
      question,
      option_one,
      option_two,
      option_three
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      req.user.id,
      course_id,
      question,
      option_one,
      option_two,
      option_three,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Poll created successfully",
      });
    }
  );
};

/*
========================================
GET POLLS
========================================
*/

exports.getPolls = (
  req,
  res
) => {
  const sql =
    "SELECT * FROM polls";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

/*
========================================
VOTE POLL
========================================
*/

exports.votePoll = (
  req,
  res
) => {
  const {
    poll_id,
    selected_option,
  } = req.body;

  const student_id =
    req.user.id;

  const checkSql = `
    SELECT * FROM poll_votes
    WHERE poll_id = ?
    AND student_id = ?
  `;

  db.query(
    checkSql,
    [poll_id, student_id],
    (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({
          error:
            "Already voted",
        });
      }

      const sql = `
        INSERT INTO poll_votes
        (
          poll_id,
          student_id,
          selected_option
        )
        VALUES (?, ?, ?)
      `;

      db.query(
        sql,
        [
          poll_id,
          student_id,
          selected_option,
        ],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json(err);
          }

          res.json({
            success: true,
            message:
              "Vote submitted successfully",
          });
        }
      );
    }
  );
};

/*
========================================
GET POLL RESULTS
========================================
*/

exports.getPollResults = (
  req,
  res
) => {
  const { poll_id } =
    req.params;

  const sql = `
    SELECT
      selected_option,
      COUNT(*) AS total_votes
    FROM poll_votes

    WHERE poll_id = ?

    GROUP BY selected_option
  `;

  db.query(
    sql,
    [poll_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};