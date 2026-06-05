import React, { useEffect, useState } from "react";

import { enrollCourse, getMyEnrollments } from "../api/enrollmentApi";

import { getCourses } from "../api/courseApi";

import socket from "../socket";

export default function Enroll({ Setalert }) {
  const [courses, setCourses] = useState([]);

  const [myCourses, setMyCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();

    socket.on("courseUpdated", () => {
      fetchData();
    });

    return () => {
      socket.off("courseUpdated");
    };

    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const coursesResponse = await getCourses();

      const enrollmentsResponse = await getMyEnrollments();

      setCourses(coursesResponse.data);

      setMyCourses(enrollmentsResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (course_id) => {
    try {
      await enrollCourse({
        course_id,
      });

      Setalert("Course Enrolled Successfully");
      setTimeout(() => {
        Setalert(null);
      }, 1500);

      fetchData();

      socket.emit("courseUpdated");
    } catch (error) {
      Setalert(error.response?.data?.error || "Enrollment Failed");
      setTimeout(() => {
        Setalert(null);
      }, 1500);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Enroll Courses
          </h1>

          <p className="text-slate-500 mt-2">
            Browse and enroll into available courses
          </p>
        </div>

        <div className="bg-cyan-500 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold">
          {myCourses.length} Enrolled
        </div>
      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4">
        <input
          type="text"
          placeholder="Search Courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-lg"
        />
      </div>

      {/* COURSES */}

      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-slate-500">
          No Courses Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = myCourses.find((c) => c.id === course.id);

            return (
              <div
                key={course.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* TOP */}

                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{course.course_name}</h2>

                    <div className="bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-sm">
                      {course.credits} Credits
                    </div>
                  </div>

                  <p className="mt-3 text-white/90">{course.course_code}</p>
                </div>

                {/* BODY */}

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Department</span>

                    <span className="font-semibold text-slate-700">
                      {course.department}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Professor</span>

                    <span className="font-semibold text-slate-700">
                      {course.professor_name}
                    </span>
                  </div>

                  <button
                    disabled={enrolled}
                    onClick={() => handleEnroll(course.id)}
                    className={`w-full mt-5 py-4 rounded-2xl text-white font-semibold transition-all duration-300 ${
                      enrolled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {enrolled ? "Already Enrolled" : "Enroll Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
