"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Line } from "react-chartjs-2";
import { format, subDays } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Meh, Frown, Zap, BookOpen } from "lucide-react";
import { toast } from "sonner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodEntry {
  date: string;
  mood: string;
  note?: string;
}

const moodOptions = [
  {
    name: "Happy",
    icon: <Smile size={32} />,
    color: "bg-emerald-500/10 border-emerald-500 text-emerald-500 hover:bg-emerald-500/20",
    activeColor: "ring-emerald-500 bg-emerald-500/20"
  },
  {
    name: "Energetic",
    icon: <Zap size={32} />,
    color: "bg-amber-500/10 border-amber-500 text-amber-500 hover:bg-amber-500/20",
    activeColor: "ring-amber-500 bg-amber-500/20"
  },
  {
    name: "Neutral",
    icon: <Meh size={32} />,
    color: "bg-blue-500/10 border-blue-500 text-blue-500 hover:bg-blue-500/20",
    activeColor: "ring-blue-500 bg-blue-500/20"
  },
  {
    name: "Sad",
    icon: <Frown size={32} />,
    color: "bg-rose-500/10 border-rose-500 text-rose-500 hover:bg-rose-500/20",
    activeColor: "ring-rose-500 bg-rose-500/20"
  },
];

export default function MoodDiary() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState<string>("");
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const savedMoods = localStorage.getItem("mood-diary");
    if (savedMoods) {
      setMoodData(JSON.parse(savedMoods));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mood-diary", JSON.stringify(moodData));
  }, [moodData]);

  const logMood = (moodName: string | null) => {
    const moodToLog = moodName || selectedMood || "Neutral";
    if (!selectedMood && !moodName) setSelectedMood("Neutral");
    
    const newEntry = { date: today, mood: moodToLog, note };
    const updatedData = moodData.filter((entry) => entry.date !== today);
    setMoodData([...updatedData, newEntry]);
    toast.success("Mood logged successfully!");
  };

  const getMoodForDate = (date: string) => {
    const entry = moodData.find((entry) => entry.date === date);
    return entry ? entry.mood : null;
  };

  const getMoodIndex = (mood: string | null) => {
    if (mood === "Happy") return 4;
    if (mood === "Energetic") return 3;
    if (mood === "Neutral") return 2;
    if (mood === "Sad") return 1;
    return 0; // No data
  };

  const weeklyData = Array.from({ length: 7 })
    .map((_, i) => {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd");
      return { date, mood: getMoodForDate(date) };
    })
    .reverse();

 // Chart Colors matching Slate & Sky Theme
  const chartColors = {
      primary: "#38bdf8", // Sky Blue
      text: "#94a3b8", // Slate 400
      grid: "#1e293b", // Slate 800
  };

  const moodChartData = {
    labels: weeklyData.map((entry) => format(new Date(entry.date), "EEE")),
    datasets: [
      {
        label: "Mood Level",
        data: weeklyData.map((entry) => getMoodIndex(entry.mood)),
        borderColor: chartColors.primary,
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.primary,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 5,
            ticks: {
                 callback: function(value: string | number) {
                    if(value === 1) return 'Sad';
                    if(value === 2) return 'Neutral';
                    if(value === 3) return 'Energetic';
                    if(value === 4) return 'Happy';
                    return '';
                 },
                 color: chartColors.text
            },
            grid: { color: chartColors.grid }
        },
        x: {
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text }
        }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="text-primary"/> Mood Diary
            </h1>
            <p className="text-muted-foreground">Track your emotional well-being over time.</p>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-card border-border">
              <CardHeader>
                  <CardTitle>How are you feeling?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {moodOptions.map((mood) => (
                    <button
                        key={mood.name}
                        onClick={() => setSelectedMood(mood.name)}
                        className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-200 ${
                        mood.color
                        } ${selectedMood === mood.name ? `ring-2 ${mood.activeColor} scale-105` : "border-transparent bg-secondary/5 text-muted-foreground grayscale hover:grayscale-0"}`}
                    >
                        <div className="mb-2">{mood.icon}</div>
                        <span className="text-sm font-medium">{mood.name}</span>
                    </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Today&apos;s Reflection</label>
                    <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What's on your mind?..."
                        className="bg-background border-input min-h-[100px]"
                    />
                </div>

                <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => logMood(null)}
                >
                    Save Entry
                </Button>
              </CardContent>
          </Card>

          {/* Chart Section */}
          <Card className="bg-card border-border">
              <CardHeader>
                  <CardTitle>Mood Trend (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                   <Line data={moodChartData} options={chartOptions} />
              </CardContent>
          </Card>
      </div>

       {/* Weekly Grid (Visual) */}
       <Card className="bg-card border-border">
           <CardContent className="p-6">
               <h3 className="text-sm font-medium text-muted-foreground mb-4">Weekly Overview</h3>
               <div className="grid grid-cols-7 gap-2">
                    {weeklyData.map((entry, i) => {
                        const moodOption = moodOptions.find((m) => m.name === entry.mood);
                        return (
                            <div key={i} className="text-center space-y-2">
                                <div className="text-xs text-muted-foreground">{format(new Date(entry.date), "EEE")}</div>
                                <div className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${moodOption ? moodOption.color.replace('hover:bg-', '') + ' bg-opacity-20 border' : 'bg-secondary/10 text-muted-foreground'}`}>
                                    {moodOption?.icon || "-"}
                                </div>
                            </div>
                        )
                    })}
               </div>
           </CardContent>
       </Card>
    </div>
  );
}
