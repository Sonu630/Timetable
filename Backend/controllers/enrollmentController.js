const db = require("../config/db");

/*
========================================
ENROLL COURSE
========================================
*/

exports.enrollCourse = (
  req,
  res
) => {
  const student_id =
    req.user.id;

  const { course_id } =
    req.body;

  const checkSql = `
    SELECT * FROM enrollments
    WHERE student_id = ?
    AND course_id = ?
  `;

  db.query(
    checkSql,
    [student_id, course_id],
    (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({
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
        VALUES (?, ?)
      `;

      db.query(
        sql,
        [student_id, course_id],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json(err);
          }

          res.json({
            success: true,

            message:
              "Course enrolled successfully",
          });
        }
      );
    }
  );
};

/*
========================================
GET STUDENT ENROLLMENTS
========================================
*/

exports.getMyEnrollments = (
  req,
  res
) => {
  const sql = `
    SELECT
      courses.*
    FROM enrollments

    JOIN courses
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