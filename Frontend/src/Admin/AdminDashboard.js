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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
}