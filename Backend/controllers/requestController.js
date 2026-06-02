const db = require("../config/db");

/*
========================================
CREATE REQUEST
========================================
*/

exports.createRequest = async (
  req,
  res
) => {
  try {
    const {
      professor_id,
      course_id,
      requested_day,
      requested_room,
      requested_start_time,
      requested_end_time,
      reason,
    } = req.body;

    const sql = `
      INSERT INTO professor_requests
      (
        professor_id,
        course_id,
        requested_day,
        requested_room,
        requested_start_time,
        requested_end_time,
        reason
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
    `;

    await db.query(sql, [
      professor_id,
      course_id,
      requested_day,
      requested_room,
      requested_start_time,
      requested_end_time,
      reason,
    ]);

    res.json({
      success: true,
      message:
        "Request submitted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET REQUESTS
========================================
*/

exports.getRequests =
  async (req, res) => {
    try {
      const sql = `
        SELECT *
        FROM professor_requests
        ORDER BY created_at DESC
      `;

      const result =
        await db.query(sql);

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

/*
========================================
UPDATE REQUEST STATUS
========================================
*/

exports.updateRequestStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { status } =
        req.body;

      const sql = `
        UPDATE professor_requests
        SET status = $1
        WHERE id = $2
      `;

      await db.query(sql, [
        status,
        id,
      ]);

      res.json({
        success: true,
        message:
          "Request updated successfully",
      });
    } catch (err) {
      console.error(err);

      res
        .status(500)
        .json(err);
    }
  };