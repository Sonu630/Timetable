const db = require("../config/db");

/*
========================================
CREATE COURSE
========================================
*/

exports.createCourse = async (
  req,
  res
) => {
  try {
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
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(sql, [
      course_name,
      course_code,
      credits,
      professor_id,
      department,
    ]);

    res.json({
      success: true,
      message:
        "Course created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET COURSES
========================================
*/

exports.getCourses = async (
  req,
  res
) => {
  try {
    const sql = `
      SELECT
        courses.*,
        users.username AS professor_name
      FROM courses

      LEFT JOIN users
      ON courses.professor_id = users.id
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
UPDATE COURSE
========================================
*/

exports.updateCourse = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

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
        course_name = $1,
        course_code = $2,
        credits = $3,
        professor_id = $4,
        department = $5
      WHERE id = $6
    `;

    await db.query(sql, [
      course_name,
      course_code,
      credits,
      professor_id,
      department,
      id,
    ]);

    res.json({
      success: true,
      message:
        "Course updated successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
DELETE COURSE
========================================
*/

exports.deleteCourse = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const sql = `
      DELETE FROM courses
      WHERE id = $1
    `;

    await db.query(sql, [
      id,
    ]);

    res.json({
      success: true,
      message:
        "Course deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};