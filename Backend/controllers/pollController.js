const db = require("../config/db");

/*
========================================
CREATE POLL
========================================
*/

exports.createPoll = async (
  req,
  res
) => {
  try {
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
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await db.query(sql, [
      req.user.id,
      course_id,
      question,
      option_one,
      option_two,
      option_three,
    ]);

    res.json({
      success: true,
      message:
        "Poll created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET POLLS
========================================
*/

exports.getPolls = async (
  req,
  res
) => {
  try {
    const sql =
      "SELECT * FROM polls";

    const result =
      await db.query(sql);

    res.json(
      result.rows
    );
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
VOTE POLL
========================================
*/

exports.votePoll = async (
  req,
  res
) => {
  try {
    const {
      poll_id,
      selected_option,
    } = req.body;

    const student_id =
      req.user.id;

    const checkSql = `
      SELECT *
      FROM poll_votes
      WHERE poll_id = $1
      AND student_id = $2
    `;

    const checkResult =
      await db.query(
        checkSql,
        [
          poll_id,
          student_id,
        ]
      );

    if (
      checkResult.rows.length >
      0
    ) {
      return res
        .status(400)
        .json({
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
      VALUES ($1, $2, $3)
    `;

    await db.query(sql, [
      poll_id,
      student_id,
      selected_option,
    ]);

    res.json({
      success: true,
      message:
        "Vote submitted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET POLL RESULTS
========================================
*/

exports.getPollResults =
  async (req, res) => {
    try {
      const { poll_id } =
        req.params;

      const sql = `
        SELECT
          selected_option,
          COUNT(*) AS total_votes
        FROM poll_votes

        WHERE poll_id = $1

        GROUP BY selected_option
      `;

      const result =
        await db.query(
          sql,
          [poll_id]
        );

      res.json(
        result.rows
      );
    } catch (err) {
      console.error(err);

      res
        .status(500)
        .json(err);
    }
  };