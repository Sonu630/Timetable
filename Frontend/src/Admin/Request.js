import React from "react";

export default function Request() {
  const requests = [
    {
      name: "Sonu",
      type: "Enrollment",
    },

    {
      name: "Rahul",
      type: "Course Change",
    },

    {
      name: "Anjali",
      type: "Timetable Update",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-8 border border-slate-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Requests
      </h1>

      <div className="space-y-4">
        {requests.map((req, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-100 rounded-2xl p-5"
          >
            <div>
              <h2 className="font-semibold text-slate-800">
                {req.name}
              </h2>

              <p className="text-slate-500">
                {req.type}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-xl">
                Approve
              </button>

              <button className="bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-xl">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}