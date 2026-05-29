import React from "react";

export default function Profprofile() {
  const username =
    localStorage.getItem(
      "username"
    );

  const role =
    localStorage.getItem("role");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 text-white text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl font-bold">
            {username?.charAt(0)}
          </div>

          <h1 className="text-4xl font-bold mt-5">
            {username}
          </h1>

          <p className="capitalize mt-2 text-white/90">
            {role}
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-100 rounded-2xl p-5">
            <h3 className="text-slate-500">
              Email
            </h3>

            <p className="font-semibold mt-2">
              professor@gmail.com
            </p>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5">
            <h3 className="text-slate-500">
              Department
            </h3>

            <p className="font-semibold mt-2">
              Computer Science
            </p>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5">
            <h3 className="text-slate-500">
              Experience
            </h3>

            <p className="font-semibold mt-2">
              8 Years
            </p>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5">
            <h3 className="text-slate-500">
              Qualification
            </h3>

            <p className="font-semibold mt-2">
              PhD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}