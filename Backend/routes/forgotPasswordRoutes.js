const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// SEND OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Forgot Password Email:", email);

    const user = await db.query(
      `
    SELECT *
    FROM users
    WHERE email=$1
  `,
      [email],
    );

    console.log("User Found:", user.rows);

    if (user.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.query(
      `
        UPDATE users
        SET otp=$1,
            otp_expiry=NOW() + INTERVAL '10 minutes'
        WHERE email=$2
      `,
      [otp, email],
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to send OTP",
    });
  }
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await db.query(
      `
        SELECT *
        FROM users
        WHERE email=$1
        AND otp=$2
        AND otp_expiry > NOW()
      `,
      [email, otp],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        error: "Invalid or expired OTP",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "OTP verification failed",
    });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      `
        UPDATE users
        SET password=$1,
            otp=NULL,
            otp_expiry=NULL
        WHERE email=$2
      `,
      [hashedPassword, email],
    );

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      error: "Password reset failed",
    });
  }
});

module.exports = router;
