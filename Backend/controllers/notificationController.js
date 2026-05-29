const db = require("../config/db");

/*
========================================
CREATE NOTIFICATION
========================================
*/

exports.createNotification = (
  user_id,
  message
) => {
  const sql = `
    INSERT INTO notifications
    (
      user_id,
      message
    )
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [user_id, message]
  );
};

/*
========================================
GET NOTIFICATIONS
========================================
*/

exports.getNotifications = (
  req,
  res
) => {
  const sql = `
    SELECT *
    FROM notifications

    WHERE user_id = ?

    ORDER BY created_at DESC
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