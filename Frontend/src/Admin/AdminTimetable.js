import React, {
  useEffect,
  useState,
} from "react";

import {
  getTimetable,
} from "../api/timetableApi";

export default function AdminTimetable() {
  const [timetable, setTimetable] =
    useState([]);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable =
    async () => {
      try {
        const response =
          await getTimetable();

        setTimetable(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Admin Timetable
      </h1>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full">

          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4">
                Course
              </th>

              <th className="text-left py-4">
                Code
              </th>

              <th className="text-left py-4">
                Day
              </th>

              <th className="text-left py-4">
                Room
              </th>

              <th className="text-left py-4">
                Start
              </th>

              <th className="text-left py-4">
                End
              </th>
            </tr>
          </thead>

          <tbody>
            {timetable.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
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
                    {
                      item.end_time
                    }
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