import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

export default function AdminDashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const response =
          await API.get(
            "/analytics"
          );

        setAnalytics(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!analytics) {
    return (
      <div>Loading...</div>
    );
  }

  const students =
    analytics.users.find(
      (u) => u.role === "student"
    )?.total || 0;

  const professors =
    analytics.users.find(
      (u) =>
        u.role === "professor"
    )?.total || 0;

  const admins =
    analytics.users.find(
      (u) => u.role === "admin"
    )?.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

      <div className="bg-cyan-500 text-white rounded-3xl p-6">
        <h2 className="text-xl font-bold">
          Total Courses
        </h2>

        <p className="text-5xl mt-5 font-bold">
          {
            analytics.courses
              .total_courses
          }
        </p>
      </div>

      <div className="bg-green-500 text-white rounded-3xl p-6">
        <h2 className="text-xl font-bold">
          Enrollments
        </h2>

        <p className="text-5xl mt-5 font-bold">
          {
            analytics
              .enrollments
              .total_enrollments
          }
        </p>
      </div>

      <div className="bg-purple-500 text-white rounded-3xl p-6">
        <h2 className="text-xl font-bold">
          Students
        </h2>

        <p className="text-5xl mt-5 font-bold">
          {students}
        </p>
      </div>

      <div className="bg-orange-500 text-white rounded-3xl p-6">
        <h2 className="text-xl font-bold">
          Professors
        </h2>

        <p className="text-5xl mt-5 font-bold">
          {professors}
        </p>
      </div>

      <div className="bg-red-500 text-white rounded-3xl p-6">
        <h2 className="text-xl font-bold">
          Admins
        </h2>

        <p className="text-5xl mt-5 font-bold">
          {admins}
        </p>
      </div>

    </div>
  );
}