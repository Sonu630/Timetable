import React from "react";

export default function Profile() {
  const username =
    localStorage.getItem(
      "username"
    );

  const role =
    localStorage.getItem("role");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
            {username?.charAt(0)}
          </div>

          <h1 className="text-3xl font-bold mt-6">
            {username}
          </h1>

          <p className="text-slate-500 capitalize mt-2">
            {role}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-slate-100 rounded-2xl p-5">
            <h2 className="font-bold">
              Email
            </h2>

            <p className="mt-2 text-slate-600">
              User Email
            </p>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5">
            <h2 className="font-bold">
              Department
            </h2>

            <p className="mt-2 text-slate-600">
              CSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}