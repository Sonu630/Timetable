import React, {
  useState,
} from "react";

import {
  createAnnouncement,
} from "../api/announcementApi";

export default function Edit() {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createAnnouncement(
          formData
        );

        alert(
          "Announcement Created"
        );

        setFormData({
          title: "",
          description: "",
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
          Edit Content
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 sm:py-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 sm:py-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-2xl"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}