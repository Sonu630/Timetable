import React from "react";

export default function Pollsresult() {
  const results = [
    {
      poll: "Should we add dark mode?",
      yes: 85,
      no: 15,
    },

    {
      poll: "Do you like the new UI?",
      yes: 92,
      no: 8,
    },

    {
      poll: "Need more dashboard features?",
      yes: 78,
      no: 22,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
        Poll Results
      </h1>

      <div className="space-y-6">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-2xl p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5">
              {item.poll}
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Yes
                  </span>

                  <span className="font-semibold">
                    {item.yes}%
                  </span>
                </div>

                <div className="w-full bg-slate-300 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.yes}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    No
                  </span>

                  <span className="font-semibold">
                    {item.no}%
                  </span>
                </div>

                <div className="w-full bg-slate-300 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.no}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}