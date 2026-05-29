import React, {
  useEffect,
  useState,
} from "react";

import {
  getPolls,
  getPollResults,
} from "../api/pollApi";

export default function Professorpolls() {
  const [polls, setPolls] =
    useState([]);

  const [results, setResults] =
    useState({});

  useEffect(() => {
    fetchPolls();

    // eslint-disable-next-line
  }, []);

  const fetchPolls =
    async () => {
      try {
        const response =
          await getPolls();

        setPolls(response.data);

        response.data.forEach(
          (poll) => {
            fetchResults(poll.id);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchResults =
    async (pollId) => {
      try {
        const response =
          await getPollResults(
            pollId
          );

        setResults((prev) => ({
          ...prev,

          [pollId]:
            response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Poll Analytics
      </h1>

      {polls.map((poll) => (
        <div
          key={poll.id}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 text-white">
            <h2 className="text-2xl font-bold">
              {poll.question}
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {results[poll.id]
              ?.length > 0 ? (
              results[
                poll.id
              ].map(
                (
                  result,
                  idx
                ) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-100 p-4 rounded-2xl"
                  >
                    <span className="font-semibold">
                      {
                        result.selected_option
                      }
                    </span>

                    <span className="bg-cyan-500 text-white px-4 py-2 rounded-xl">
                      {
                        result.total_votes
                      }{" "}
                      Votes
                    </span>
                  </div>
                )
              )
            ) : (
              <div className="text-slate-500">
                No Votes Yet
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}