const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const http = require("http");

const { Server } = require(
  "socket.io"
);

dotenv.config();

const app = express();

const server =
  http.createServer(app);

/*
========================================
SOCKET IO
========================================
*/

const io = new Server(server, {
  cors: {
    origin:
      "http://localhost:3000",

    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(
    "User Connected:",
    socket.id
  );

  socket.on("disconnect", () => {
    console.log(
      "User Disconnected:",
      socket.id
    );
  });
});

/*
========================================
EXPORT IO
========================================
*/

module.exports.io = io;

/*
========================================
DATABASE
========================================
*/

require("./config/db");

/*
========================================
TABLES
========================================
*/

const {
  createUsersTable,
  createCoursesTable,
  createEnrollmentsTable,
  createTimetableTable,
  createProfessorRequestsTable,
  createPollsTable,
  createPollVotesTable,
  createNotificationsTable,
} = require("./config/createTables");

/*
========================================
MIDDLEWARE
========================================
*/

const authMiddleware = require(
  "./middleware/authMiddleware"
);

const roleMiddleware = require(
  "./middleware/roleMiddleware"
);

/*
========================================
ROUTES
========================================
*/

const authRoutes = require(
  "./routes/authRoutes"
);

const courseRoutes = require(
  "./routes/courseRoutes"
);

const timetableRoutes = require(
  "./routes/timetableRoutes"
);

const enrollmentRoutes = require(
  "./routes/enrollmentRoutes"
);

const pollRoutes = require(
  "./routes/pollRoutes"
);

const requestRoutes = require(
  "./routes/requestRoutes"
);

const notificationRoutes = require(
  "./routes/notificationRoutes"
);

const adminRoutes = require(
  "./routes/adminRoutes"
);

/*
========================================
APP MIDDLEWARE
========================================
*/

app.use(cors());

app.use(express.json());

/*
========================================
CREATE TABLES
========================================
*/

createUsersTable();

createCoursesTable();

createEnrollmentsTable();

createTimetableTable();

createProfessorRequestsTable();

createPollsTable();

createPollVotesTable();

createNotificationsTable();

/*
========================================
API ROUTES
========================================
*/

app.use("/", authRoutes);

app.use("/", courseRoutes);

app.use("/", timetableRoutes);

app.use("/", enrollmentRoutes);

app.use("/", pollRoutes);

app.use("/", requestRoutes);

app.use("/", notificationRoutes);

app.use("/", adminRoutes);

/*
========================================
HOME ROUTE
========================================
*/

app.get("/", (req, res) => {
  res.send(
    "IIT Indore Timetable Management API Running"
  );
});

/*
========================================
TEST PROTECTED ROUTES
========================================
*/

app.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({
      success: true,

      message:
        "Welcome Student",

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

      message:
        "Welcome Professor",

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

      message:
        "Welcome Admin",

      user: req.user,
    });
  }
);

/*
========================================
404 HANDLER
========================================
*/

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/*
========================================
GLOBAL ERROR HANDLER
========================================
*/

app.use(
  (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
      error: "Server Error",
    });
  }
);

/*
========================================
START SERVER
========================================
*/

const PORT =
  process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`
========================================
Server running on port ${PORT}
========================================
`);
});