import React, {
  useEffect,
  useState,
} from "react";

import {
  getPolls,
  getPollResults,
} from "../api/pollApi";

export default function Pollsresult() {
  const [polls, setPolls] =
    useState([]);

  const [results, setResults] =
    useState({});

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls =
    async () => {
      const pollsRes =
        await getPolls();

      setPolls(
        pollsRes.data
      );

      for (const poll of pollsRes.data) {
        const resultRes =
          await getPollResults(
            poll.id
          );

        setResults(
          (prev) => ({
            ...prev,
            [poll.id]:
              resultRes.data,
          })
        );
      }
    };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Poll Results
      </h1>

      <div className="space-y-6">

        {polls.map(
          (poll) => (
            <div
              key={poll.id}
              className="bg-slate-100 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold">
                {
                  poll.question
                }
              </h2>

              <div className="mt-4 space-y-3">

                {results[
                  poll.id
                ]?.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex justify-between"
                    >
                      <span>
                        {
                          item.selected_option
                        }
                      </span>

                      <span>
                        {
                          item.total_votes
                        }{" "}
                        votes
                      </span>
                    </div>
                  )
                )}

              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}