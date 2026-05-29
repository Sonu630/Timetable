import React from "react";

export default function Alert({ alert }) {
  if (!alert) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-cyan-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl text-sm sm:text-base">
        {alert}
      </div>
    </div>
  );
}