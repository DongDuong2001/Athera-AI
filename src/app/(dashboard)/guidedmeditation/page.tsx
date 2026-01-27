"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, PauseCircle, Sparkles, Timer, Music } from "lucide-react";
import { toast } from "sonner";

interface Meditation {
  title: string;
  duration: string;
  audio: string;
}

const sampleMeditations = [
  {
    title: "Morning Calm",
    duration: "10 min",
    audio: "/audios/morning-calm.mp3",
  },
  {
    title: "Deep Relaxation",
    duration: "15 min",
    audio: "/audios/deep-relaxation.mp3",
  },
  {
    title: "Sleep Meditation",
    duration: "20 min",
    audio: "/audios/sleep-meditation.mp3",
  },
];

export default function GuidedMeditation() {
  const [aiMeditation, setAiMeditation] = useState<Meditation | null>(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchAiMeditation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message:
            "Suggest a guided meditation for relaxation. Respond ONLY with valid JSON in this exact format: {\"title\": \"Meditation Name\", \"duration\": \"X min\", \"audio\": \"/audios/custom.mp3\"}",
        }),
      });

      const data = await response.json();

      if (data.reply) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = data.reply.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const meditationData = JSON.parse(jsonMatch[0]);
            setAiMeditation(meditationData);
          } else {
            // If no valid JSON, create a default meditation based on the response
            setAiMeditation({
              title: "AI Guided Meditation",
              duration: "10 min",
              audio: "/audios/morning-calm.mp3",
            });
          }
        } catch {
          setAiMeditation({
            title: "Relaxation Meditation",
            duration: "10 min",
            audio: "/audios/deep-relaxation.mp3",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching AI meditation:", error);
      toast.error("Failed to get AI recommendation");
      setAiMeditation(null);
    }
    setLoading(false);
  };

  const handleAudioPlay = (audioFile: string) => {
    if (audio && isPlaying) {
      audio.pause();
    }
    const newAudio = new Audio(audioFile);
    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(true);
    newAudio.onended = () => setIsPlaying(false);
  };

  return (
    <>
      {/* ✅ Hero Section */}
      <section className="flex flex-col items-center text-center pt-28 pb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">
          Your <span className="text-[#34C0FC]">Guided Meditation</span> Journey
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Find peace and mindfulness with guided meditation. Let AI help you
          choose the best session.
        </p>

        {/* ✅ AI Meditation Button */}
        <Button
          onClick={fetchAiMeditation}
          disabled={loading}
          className="mt-4 bg-[#34C0FC] text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-[#07304A] transition"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? "Getting AI Meditation..." : "Get AI Meditation"}
        </Button>
      </section>

      {/* ✅ AI Suggested Meditation */}
      {loading ? (
        <section className="container mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            💡 AI Recommended Meditation
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 mt-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </section>
      ) : aiMeditation ? (
        <section className="container mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            💡 AI Recommended Meditation
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 transition transform hover:scale-105 mt-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Music className="text-[#34C0FC]" /> {aiMeditation.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <Timer className="text-[#34C0FC]" /> {aiMeditation.duration}
            </p>
            <Button
              onClick={() => handleAudioPlay(aiMeditation.audio)}
              className="mt-4 bg-[#34C0FC] text-white w-full rounded-lg shadow-lg hover:scale-105 transition-all"
            >
              Start AI Meditation
            </Button>
          </div>
        </section>
      ) : null}

      {/* ✅ Predefined Guided Meditation List */}
      <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleMeditations.map((meditation, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-white/40 transition transform hover:scale-105"
          >
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Music className="text-[#34C0FC]" /> {meditation.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <Timer className="text-[#34C0FC]" /> {meditation.duration}
            </p>
            <Button
              onClick={() => handleAudioPlay(meditation.audio)}
              className="mt-4 bg-[#34C0FC] text-white w-full rounded-lg shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              {isPlaying ? (
                <PauseCircle className="w-5 h-5" />
              ) : (
                <PlayCircle className="w-5 h-5" />
              )}{" "}
              Play Meditation
            </Button>
          </div>
        ))}
      </section>
    </>
  );
}
