const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/*
========================================
REGISTER
========================================
*/

exports.register = async (
  req,
  res
) => {
  try {
    const {
      username,
      email,
      password,
      role,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const sql = `
      INSERT INTO users
      (
        username,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(sql, [
      username,
      email,
      hashedPassword,
      role,
    ]);

    res.json({
      success: true,
      message:
        "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Registration failed",
    });
  }
};

/*
========================================
LOGIN
========================================
*/

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const sql = `
      SELECT *
      FROM users
      WHERE email = $1
    `;

    const result =
      await db.query(sql, [
        email,
      ]);

    if (
      result.rows.length ===
      0
    ) {
      return res
        .status(400)
        .json({
          error:
            "Invalid credentials",
        });
    }

    const user =
      result.rows[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res
        .status(400)
        .json({
          error:
            "Invalid credentials",
        });
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,
      role: user.role,
      username:
        user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error:
        "Login failed",
    });
  }
};