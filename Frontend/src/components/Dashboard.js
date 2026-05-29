import React, { useEffect, useState, useCallback } from "react";
import { getMyEnrollments } from "../api/enrollmentApi";
import { getStudentTimetable } from "../api/timetableApi";
import { getNotifications } from "../api/notificationApi";
import socket from "../socket";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setError(null);
      const [enrollmentsRes, timetableRes, notificationsRes] = await Promise.all([
        getMyEnrollments(),
        getStudentTimetable(),
        getNotifications(),
      ]);

      setCourses(enrollmentsRes.data || []);
      setTimetable(timetableRes.data || []);
      setNotifications(notificationsRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    socket.on("notification", fetchDashboard);
    return () => socket.off("notification");
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-2">
          Welcome back, <span className="font-medium">{localStorage.getItem("username") || "Student"}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold">Enrolled Courses</h2>
          <p className="text-5xl mt-4 font-bold">{courses.length}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold">Classes Scheduled</h2>
          <p className="text-5xl mt-4 font-bold">{timetable.length}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-5xl mt-4 font-bold">{notifications.length}</p>
        </div>
      </div>

      {/* Add your Recent Courses and Notifications sections here (same as before) */}
    </div>
  );
}