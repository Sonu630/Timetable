import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Professor/Header";
import Left from "./Professor/Left";

import Profprofile from "./Professor/Profprofile";
import Professordashboard from "./Professor/Professordashboard";
import Professorpolls from "./Professor/Professorpolls";
import Profrequest from "./Professor/Profrequest";

export default function Professor() {
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
                <Navigate to="Professordashboard" />
              }
            />

            <Route
              path="Professordashboard"
              element={<Professordashboard />}
            />

            <Route
              path="Profprofile"
              element={<Profprofile />}
            />

            <Route
              path="Professorpolls"
              element={<Professorpolls />}
            />

            <Route
              path="Profrequest"
              element={<Profrequest />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}