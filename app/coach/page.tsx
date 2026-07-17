
"use client";

import { useState } from "react";

export default function CoachPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeEnglish = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const result = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await result.json();

      setResponse(
        data.response || data.error
      );
    } catch (error) {
      console.error(error);

      setResponse(
        "Error connecting to AI Coach."
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          AI Coach
        </h1>

        <p className="text-gray-600 mb-8">
          FluencyGo AI
        </p>

        <div className="bg-white p-8 rounded-xl shadow">

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Write something in English..."
            className="w-full h-40 border rounded-lg p-4 mb-4"
          />

          <button
            onClick={analyzeEnglish}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            {loading
              ? "Analyzing..."
              : "Analyze"}
          </button>

        </div>

        {response && (
          <div className="bg-white p-8 rounded-xl shadow mt-6">

            <h2 className="font-bold mb-4">
              AI Feedback
            </h2>

            <div className="whitespace-pre-wrap">
              {response}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

