const db = require("../config/db");

/*
========================================
CREATE TIMETABLE
========================================
*/

exports.createTimetable = async (
  req,
  res
) => {
  try {
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
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(sql, [
      course_id,
      day,
      room,
      start_time,
      end_time,
    ]);

    res.json({
      success: true,
      message:
        "Timetable created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET ALL TIMETABLES
========================================
*/

exports.getTimetable = async (
  req,
  res
) => {
  try {
    const sql = `
      SELECT
        timetable.*,
        courses.course_name,
        courses.course_code
      FROM timetable

      JOIN courses
      ON timetable.course_id = courses.id
    `;

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
GET STUDENT TIMETABLE
========================================
*/

exports.getStudentTimetable =
  async (req, res) => {
    try {
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

        WHERE enrollments.student_id = $1
      `;

      const result =
        await db.query(
          sql,
          [req.user.id]
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

/*
========================================
UPDATE TIMETABLE
========================================
*/

exports.updateTimetable =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        day,
        room,
        start_time,
        end_time,
      } = req.body;

      const sql = `
        UPDATE timetable
        SET
          day = $1,
          room = $2,
          start_time = $3,
          end_time = $4
        WHERE id = $5
      `;

      await db.query(sql, [
        day,
        room,
        start_time,
        end_time,
        id,
      ]);

      res.json({
        success: true,
        message:
          "Timetable updated successfully",
      });
    } catch (err) {
      console.error(err);

      res
        .status(500)
        .json(err);
    }
  };

/*
========================================
DELETE TIMETABLE
========================================
*/

exports.deleteTimetable =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const sql = `
        DELETE FROM timetable
        WHERE id = $1
      `;

      await db.query(sql, [
        id,
      ]);

      res.json({
        success: true,
        message:
          "Timetable deleted successfully",
      });
    } catch (err) {
      console.error(err);

      res
        .status(500)
        .json(err);
    }
  };