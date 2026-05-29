const db = require("../config/db");

exports.createRequest = (
  req,
  res
) => {
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
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      professor_id,
      course_id,
      requested_day,
      requested_room,
      requested_start_time,
      requested_end_time,
      reason,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Request submitted successfully",
      });
    }
  );
};

exports.getRequests = (
  req,
  res
) => {
  const sql = `
    SELECT * FROM professor_requests
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updateRequestStatus = (
  req,
  res
) => {
  const { id } = req.params;

  const { status } = req.body;

  const sql = `
    UPDATE professor_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Request updated successfully",
      });
    }
  );
};