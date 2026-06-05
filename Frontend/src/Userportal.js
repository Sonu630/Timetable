import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./Register";
import Userlogin from "./Userlogin";

export default function Userportal({ alert, Setalert }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to="Login" />} />

          <Route
            path="Login"
            element={<Userlogin alert={alert} Setalert={Setalert} />}
          />

          <Route
            path="Register"
            element={<Register alert={alert} Setalert={Setalert} />}
          />
        </Routes>
      </div>
    </div>
  );
}
