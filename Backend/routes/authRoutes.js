const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/db");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const {
  register,
  login,
} = require("../controllers/authController");

// Normal Auth Routes
router.post("/register", register);
router.post("/login", login);

// Google Login Route
router.post(
  "/google-login",
  async (req, res) => {
    try {
      const { credential } = req.body;

      if (!credential) {
        return res.status(400).json({
          error: "Google credential missing",
        });
      }

      const ticket =
        await client.verifyIdToken({
          idToken: credential,
          audience:
            process.env.GOOGLE_CLIENT_ID,
        });

      const payload =
        ticket.getPayload();

      const email = payload.email;
      const username = payload.name;

      // Check if user exists
      const userResult =
        await db.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
        `,
          [email]
        );

      let user;

      if (
        userResult.rows.length === 0
      ) {
        // Generate dummy password
        const googlePassword =
          await bcrypt.hash(
            Math.random()
              .toString(36)
              .slice(-12),
            10
          );

        // Create new student account
        const insertUser =
          await db.query(
            `
            INSERT INTO users
            (
              username,
              email,
              password,
              role
            )
            VALUES
            (
              $1,
              $2,
              $3,
              $4
            )
            RETURNING *
          `,
            [
              username,
              email,
              googlePassword,
              "student",
            ]
          );

        user =
          insertUser.rows[0];
      } else {
        user =
          userResult.rows[0];
      }

      // Create JWT
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        success: true,
        token,
        role: user.role,
        username: user.username,
      });
    } catch (err) {
      console.error(
        "Google Login Error:",
        err
      );

      res.status(400).json({
        success: false,
        error:
          "Google Authentication Failed",
      });
    }
  }
);

module.exports = router;