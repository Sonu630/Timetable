const db = require("../config/db");

/*
========================================
CREATE NOTIFICATION
========================================
*/

exports.createNotification =
  async (
    user_id,
    message
  ) => {
    try {
      const sql = `
        INSERT INTO notifications
        (
          user_id,
          message
        )
        VALUES ($1, $2)
      `;

      await db.query(sql, [
        user_id,
        message,
      ]);
    } catch (err) {
      console.error(
        "Notification Error:",
        err
      );
    }
  };

/*
========================================
GET NOTIFICATIONS
========================================
*/

exports.getNotifications =
  async (
    req,
    res
  ) => {
    try {
      const sql = `
        SELECT *
        FROM notifications

        WHERE user_id = $1

        ORDER BY created_at DESC
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