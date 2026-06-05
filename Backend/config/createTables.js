const db = require("./db");

const createUsersTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,

  username VARCHAR(100) NOT NULL,

  email VARCHAR(100) UNIQUE NOT NULL,

  password VARCHAR(255) NOT NULL,

  role VARCHAR(20) NOT NULL
  CHECK (
    role IN (
      'student',
      'professor',
      'admin'
    )
  ),

  otp VARCHAR(6),

  otp_expiry TIMESTAMP,

  is_verified BOOLEAN DEFAULT FALSE,

  verification_token TEXT,

  profile_picture TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  await db.query(sql);
  console.log("Users Table Ready");
};

const createCoursesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      course_name VARCHAR(255) NOT NULL,
      course_code VARCHAR(100) UNIQUE NOT NULL,
      credits INT NOT NULL,
      professor_id INT,
      department VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (professor_id)
      REFERENCES users(id)
      ON DELETE SET NULL
    );
  `;

  await db.query(sql);
  console.log("Courses Table Ready");
};

const createEnrollmentsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS enrollments (
      id SERIAL PRIMARY KEY,
      student_id INT NOT NULL,
      course_id INT NOT NULL,
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (student_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    );
  `;

  await db.query(sql);
  console.log("Enrollments Table Ready");
};

const createTimetableTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS timetable (
      id SERIAL PRIMARY KEY,

      course_id INT NOT NULL,

      day VARCHAR(20)
      CHECK (
        day IN (
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        )
      ),

      room VARCHAR(100),

      start_time TIME,

      end_time TIME,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    );
  `;

  await db.query(sql);
  console.log("Timetable Table Ready");
};

const createProfessorRequestsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS professor_requests (
      id SERIAL PRIMARY KEY,

      professor_id INT NOT NULL,

      course_id INT NOT NULL,

      requested_day VARCHAR(50),

      requested_room VARCHAR(100),

      requested_start_time TIME,

      requested_end_time TIME,

      reason TEXT,

      status VARCHAR(20)
      DEFAULT 'pending'
      CHECK (
        status IN (
          'pending',
          'approved',
          'rejected'
        )
      ),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (professor_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      FOREIGN KEY (course_id)
      REFERENCES courses(id)
      ON DELETE CASCADE
    );
  `;

  await db.query(sql);
  console.log("Professor Requests Table Ready");
};

const createPollsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS polls (
      id SERIAL PRIMARY KEY,

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
    );
  `;

  await db.query(sql);
  console.log("Polls Table Ready");
};

const createPollVotesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS poll_votes (
      id SERIAL PRIMARY KEY,

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
    );
  `;

  await db.query(sql);
  console.log("Poll Votes Table Ready");
};

const createNotificationsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,

      user_id INT NOT NULL,

      message TEXT NOT NULL,

      is_read BOOLEAN DEFAULT FALSE,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    );
  `;

  await db.query(sql);
  console.log("Notifications Table Ready");
};

const createAnnouncementsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,

      title VARCHAR(255),

      description TEXT,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await db.query(sql);
  console.log("Announcements Table Ready");
};
const updateUsersTable = async () => {
  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS otp VARCHAR(6);
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS otp_expiry TIMESTAMP;
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS verification_token TEXT;
  `);

  await db.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS profile_picture TEXT;
  `);

  console.log("Users Table Updated");
};

module.exports = {
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
};
