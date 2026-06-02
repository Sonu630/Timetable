import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

export default function Request() {
  const [requests, setRequests] =
    useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests =
    async () => {
      try {
        const response =
          await API.get(
            "/requests"
          );

        setRequests(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const updateStatus =
    async (
      id,
      status
    ) => {
      try {
        await API.put(
          `/requests/${id}`,
          { status }
        );

        fetchRequests();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-8 border border-slate-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Requests
      </h1>

      <div className="space-y-4">

        {requests.map(
          (req) => (
            <div
              key={req.id}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-100 rounded-2xl p-5"
            >
              <div>
                <h2 className="font-semibold text-slate-800">
                  Course ID :
                  {
                    req.course_id
                  }
                </h2>

                <p className="text-slate-500">
                  {
                    req.reason
                  }
                </p>

                <p className="text-slate-500">
                  Status :
                  {req.status}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  onClick={() =>
                    updateStatus(
                      req.id,
                      "approved"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      req.id,
                      "rejected"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-3 rounded-xl"
                >
                  Reject
                </button>

              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}