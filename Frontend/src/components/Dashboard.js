import React, {
  useEffect,
  useState,
} from "react";

import {
  getMyEnrollments,
} from "../api/enrollmentApi";

import {
  getStudentTimetable,
} from "../api/timetableApi";

import {
  getNotifications,
} from "../api/notificationApi";

import socket from "../socket";

export default function Dashboard() {
  const [courses, setCourses] =
    useState([]);

  const [timetable, setTimetable] =
    useState([]);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {
    fetchDashboard();

    socket.on(
      "notification",
      () => {
        fetchNotifications();
      }
    );

    return () => {
      socket.off(
        "notification"
      );
    };
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const enrollments =
          await getMyEnrollments();

        const timetableData =
          await getStudentTimetable();

        setCourses(
          enrollments.data
        );

        setTimetable(
          timetableData.data
        );

        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };

  const fetchNotifications =
    async () => {
      try {
        const response =
          await getNotifications();

        setNotifications(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="space-y-8">
      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-cyan-500 text-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold">
            Enrolled Courses
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {courses.length}
          </p>
        </div>

        <div className="bg-green-500 text-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold">
            Classes This Week
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {timetable.length}
          </p>
        </div>

        <div className="bg-purple-500 text-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold">
            Notifications
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {
              notifications.length
            }
          </p>
        </div>
      </div>

      {/* RECENT COURSES */}

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recent Courses
        </h2>

        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-100 p-4 rounded-2xl"
            >
              <h3 className="font-bold">
                {
                  course.course_name
                }
              </h3>

              <p className="text-slate-500">
                {
                  course.course_code
                }
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATIONS */}

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recent Notifications
        </h2>

        <div className="space-y-4">
          {notifications.length ===
          0 ? (
            <div className="text-slate-500">
              No Notifications
            </div>
          ) : (
            notifications.map(
              (
                notification
              ) => (
                <div
                  key={
                    notification.id
                  }
                  className="bg-slate-100 p-4 rounded-2xl border-l-4 border-cyan-500"
                >
                  <p>
                    {
                      notification.message
                    }
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    {
                      notification.created_at
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}