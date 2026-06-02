const db = require("../config/db");

/*
========================================
ENROLL COURSE
========================================
*/

exports.enrollCourse = async (
  req,
  res
) => {
  try {
    const student_id =
      req.user.id;

    const { course_id } =
      req.body;

    const checkSql = `
      SELECT *
      FROM enrollments
      WHERE student_id = $1
      AND course_id = $2
    `;

    const checkResult =
      await db.query(
        checkSql,
        [
          student_id,
          course_id,
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
            "Already enrolled",
        });
    }

    const sql = `
      INSERT INTO enrollments
      (
        student_id,
        course_id
      )
      VALUES ($1, $2)
    `;

    await db.query(sql, [
      student_id,
      course_id,
    ]);

    res.json({
      success: true,
      message:
        "Course enrolled successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
};

/*
========================================
GET STUDENT ENROLLMENTS
========================================
*/

exports.getMyEnrollments =
  async (req, res) => {
    try {
      const sql = `
        SELECT
          courses.*
        FROM enrollments

        JOIN courses
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