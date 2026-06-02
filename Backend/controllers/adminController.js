const db = require("../config/db");

exports.getAnalytics = async (
  req,
  res
) => {
  try {
    const usersSql = `
      SELECT role,
      COUNT(*) AS total
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

    const usersResult =
      await db.query(
        usersSql
      );

    const coursesResult =
      await db.query(
        coursesSql
      );

    const enrollmentsResult =
      await db.query(
        enrollmentsSql
      );

    res.json({
      users:
        usersResult.rows,

      courses:
        coursesResult.rows[0],

      enrollments:
        enrollmentsResult.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error:
        "Failed to fetch analytics",
    });
  }
};