import React, {
  useEffect,
  useState,
} from "react";

import { getCourses } from "../api/courseApi";

import socket from "../socket";

export default function Professordashboard() {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCourses();

    socket.on(
      "courseUpdated",
      () => {
        fetchCourses();
      }
    );

    return () => {
      socket.off(
        "courseUpdated"
      );
    };

    // eslint-disable-next-line
  }, []);

  const fetchCourses =
    async () => {
      try {
        const response =
          await getCourses();

        const username =
          localStorage.getItem(
            "username"
          );

        const filtered =
          response.data.filter(
            (course) =>
              course.professor_name ===
              username
          );

        setCourses(filtered);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold">
            My Courses
          </h2>

          <p className="text-6xl mt-4 font-bold">
            {courses.length}
          </p>
        </div>
      </div>

      {/* COURSES */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 text-white">
              <h2 className="text-2xl font-bold">
                {
                  course.course_name
                }
              </h2>

              <p className="mt-2 text-white/90">
                {
                  course.course_code
                }
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Credits
                </span>

                <span className="font-semibold">
                  {course.credits}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Department
                </span>

                <span className="font-semibold">
                  {
                    course.department
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}