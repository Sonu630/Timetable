import React, {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "../api/profileApi";

export default function Adminprofile() {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const response =
          await getProfile();

        setProfile(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cyan-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-xl">
            {profile.username
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="flex-1 w-full">

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              {profile.username}
            </h1>

            <p className="text-slate-500 mt-2">
              {profile.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">

              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Email
                </h3>

                <p className="font-semibold break-all">
                  {profile.email}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <h3 className="text-slate-500 text-sm">
                  Role
                </h3>

                <p className="font-semibold">
                  {profile.role}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}