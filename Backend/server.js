const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://timetablemanagementsystem-three.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

module.exports.io = io;

// Database
require("./config/db");

// Table creation functions
const {
  createUsersTable,
  updateUsersTable,
  createCoursesTable,
  createEnrollmentsTable,
  createTimetableTable,
  createProfessorRequestsTable,
  createPollsTable,
  createPollVotesTable,
  createNotificationsTable,
  createAnnouncementsTable,
} = require("./config/createTables");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const courseRoutes = require("./routes/courseRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const pollRoutes = require("./routes/pollRoutes");
const requestRoutes = require("./routes/requestRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");
const announcementRoute = require("./routes/announcementRoute");

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://timetablemanagementsystem-three.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Create tables
const initTables = async () => {
  try {
    await createUsersTable();
    await updateUsersTable();
    await createCoursesTable();
    await createEnrollmentsTable();
    await createTimetableTable();
    await createProfessorRequestsTable();
    await createPollsTable();
    await createPollVotesTable();
    await createNotificationsTable();
    await createAnnouncementsTable();

    console.log(`
========================================
All Tables Created Successfully
========================================
`);
  } catch (err) {
    console.error("Table Creation Error:", err);
    process.exit(1);
  }
};

initTables();

// Routes
app.use("/", authRoutes);
app.use("/", forgotPasswordRoutes);
app.use("/", courseRoutes);
app.use("/", timetableRoutes);
app.use("/", enrollmentRoutes);
app.use("/", pollRoutes);
app.use("/", requestRoutes);
app.use("/", notificationRoutes);
app.use("/", adminRoutes);
app.use("/", profileRoutes);
app.use("/", announcementRoute);

// Health Check
app.get("/", (req, res) => {
  res.send("IIT Indore Timetable Management API Running");
});

// Protected Routes
app.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Student",
      user: req.user,
    });
  }
);

app.get(
  "/professor",
  authMiddleware,
  roleMiddleware("professor"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Professor",
      user: req.user,
    });
  }
);

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Server Error",
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`
========================================
Server running on port ${PORT}
========================================
`);
});