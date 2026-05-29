const db = require("./db");

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,

      username VARCHAR(100) NOT NULL,

      email VARCHAR(100) UNIQUE NOT NULL,

      password VARCHAR(255) NOT NULL,

      role ENUM(
        'student',
        'professor',
        'admin'
      ) NOT NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Users Table Ready"
      );
    }
  });
};

const createCoursesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,

      course_name VARCHAR(255) NOT NULL,

      course_code VARCHAR(100) UNIQUE NOT NULL,

      credits INT NOT NULL,

      professor_id INT,

      department VARCHAR(100),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (professor_id)
      REFERENCES users(id)
      ON DELETE SET NULL
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Courses Table Ready"
      );
    }
  });
};


const createEnrollmentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,

      student_id INT NOT NULL,

      course_id INT NOT NULL,

      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (student_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Enrollments Table Ready"
      );
    }
  });
};
const createTimetableTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS timetable (
      id INT AUTO_INCREMENT PRIMARY KEY,

      course_id INT NOT NULL,

      day ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ),

      room VARCHAR(100),

      start_time TIME,

      end_time TIME,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Timetable Table Ready"
      );
    }
  });
};
const createProfessorRequestsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS professor_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,

      professor_id INT NOT NULL,

      course_id INT NOT NULL,

      requested_day VARCHAR(50),

      requested_room VARCHAR(100),

      requested_start_time TIME,

      requested_end_time TIME,

      reason TEXT,

      status ENUM(
        'pending',
        'approved',
        'rejected'
      ) DEFAULT 'pending',

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (professor_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Professor Requests Table Ready"
      );
    }
  });
};
const createPollsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS polls (
      id INT AUTO_INCREMENT PRIMARY KEY,

      professor_id INT NOT NULL,

      course_id INT NOT NULL,

      question VARCHAR(255) NOT NULL,

      option_one VARCHAR(100),

      option_two VARCHAR(100),

      option_three VARCHAR(100),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (professor_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Polls Table Ready"
      );
    }
  });
};
const createPollVotesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS poll_votes (
      id INT AUTO_INCREMENT PRIMARY KEY,

      poll_id INT NOT NULL,

      student_id INT NOT NULL,

      selected_option VARCHAR(100),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (poll_id)
      REFERENCES polls(id)
      ON DELETE CASCADE,

      FOREIGN KEY (student_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Poll Votes Table Ready"
      );
    }
  });
};
const createNotificationsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,

      user_id INT NOT NULL,

      message TEXT NOT NULL,

      is_read BOOLEAN DEFAULT false,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `;

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Notifications Table Ready"
      );
    }
  });
};
module.exports = {
  createUsersTable,
  createCoursesTable,
  createEnrollmentsTable,
  createTimetableTable,
  createProfessorRequestsTable,
  createPollsTable,
  createPollVotesTable,
  createNotificationsTable,
};