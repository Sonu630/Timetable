import React, {
  useEffect,
  useState,
} from "react";

import {
  getPolls,
  votePoll,
  getPollResults,
} from "../api/pollApi";

import socket from "../socket";

export default function Polls() {
  const [polls, setPolls] =
    useState([]);

  const [results, setResults] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPolls();

    socket.on(
      "pollUpdated",
      () => {
        fetchPolls();
      }
    );

    return () => {
      socket.off(
        "pollUpdated"
      );
    };

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
      } finally {
        setLoading(false);
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

  const handleVote = async (
    poll_id,
    selected_option
  ) => {
    try {
      await votePoll({
        poll_id,
        selected_option,
      });

      alert(
        "Vote Submitted Successfully"
      );

      fetchResults(poll_id);

      socket.emit(
        "pollUpdated"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.error ||
          "Vote Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Polls
        </h1>

        <div className="bg-cyan-500 text-white px-5 py-2 rounded-2xl font-semibold shadow-lg">
          {polls.length} Active
          Polls
        </div>
      </div>

      {polls.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-slate-500">
          No Polls Available
        </div>
      ) : (
        polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
          >
            {/* HEADER */}

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 sm:p-6 text-white">
              <h2 className="text-lg sm:text-2xl font-bold">
                {poll.question}
              </h2>
            </div>

            {/* OPTIONS */}

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  poll.option_one,
                  poll.option_two,
                  poll.option_three,
                ].map(
                  (
                    option,
                    index
                  ) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleVote(
                          poll.id,
                          option
                        )
                      }
                      className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-5 py-4 rounded-2xl font-semibold shadow-md"
                    >
                      {option}
                    </button>
                  )
                )}
              </div>

              {/* RESULTS */}

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-700 mb-4">
                  Poll Results
                </h3>

                <div className="space-y-4">
                  {results[
                    poll.id
                  ]?.length > 0 ? (
                    results[
                      poll.id
                    ].map(
                      (
                        result,
                        idx
                      ) => (
                        <div
                          key={idx}
                          className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between"
                        >
                          <span className="font-semibold text-slate-700">
                            {
                              result.selected_option
                            }
                          </span>

                          <span className="bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold">
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
            </div>
          </div>
        ))
      )}
    </div>
  );
}