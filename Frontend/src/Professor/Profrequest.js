import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import socket from "../socket";

export default function Profrequest() {
  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRequests();

    socket.on(
      "requestUpdated",
      () => {
        fetchRequests();
      }
    );

    return () => {
      socket.off(
        "requestUpdated"
      );
    };

    // eslint-disable-next-line
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
      } finally {
        setLoading(false);
      }
    };

  const handleUpdate =
    async (id, status) => {
      try {
        await API.put(
          `/requests/${id}`,
          { status }
        );

        fetchRequests();

        socket.emit(
          "requestUpdated"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Student Requests
      </h1>

      {requests.length ===
      0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-slate-500">
          No Requests Found
        </div>
      ) : (
        requests.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {
                  item.student_name
                }
              </h2>

              <p className="text-slate-500 mt-2">
                {
                  item.request_message
                }
              </p>

              <span className="inline-block mt-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm">
                {
                  item.status
                }
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleUpdate(
                    item.id,
                    "accepted"
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleUpdate(
                    item.id,
                    "rejected"
                  )
                }
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}