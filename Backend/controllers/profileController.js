const db = require("../config/db");

/*
========================================
GET PROFILE
========================================
*/

exports.getProfile = async (
  req,
  res
) => {
  try {
    const sql = `
      SELECT
        id,
        username,
        email,
        role
      FROM users
      WHERE id = $1
    `;

    const result =
      await db.query(
        sql,
        [req.user.id]
      );

    if (
      result.rows.length ===
      0
    ) {
      return res
        .status(404)
        .json({
          error:
            "User not found",
        });
    }

    res.json(
      result.rows[0]
    );
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error:
        "Failed to fetch profile",
    });
  }
};