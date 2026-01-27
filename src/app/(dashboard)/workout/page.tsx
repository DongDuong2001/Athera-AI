"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Timer, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Workout {
  title: string;
  level: string;
  duration: string;
  calories: string;
  type?: string;
}

const workouts: Workout[] = [
  {
    title: "Full Body Strength",
    level: "Beginner",
    duration: "30 min",
    calories: "250 kcal",
    type: "Strength"
  },
  {
    title: "HIIT Fat Burner",
    level: "Intermediate",
    duration: "20 min",
    calories: "300 kcal",
    type: "Cardio"
  },
  {
    title: "Upper Body Strength",
    level: "Advanced",
    duration: "45 min",
    calories: "400 kcal",
    type: "Strength"
  },
  {
    title: "Core & Abs Shred",
    level: "Intermediate",
    duration: "25 min",
    calories: "280 kcal",
    type: "Core"
  },
  {
    title: "Legs & Glutes",
    level: "Beginner",
    duration: "35 min",
    calories: "350 kcal",
    type: "Strength"
  },
];

export default function WorkoutPage() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI generation
  const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
          setIsGenerating(false);
          toast.success("New plan generated!");
      }, 1500);
  }

  const filteredWorkouts = selectedLevel === "All" 
    ? workouts 
    : workouts.filter(w => w.level === selectedLevel);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl font-bold text-foreground">Workout Plan</h1>
            <p className="text-muted-foreground mt-2">Curated routines to keep you moving.</p>
        </div>
        <Button onClick={handleGenerate} disabled={isGenerating} className="bg-primary text-primary-foreground">
            <Sparkles className="mr-2 h-4 w-4" /> 
            {isGenerating ? "Designing..." : "AI Personal Trainer"}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
         {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
             <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                }`}
             >
                 {level}
             </button>
         ))}
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredWorkouts.map((workout, idx) => (
             <Card key={idx} className="bg-card border-border hover:border-primary/50 transition-all group overflow-hidden">
                 <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary opacity-75 group-hover:opacity-100 transition-opacity" />
                 <CardHeader>
                     <div className="flex justify-between items-start">
                         <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 mb-2">
                             {workout.level}
                         </Badge>
                         {workout.type && <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{workout.type}</span>}
                     </div>
                     <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                         {workout.title}
                     </CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                         <div className="flex items-center gap-2">
                             <Timer className="h-4 w-4 text-primary" />
                             {workout.duration}
                         </div>
                         <div className="flex items-center gap-2">
                             <Flame className="h-4 w-4 text-rose-500" />
                             {workout.calories}
                         </div>
                     </div>
                     <Button className="w-full bg-secondary/10 text-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                         Start Session
                     </Button>
                 </CardContent>
             </Card>
         ))}
      </div>
    </div>
  );
}
