import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Left({
  isExpanded,
  toggleSidebar,
}) {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/Admin/AdminDashboard",
      icon: "🏠",
    },

    {
      title: "Timetable",
      path: "/Admin/Admintimetable",
      icon: "📅",
    },

    {
      title: "Edit",
      path: "/Admin/Edit",
      icon: "✏️",
    },

    {
      title: "Requests",
      path: "/Admin/Requests",
      icon: "📩",
    },

    {
      title: "Poll Results",
      path: "/Admin/Pollsresult",
      icon: "📊",
    },

    {
      title: "Profile",
      path: "/Admin/Adminprofile",
      icon: "👤",
    },
  ];

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed lg:static z-40 top-0 left-0 bg-slate-900 text-white min-h-screen transition-transform duration-300 ease-in-out shadow-2xl ${
          isExpanded
            ? "w-72 sm:w-64 translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h1
            className={`text-xl font-bold transition-all duration-300 ${
              !isExpanded && "lg:hidden"
            }`}
          >
            Admin
          </h1>

          <button
            onClick={toggleSidebar}
            className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                location.pathname === menu.path
                  ? "bg-cyan-500"
                  : "hover:bg-cyan-500"
              }`}
            >
              <span className="text-xl">
                {menu.icon}
              </span>

              <span
                className={`transition-all duration-300 ${
                  !isExpanded && "lg:hidden"
                }`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}