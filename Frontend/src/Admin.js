import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Left from "./Admin/Left";
import Header from "./Admin/Header";

import AdminDashboard from "./Admin/AdminDashboard";
import Edit from "./Admin/Edit";
import AdminTimetable from "./Admin/AdminTimetable";
import Pollsresult from "./Admin/Pollsresult";
import Adminprofile from "./Admin/Adminprofile";
import Request from "./Admin/Request";

export default function Admin() {
  const [isExpanded, setIsExpanded] =
    useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-col lg:flex-row relative">
        <Left
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
        />

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto pb-24 lg:pb-6 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to="AdminDashboard" />
              }
            />

            <Route
              path="AdminDashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="Admintimetable"
              element={<AdminTimetable />}
            />

            <Route
              path="Edit"
              element={<Edit />}
            />

            <Route
              path="Requests"
              element={<Request />}
            />

            <Route
              path="Pollsresult"
              element={<Pollsresult />}
            />

            <Route
              path="Adminprofile"
              element={<Adminprofile />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}