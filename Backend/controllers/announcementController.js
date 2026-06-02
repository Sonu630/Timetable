const db = require("../config/db");

/*
========================================
CREATE ANNOUNCEMENT
========================================
*/

exports.createAnnouncement = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
    } = req.body;

    const sql = `
      INSERT INTO announcements
      (
        title,
        description
      )
      VALUES ($1, $2)
    `;

    await db.query(sql, [
      title,
      description,
    ]);

    res.json({
      success: true,
      message:
        "Announcement created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error:
        "Failed to create announcement",
    });
  }
};

/*
========================================
GET ANNOUNCEMENTS
========================================
*/

exports.getAnnouncements = async (
  req,
  res
) => {
  try {
    const result =
      await db.query(`
        SELECT *
        FROM announcements
        ORDER BY created_at DESC
      `);

    res.json(
      result.rows
    );
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error:
        "Failed to fetch announcements",
    });
  }
};