import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Userportal from "./Userportal";
import Student from "./Student";
import ForgotPassword from "./ForgotPassword";
import Admin from "./Admin";
import Professor from "./Professor";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/Userportal" />}
      />

      <Route
        path="/Userportal/*"
        element={<Userportal />}
      />

      <Route
        path="/Student/*"
        element={<Student />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/Admin/*"
        element={<Admin />}
      />

      <Route
        path="/Professor/*"
        element={<Professor />}
      />
    </Routes>
  );
}