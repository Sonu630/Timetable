import React,{ useEffect }from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/Userportal/Login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Userportal/Login");
    }
  }, [navigate]);
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
              Dashboard
            </h1>

            <p className="text-slate-500 text-sm">Welcome back</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
