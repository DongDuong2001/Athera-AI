"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Timer, Sparkles, Import, Dumbbell, ChevronRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface Exercise {
    name: string;
    sets: string;
    reps: string;
    notes?: string;
}

interface Workout {
  title: string;
  level: string;
  duration: string;
  calories: string;
  type?: string;
  exercises: Exercise[];
}

const initialWorkouts: Workout[] = [
  {
    title: "Full Body Strength",
    level: "Beginner",
    duration: "30 min",
    calories: "250 kcal",
    type: "Strength",
    exercises: [
        { name: "Bodyweight Squats", sets: "3", reps: "12", notes: "Keep back straight" },
        { name: "Push-ups", sets: "3", reps: "10", notes: "Knees if needed" },
        { name: "Lunges", sets: "3", reps: "10/leg", notes: "Controlled movement" },
        { name: "Plank", sets: "3", reps: "30s", notes: "Engage core" }
    ]
  },
  {
    title: "HIIT Fat Burner",
    level: "Intermediate",
    duration: "20 min",
    calories: "300 kcal",
    type: "Cardio",
    exercises: [
        { name: "Jumping Jacks", sets: "4", reps: "45s", notes: "Fast pace" },
        { name: "Mountain Climbers", sets: "4", reps: "45s", notes: "Keep hips low" },
        { name: "Burpees", sets: "4", reps: "10", notes: "Explosive jump" },
        { name: "High Knees", sets: "4", reps: "45s", notes: "Drive knees up" }
    ]
  },
  {
    title: "Upper Body Strength",
    level: "Advanced",
    duration: "45 min",
    calories: "400 kcal",
    type: "Strength",
    exercises: [
        { name: "Bench Press / Push-ups", sets: "4", reps: "8-10", notes: "Heavy weight or variations" },
        { name: "Pull-ups / Rows", sets: "4", reps: "8-10", notes: "Full range of motion" },
        { name: "Shoulder Press", sets: "3", reps: "12", notes: "Control the descent" },
        { name: "Dips", sets: "3", reps: "12-15", notes: "Focus on triceps" }
    ]
  },
  {
    title: "Core & Abs Shred",
    level: "Intermediate",
    duration: "25 min",
    calories: "280 kcal",
    type: "Core",
    exercises: [
        { name: "Crunches", sets: "3", reps: "20", notes: "Squeeze at top" },
        { name: "Leg Raises", sets: "3", reps: "15", notes: "Don't arch back" },
        { name: "Russian Twists", sets: "3", reps: "20/side", notes: "Feet off ground if possible" },
        { name: "Bicycle Crunches", sets: "3", reps: "20/side", notes: "Slow and controlled" }
    ]
  },
  {
    title: "Legs & Glutes",
    level: "Beginner",
    duration: "35 min",
    calories: "350 kcal",
    type: "Strength",
    exercises: [
        { name: "Goblet Squats", sets: "3", reps: "12", notes: "Deep squat" },
        { name: "Glute Bridges", sets: "3", reps: "15", notes: "Squeeze glutes at top" },
        { name: "Step-ups", sets: "3", reps: "10/leg", notes: "Use stable surface" },
        { name: "Calf Raises", sets: "3", reps: "20", notes: "Full extension" }
    ]
  },
];

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [selectedLevel, setSelectedLevel] = useState("All");
  
  // Dialog States
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  
  const [jsonInput, setJsonInput] = useState("");

  const handleGenerateClick = () => {
    // 1. Copy Prompt to Clipboard
    const prompt = `Generate 5 unique workout plans in strict JSON format (Array of objects) with fields: "title" (string), "level" (Beginner/Intermediate/Advanced), "duration" (e.g., "30 min"), "calories" (e.g., "300 kcal"), "type" (Strength/Cardio/Yoga/Core), and "exercises" (Array of objects with "name", "sets", "reps", "notes"). Do not include markdown formatting or backticks, just the raw JSON array.`;
    
    navigator.clipboard.writeText(prompt).then(() => {
        toast.info("Prompt copied! Ask Gemini to generate the plan, then paste the JSON here.");
        setIsImportOpen(true);
        window.open("https://gemini.google.com/app", "_blank");
    }).catch(() => {
        toast.error("Failed to copy prompt.");
    });
  };

  const handleImportJson = () => {
      try {
          const cleanJson = jsonInput.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanJson);
          
          if (!Array.isArray(parsed)) throw new Error("Format must be an array");
          if (!parsed[0].title || !parsed[0].duration) throw new Error("Invalid workout format");

          setWorkouts(parsed);
          setIsImportOpen(false);
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Workout Plan</h1>
            <p className="text-muted-foreground mt-2 text-lg">Curated routines to keep you moving.</p>
        </div>
        <Button onClick={handleGenerateClick} size="lg" className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all rounded-full px-8">
            <Sparkles className="mr-2 h-4 w-4" /> 
            AI Personal Trainer
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
         {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
             <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                    selectedLevel === level 
                    ? "bg-primary text-primary-foreground border-primary shadow-brutal" 
                    : "bg-card text-muted-foreground border-transparent hover:border-border hover:bg-secondary/10"
                }`}
             >
                 {level}
             </button>
         ))}
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredWorkouts.length > 0 ? filteredWorkouts.map((workout, idx) => (
             <Card 
                key={idx} 
                className="bg-card border-2 border-border hover:border-primary transition-all group overflow-hidden shadow-brutal hover:shadow-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer flex flex-col"
                onClick={() => setSelectedWorkout(workout)}
             >
                 <div className="h-3 w-full bg-gradient-to-r from-primary to-secondary/80" />
                 <CardHeader className="pb-2">
                     <div className="flex justify-between items-start mb-3">
                         <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary/30 font-bold">
                             {workout.level}
                         </Badge>
                         {workout.type && <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{workout.type}</span>}
                     </div>
                     <CardTitle className="text-2xl font-black text-foreground group-hover:text-primary transition-colors line-clamp-2">
                         {workout.title}
                     </CardTitle>
                 </CardHeader>
                 <CardContent className="flex-grow">
                     <div className="grid grid-cols-2 gap-4 text-sm font-medium text-muted-foreground mb-4">
                         <div className="flex items-center gap-2 bg-secondary/5 p-2 rounded-lg">
                             <Timer className="h-4 w-4 text-primary" />
                             {workout.duration}
                         </div>
                         <div className="flex items-center gap-2 bg-secondary/5 p-2 rounded-lg">
                             <Flame className="h-4 w-4 text-rose-500" />
                             {workout.calories}
                         </div>
                     </div>
                     <div className="text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                            <Dumbbell className="h-4 w-4" /> 
                            {workout.exercises?.length || 0} Exercises
                        </p>
                     </div>
                 </CardContent>
                 <CardFooter className="pt-0">
                     <Button className="w-full rounded-xl font-bold bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all group-hover:shadow-lg">
                         View Details <ChevronRight className="ml-2 h-4 w-4" />
                     </Button>
                 </CardFooter>
             </Card>
         )) : (
             <div className="col-span-full py-20 text-center text-muted-foreground bg-secondary/5 rounded-3xl border-2 border-dashed border-border">
                 <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                 <p className="text-xl font-medium">No workouts found for this level.</p>
                 <p className="text-sm mt-2 opacity-75">Try generating a new plan with AI!</p>
             </div>
         )}
      </div>

      {/* Workout Details Dialog */}
      <Dialog open={!!selectedWorkout} onOpenChange={(open) => !open && setSelectedWorkout(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-card border-2 border-border shadow-brutal-lg">
            {selectedWorkout && (
                <>
                    <div className="p-6 pb-4 border-b border-border bg-secondary/5">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary text-sm px-3 py-1">
                                {selectedWorkout.level}
                            </Badge>
                             <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
                                {selectedWorkout.type}
                            </Badge>
                        </div>
                        <DialogTitle className="text-3xl font-black text-foreground mb-2">
                            {selectedWorkout.title}
                        </DialogTitle>
                        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-2"><Timer className="w-4 h-4 text-primary"/> {selectedWorkout.duration}</span>
                            <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-rose-500"/> {selectedWorkout.calories}</span>
                        </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                                <Dumbbell className="w-5 h-5 text-secondary-foreground" /> 
                                Exercises
                            </h3>
                            <div className="grid gap-4">
                                {selectedWorkout.exercises?.map((exercise, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-background border-2 border-border/50 hover:border-primary/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center font-bold text-sm shrink-0 border border-secondary/30">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-foreground text-lg">{exercise.name}</h4>
                                            {exercise.notes && <p className="text-sm text-muted-foreground mt-1 italic">&quot;{exercise.notes}&quot;</p>}
                                            <div className="flex gap-4 mt-3">
                                                <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                                                    {exercise.sets} Sets
                                                </Badge>
                                                <Badge variant="outline" className="text-muted-foreground">
                                                    {exercise.reps} Reps
                                                </Badge>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-5 h-5 text-muted/20" />
                                    </div>
                                ))}
                                {(!selectedWorkout.exercises || selectedWorkout.exercises.length === 0) && (
                                    <div className="text-center py-8 text-muted-foreground italic">
                                        No specific exercises listed. 
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                    
                    <div className="p-6 border-t border-border bg-background">
                         <Button className="w-full text-lg font-bold h-12 shadow-brutal active:shadow-none translate-y-[-2px] active:translate-y-[0px] transition-all" onClick={() => setSelectedWorkout(null)}>
                            Close Plan
                        </Button>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <DialogContent className="sm:max-w-md bg-card border-2 border-border shadow-brutal">
              <DialogHeader>
                  <DialogTitle>Import AI Workout Plan</DialogTitle>
                  <DialogDescription>
                      Paste the JSON generated by Gemini below to update your schedule.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <Textarea 
                    placeholder='[ { "title": "Morning Yoga", "exercises": [...] } ]' 
                    className="h-48 font-mono text-xs bg-background border-2 border-border focus-visible:ring-primary"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImportOpen(false)} className="border-2 border-border font-bold">Cancel</Button>
                  <Button onClick={handleImportJson} className="font-bold shadow-brutal active:shadow-none hover:translate-y-[-1px]">
                      <Import className="mr-2 h-4 w-4" /> Import Plan
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
