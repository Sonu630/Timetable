import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Userportal from "./Userportal";
import Student from "./Student";
import ForgotPassword from "./ForgotPassword";
import Admin from "./Admin";
import Professor from "./Professor";
import Alert from "./Alert";

export default function App() {
  const [alert, Setalert] = useState(null);
  return (
    <div>
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Navigate to="/Userportal" />} />

        <Route
          path="/Userportal/*"
          element={<Userportal alert={alert} Setalert={Setalert} />}
        />

        <Route
          path="/Student/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Student alert={alert} Setalert={Setalert} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Professor/*"
          element={
            <ProtectedRoute allowedRole="professor">
              <Professor alert={alert} Setalert={Setalert} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin alert={alert} Setalert={Setalert} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword alert={alert} Setalert={Setalert} />}
        />
      </Routes>{" "}
    </div>
  );
}
