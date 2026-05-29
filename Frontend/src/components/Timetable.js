import React, {
  useEffect,
  useState,
} from "react";

import {
  getStudentTimetable,
} from "../api/timetableApi";

import socket from "../socket";

export default function Timetable() {
  const [timetable, setTimetable] =
    useState([]);

  useEffect(() => {
    fetchTimetable();

    socket.on(
      "timetableUpdated",
      () => {
        fetchTimetable();
      }
    );

    return () => {
      socket.off(
        "timetableUpdated"
      );
    };
  }, []);

  const fetchTimetable =
    async () => {
      try {
        const response =
          await getStudentTimetable();

        setTimetable(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Timetable
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 text-left">
                Course
              </th>

              <th className="py-4 text-left">
                Code
              </th>

              <th className="py-4 text-left">
                Day
              </th>

              <th className="py-4 text-left">
                Room
              </th>

              <th className="py-4 text-left">
                Start
              </th>

              <th className="py-4 text-left">
                End
              </th>
            </tr>
          </thead>

          <tbody>
            {timetable.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-4">
                    {
                      item.course_name
                    }
                  </td>

                  <td className="py-4">
                    {
                      item.course_code
                    }
                  </td>

                  <td className="py-4">
                    {item.day}
                  </td>

                  <td className="py-4">
                    {item.room}
                  </td>

                  <td className="py-4">
                    {
                      item.start_time
                    }
                  </td>

                  <td className="py-4">
                    {item.end_time}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}