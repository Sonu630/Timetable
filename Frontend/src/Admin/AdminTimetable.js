import React from "react";

export default function AdminTimetable() {
  const timetable = [
    {
      department: "CSE",
      subject: "DSA",
      faculty: "Prof. Kumar",
      time: "9:00 AM",
    },

    {
      department: "ECE",
      subject: "Signals",
      faculty: "Prof. Sharma",
      time: "11:00 AM",
    },

    {
      department: "MECH",
      subject: "Thermodynamics",
      faculty: "Prof. Rao",
      time: "2:00 PM",
    },
  ];

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
                Department
              </th>

              <th className="text-left py-4">
                Subject
              </th>

              <th className="text-left py-4">
                Faculty
              </th>

              <th className="text-left py-4">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {timetable.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-300"
              >
                <td className="py-4">
                  {item.department}
                </td>

                <td className="py-4">
                  {item.subject}
                </td>

                <td className="py-4">
                  {item.faculty}
                </td>

                <td className="py-4">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}