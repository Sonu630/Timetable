const db = require("../config/db");

/*
========================================
CREATE TIMETABLE
========================================
*/

exports.createTimetable = (
  req,
  res
) => {
  const {
    course_id,
    day,
    room,
    start_time,
    end_time,
  } = req.body;

  const sql = `
    INSERT INTO timetable
    (
      course_id,
      day,
      room,
      start_time,
      end_time
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      course_id,
      day,
      room,
      start_time,
      end_time,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Timetable created successfully",
      });
    }
  );
};

/*
========================================
GET ALL TIMETABLES
========================================
*/

exports.getTimetable = (
  req,
  res
) => {
  const sql = `
    SELECT
      timetable.*,
      courses.course_name,
      courses.course_code
    FROM timetable

    JOIN courses
    ON timetable.course_id = courses.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

/*
========================================
GET STUDENT TIMETABLE
========================================
*/

exports.getStudentTimetable = (
  req,
  res
) => {
  const sql = `
    SELECT
      timetable.*,
      courses.course_name,
      courses.course_code,
      courses.department
    FROM timetable

    JOIN courses
    ON timetable.course_id = courses.id

    JOIN enrollments
    ON enrollments.course_id = courses.id

    WHERE enrollments.student_id = ?
  `;

  db.query(
    sql,
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

/*
========================================
UPDATE TIMETABLE
========================================
*/

exports.updateTimetable = (
  req,
  res
) => {
  const { id } = req.params;

  const {
    day,
    room,
    start_time,
    end_time,
  } = req.body;

  const sql = `
    UPDATE timetable
    SET
      day = ?,
      room = ?,
      start_time = ?,
      end_time = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      day,
      room,
      start_time,
      end_time,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Timetable updated successfully",
      });
    }
  );
};

/*
========================================
DELETE TIMETABLE
========================================
*/

exports.deleteTimetable = (
  req,
  res
) => {
  const { id } = req.params;

  const sql =
    "DELETE FROM timetable WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message:
        "Timetable deleted successfully",
    });
  });
};