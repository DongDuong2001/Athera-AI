"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dumbbell, CheckCircle, Flame, Timer, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Workout {
  title: string;
  level: string;
  duration: string;
  calories: string;
}

const workouts: Workout[] = [
  {
    title: "Full Body Strength",
    level: "Beginner",
    duration: "30 min",
    calories: "250 kcal",
  },
  {
    title: "HIIT Fat Burner",
    level: "Intermediate",
    duration: "20 min",
    calories: "300 kcal",
  },
  {
    title: "Upper Body Strength",
    level: "Advanced",
    duration: "45 min",
    calories: "400 kcal",
  },
  {
    title: "Core & Abs Shred",
    level: "Intermediate",
    duration: "25 min",
    calories: "280 kcal",
  },
  {
    title: "Legs & Glutes",
    level: "Beginner",
    duration: "35 min",
    calories: "350 kcal",
  },
];

export default function WorkoutPlan() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [aiWorkout, setAiWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAiWorkout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Suggest a ${selectedLevel.toLowerCase()} level workout plan. Respond ONLY with valid JSON in this exact format: {"title": "Workout Name", "level": "${selectedLevel === "All" ? "Intermediate" : selectedLevel}", "duration": "X min", "calories": "Y kcal"}`,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = data.reply.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const workoutData = JSON.parse(jsonMatch[0]);
            setAiWorkout(workoutData);
          } else {
            // If no valid JSON, create a default workout based on the response
            setAiWorkout({
              title: "AI Custom Workout",
              level: selectedLevel === "All" ? "Intermediate" : selectedLevel,
              duration: "30 min",
              calories: "300 kcal",
            });
          }
        } catch {
          setAiWorkout({
            title: "Full Body Burn",
            level: selectedLevel === "All" ? "Intermediate" : selectedLevel,
            duration: "30 min",
            calories: "350 kcal",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching AI workout:", error);
      toast.error("Failed to get AI recommendation");
      setAiWorkout(null);
    }
    setLoading(false);
  };

  const filteredWorkouts =
    selectedLevel === "All"
      ? workouts
      : workouts.filter((w) => w.level === selectedLevel);

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-28 pb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">
          Your <span className="text-[#34C0FC]">AI-Powered</span> Workout Plan
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Get personalized workouts based on your fitness level and train
          smarter with AI recommendations.
        </p>

        {/* Fitness Level Selector */}
        <div className="mt-6">
          <label className="text-lg font-semibold text-gray-800">
            Select Your Fitness Level:
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="block mt-2 bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-300 shadow-md focus:ring-2 focus:ring-[#34C0FC] transition"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* AI Workout Button */}
        <Button
          onClick={fetchAiWorkout}
          disabled={loading}
          className="mt-4 bg-[#34C0FC] text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-[#07304A] transition"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? "Getting AI Workout..." : "Get AI Workout Plan"}
        </Button>
      </section>

      {/* AI Recommended Workout */}
      {loading ? (
        <section className="container mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            💡 AI Recommended Workout
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 mt-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </section>
      ) : aiWorkout ? (
        <section className="container mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            💡 AI Recommended Workout
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 transition transform hover:scale-105 mt-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Dumbbell className="text-[#34C0FC]" /> {aiWorkout.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> {aiWorkout.level}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Timer className="text-[#34C0FC]" /> {aiWorkout.duration}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Flame className="text-red-500" /> {aiWorkout.calories}
            </p>
            <Button className="mt-4 bg-[#34C0FC] text-white w-full rounded-lg shadow-lg hover:scale-105 transition-all">
              Start AI Workout
            </Button>
          </div>
        </section>
      ) : null}

      {/* Workout Plans */}
      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkouts.map((workout, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 transition transform hover:scale-105"
          >
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Dumbbell className="text-[#34C0FC]" /> {workout.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <CheckCircle className="text-green-500" /> {workout.level}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Timer className="text-[#34C0FC]" /> {workout.duration}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Flame className="text-red-500" /> {workout.calories}
            </p>
            <Button className="mt-4 bg-[#34C0FC] text-white w-full rounded-lg shadow-lg hover:scale-105 transition-all">
              Start Workout
            </Button>
          </div>
        ))}
      </section>
    </>
  );
}
