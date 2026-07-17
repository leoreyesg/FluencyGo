
"use client";

import { useEffect, useState } from "react";
import { categories } from "../data/phrases";

type CategoryKey = keyof typeof categories;

export default function Home() {
  const [xp, setXp] = useState(0);
  const [index, setIndex] = useState(0);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedPhrases, setCompletedPhrases] =
    useState<string[]>([]);

  const [streak, setStreak] = useState(1);
  const [lastPracticeDate, setLastPracticeDate] =
    useState("");

  const [category, setCategory] =
    useState<CategoryKey>("Native English");

  useEffect(() => {
    const savedXp = localStorage.getItem("xp");
    const savedFavorites =
      localStorage.getItem("favorites");
    const savedCompleted =
      localStorage.getItem("completedPhrases");
    const savedStreak =
      localStorage.getItem("streak");
    const savedLastPracticeDate =
      localStorage.getItem("lastPracticeDate");

    if (savedXp) {
      setXp(Number(savedXp));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    if (savedCompleted) {
      setCompletedPhrases(
        JSON.parse(savedCompleted)
      );
    }

    if (savedStreak) {
      setStreak(Number(savedStreak));
    }

    if (savedLastPracticeDate) {
      setLastPracticeDate(
        savedLastPracticeDate
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("xp", xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "completedPhrases",
      JSON.stringify(completedPhrases)
    );
  }, [completedPhrases]);

  useEffect(() => {
    localStorage.setItem(
      "streak",
      streak.toString()
    );
  }, [streak]);

  useEffect(() => {
    localStorage.setItem(
      "lastPracticeDate",
      lastPracticeDate
    );
  }, [lastPracticeDate]);

  const currentPhrase =
    categories[category][index];

  const completePhrase = () => {
    if (
      completedPhrases.includes(
        currentPhrase
      )
    ) {
      return;
    }

    const today =
      new Date().toDateString();

    if (
      lastPracticeDate &&
      lastPracticeDate !== today
    ) {
      setStreak((prev) => prev + 1);
    }

    if (!lastPracticeDate) {
      setStreak(1);
    }

    setLastPracticeDate(today);

    setXp((prev) => prev + 10);

    setCompletedPhrases([
      ...completedPhrases,
      currentPhrase,
    ]);
  };

  const nextPhrase = () => {
    setIndex(
      (prev) =>
        (prev + 1) %
        categories[category].length
    );
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentPhrase)) {
      setFavorites(
        favorites.filter(
          (item) => item !== currentPhrase
        )
      );
    } else {
      setFavorites([
        ...favorites,
        currentPhrase,
      ]);
    }
  };

  const speakPhrase = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        currentPhrase
      );

    const voices = synth.getVoices();

    const englishVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("en")
    );

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    synth.speak(utterance);
  };

  const level =
    xp >= 1000
      ? "🏆 Native Challenger"
      : xp >= 700
      ? "🎯 Fluent"
      : xp >= 400
      ? "💼 Professional"
      : xp >= 200
      ? "🚀 Explorer"
      : "🌱 Beginner";

  const dailyGoal = 200;

  const progressPercentage = Math.min(
    (xp / dailyGoal) * 100,
    100
  );

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          FluencyGo
        </h1>

        <p className="text-gray-600">
          Personal AI English Coach
        </p>

        <p className="text-sm text-gray-400 mb-4">
          FluencyGo v0.10
        </p>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Goal</span>
            <span>
              {xp}/{dailyGoal} XP
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">XP</h2>
            <p>{xp}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">Level</h2>
            <p>{level}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">
              Completed
            </h2>
            <p>{completedPhrases.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">
              Favorites
            </h2>
            <p>{favorites.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">
              🔥 Streak
            </h2>
            <p>{streak} Days</p>
          </div>

        </div>

        <div className="bg-white p-8 rounded-xl shadow">

          <div className="mb-6">
            <label className="font-bold mr-3">
              Category:
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(
                  e.target.value as CategoryKey
                );
                setIndex(0);
              }}
              className="border p-2 rounded"
            >
              {Object.keys(categories).map(
                (cat) => (
                  <option key={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </div>

          <h2 className="text-lg font-bold mb-3">
            {category}
          </h2>

          <p className="text-4xl mb-4">
            {currentPhrase}
          </p>

          {completedPhrases.includes(
            currentPhrase
          ) && (
            <p className="text-green-600 font-bold mb-4">
              ✅ Completed
            </p>
          )}

          <div className="flex flex-wrap gap-3">

            <button
              onClick={speakPhrase}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              🔊 Listen
            </button>

            <button
              onClick={completePhrase}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              ✅ Complete +10 XP
            </button>

            <button
              onClick={nextPhrase}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              ➡️ Next
            </button>

            <button
              onClick={toggleFavorite}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              ⭐ Favorite
            </button>

          </div>

          <div className="mt-8">

            <h3 className="font-bold mb-2">
              Saved Favorites
            </h3>

            <ul className="list-disc pl-5">
              {favorites.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>

          </div>

        </div>

      </div>
    </main>
  );
}
