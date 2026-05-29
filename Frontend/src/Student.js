import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Left from "./components/Left";
import Right from "./components/Right";

import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Enroll from "./components/Enroll";
import Timetable from "./components/Timetable";
import Polls from "./components/Polls";
import StuAlert from "./components/StuAlert";

export default function Student() {
  const [alert, Setalert] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header toggleSidebar={toggleSidebar} />

      <StuAlert alert={alert} />

      <div className="flex flex-col lg:flex-row relative">
        <Left
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
        />

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto pb-24 lg:pb-6 w-full">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="Dashboard" />}
            />

            <Route
              path="Dashboard"
              element={<Dashboard />}
            />

            <Route
              path="Profile"
              element={<Profile />}
            />

            <Route
              path="Enroll"
              element={
                <Enroll
                  alert={alert}
                  Setalert={Setalert}
                />
              }
            />

            <Route
              path="Timetable"
              element={<Timetable />}
            />

            <Route
              path="Polls"
              element={<Polls />}
            />
          </Routes>
        </div>

        <Right />
      </div>
    </div>
  );
}