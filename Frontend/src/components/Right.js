import React from "react";

export default function Right() {
  return (
    <div className="hidden 2xl:block w-80 p-6 space-y-6">
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Notifications
        </h2>

        <div className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-2xl">
            New poll added
          </div>

          <div className="bg-slate-100 p-4 rounded-2xl">
            Timetable updated
          </div>

          <div className="bg-slate-100 p-4 rounded-2xl">
            New course enrolled
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold">
          Premium UI
        </h2>

        <p className="mt-3 text-cyan-100">
          Fully responsive Tailwind dashboard
        </p>
      </div>
    </div>
  );
}