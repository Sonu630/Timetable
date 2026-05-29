const db = require("../config/db");

exports.createCourse = (
  req,
  res
) => {
  const {
    course_name,
    course_code,
    credits,
    professor_id,
    department,
  } = req.body;

  const sql = `
    INSERT INTO courses
    (
      course_name,
      course_code,
      credits,
      professor_id,
      department
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      course_name,
      course_code,
      credits,
      professor_id,
      department,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Course created successfully",
      });
    }
  );
};

exports.getCourses = (
  req,
  res
) => {
  const sql = `
    SELECT
      courses.*,
      users.username AS professor_name
    FROM courses

    LEFT JOIN users
    ON courses.professor_id = users.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updateCourse = (
  req,
  res
) => {
  const { id } = req.params;

  const {
    course_name,
    course_code,
    credits,
    professor_id,
    department,
  } = req.body;

  const sql = `
    UPDATE courses
    SET
      course_name = ?,
      course_code = ?,
      credits = ?,
      professor_id = ?,
      department = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      course_name,
      course_code,
      credits,
      professor_id,
      department,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message:
          "Course updated successfully",
      });
    }
  );
};

exports.deleteCourse = (
  req,
  res
) => {
  const { id } = req.params;

  const sql =
    "DELETE FROM courses WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      success: true,
      message:
        "Course deleted successfully",
    });
  });
};