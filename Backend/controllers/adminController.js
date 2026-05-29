const db = require("../config/db");

exports.getAnalytics = (
  req,
  res
) => {
  const analytics = {};

  const usersSql = `
    SELECT role, COUNT(*) AS total
    FROM users
    GROUP BY role
  `;

  const coursesSql = `
    SELECT COUNT(*) AS total_courses
    FROM courses
  `;

  const enrollmentsSql = `
    SELECT COUNT(*) AS total_enrollments
    FROM enrollments
  `;

  db.query(
    usersSql,
    (err, usersResult) => {
      analytics.users =
        usersResult;

      db.query(
        coursesSql,
        (
          err,
          coursesResult
        ) => {
          analytics.courses =
            coursesResult[0];

          db.query(
            enrollmentsSql,
            (
              err,
              enrollmentsResult
            ) => {
              analytics.enrollments =
                enrollmentsResult[0];

              res.json(
                analytics
              );
            }
          );
        }
      );
    }
  );
};