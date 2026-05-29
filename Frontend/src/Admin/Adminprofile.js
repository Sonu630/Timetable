import React from "react";

export default function Adminprofile() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cyan-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-xl">
            A
          </div>

          <div className="flex-1 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Admin User
            </h1>

            <p className="text-slate-500 mt-2">
              System Administrator
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Email
                </h3>

                <p className="font-semibold break-all">
                  admin@gmail.com
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Role
                </h3>

                <p className="font-semibold">
                  Super Admin
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Department
                </h3>

                <p className="font-semibold">
                  Administration
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Access Level
                </h3>

                <p className="font-semibold">
                  Full Access
                </p>
              </div>
            </div>

            <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-2xl">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}