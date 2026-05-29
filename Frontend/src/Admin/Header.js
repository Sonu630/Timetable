import React from "react";

export default function Header({
  toggleSidebar,
}) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-slate-100 hover:bg-slate-200 p-3 rounded-xl"
          >
            ☰
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Admin Panel
            </h1>

            <p className="text-slate-500 text-sm">
              Manage portal operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-2xl transition-all duration-300">
            Notifications
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href =
                "/Userportal/Login";
            }}
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-2xl"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}