
"use client";

import { useState } from "react";

export default function CoachPage() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState("");

  const analyzeEnglish = () => {
    if (!input.trim()) return;

    setAnalysis(`
IMPROVED VERSION

${input}

VOCABULARY

• Professional communication
• Workplace English
• Business vocabulary

ASSESSMENT

Level: B1

FEEDBACK

Your sentence is understandable.
AI integration will soon provide grammar corrections,
fluency suggestions and pronunciation coaching.
    `);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          AI Coach
        </h1>

        <p className="text-gray-600 mb-8">
          FluencyGo v0.11
        </p>

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Improve My English
          </h2>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write something in English..."
            className="w-full h-40 border rounded-lg p-4 mb-4"
          />

          <button
            onClick={analyzeEnglish}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Analyze
          </button>

        </div>

        {analysis && (
          <div className="bg-white p-8 rounded-xl shadow mt-6">
            <pre className="whitespace-pre-wrap">
              {analysis}
            </pre>
          </div>
        )}

      </div>
    </main>
  );
}

