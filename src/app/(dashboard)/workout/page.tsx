"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Timer, Sparkles, Import } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Workout {
  title: string;
  level: string;
  duration: string;
  calories: string;
  type?: string;
}

const initialWorkouts: Workout[] = [
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
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

  const handleGenerateClick = () => {
    // 1. Copy Prompt to Clipboard
    const prompt = `Generate 5 unique workout plans in strict JSON format (Array of objects) with fields: "title" (string), "level" (Beginner/Intermediate/Advanced), "duration" (e.g., "30 min"), "calories" (e.g., "300 kcal"), and "type" (Strength/Cardio/Yoga/Core). Do not include markdown formatting or backticks, just the raw JSON array.`;
    
    navigator.clipboard.writeText(prompt).then(() => {
        toast.info("Prompt copied! Ask Gemini to generate the plan, then paste the JSON here.");
        // 2. Open Dialog
        setIsDialogOpen(true);
        // 3. Open Gemini (Optional, user preference handled in other component, but helpful here too)
        window.open("https://gemini.google.com/app", "_blank");
    }).catch(() => {
        toast.error("Failed to copy prompt.");
    });
  };

  const handleImportJson = () => {
      try {
          // clean input in case user pastes code blocks
          const cleanJson = jsonInput.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanJson);
          
          if (!Array.isArray(parsed)) throw new Error("Format must be an array");
          
          // Basic validation of first item
          if (!parsed[0].title || !parsed[0].duration) throw new Error("Invalid workout format");

          setWorkouts(parsed);
          setIsDialogOpen(false);
          setJsonInput("");
          toast.success("Workout plan updated with AI insights!");
      } catch (e) {
          console.error(e);
          toast.error("Invalid JSON. Please ensure you paste the raw JSON array.");
      }
  };

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
        <Button onClick={handleGenerateClick} className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all">
            <Sparkles className="mr-2 h-4 w-4" /> 
            AI Personal Trainer
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

      {/* Import Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Import AI Workout Plan</DialogTitle>
                  <DialogDescription>
                      Paste the JSON generated by Gemini below to update your schedule.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <Textarea 
                    placeholder='[ { "title": "Morning Yoga", ... } ]' 
                    className="h-48 font-mono text-xs"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleImportJson}>
                      <Import className="mr-2 h-4 w-4" /> Import Plan
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredWorkouts.length > 0 ? filteredWorkouts.map((workout, idx) => (
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
         )) : (
             <div className="col-span-full py-12 text-center text-muted-foreground">
                 No workouts found for this level. Try generating a new plan!
             </div>
         )}
      </div>
    </div>
  );
}
