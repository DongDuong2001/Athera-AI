"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Activity,
  HeartPulse,
  Timer,
  BrainCircuit,
  Sparkles,
  Zap,
  PlusCircle,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "sonner";

// Register Chart.js Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  // State for Chart Data
  const [meditationData, setMeditationData] = useState([20, 30, 45, 50, 65, 75, 90]);
  const [workoutData, setWorkoutData] = useState([10, 15, 20, 30, 35, 40, 50]);
  
  // State for Dialog Inputs
  const [meditationInput, setMeditationInput] = useState("");
  const [workoutInput, setWorkoutInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle Data Submission
  const handleLogData = () => {
    if (!meditationInput && !workoutInput) {
      toast.error("Please enter at least one value.");
      return;
    }

    // Update charts (Replacing "Sunday" / last day for demo purposes, or appending if we had real dates)
    // Here we'll just update the last index to simulate "logging for today"
    const newMeditation = [...meditationData];
    const newWorkout = [...workoutData];

    if (meditationInput) newMeditation[6] = parseInt(meditationInput);
    if (workoutInput) newWorkout[6] = parseInt(workoutInput);

    setMeditationData(newMeditation);
    setWorkoutData(newWorkout);
    
    setIsDialogOpen(false);
    setMeditationInput("");
    setWorkoutInput("");
    toast.success("Wellness data updated successfully!");
  };

  // Chart Colors matching Slate & Sky Theme
  const chartColors = {
      primary: "#38bdf8", // Sky Blue
      secondary: "#818cf8", // Indigo
      text: "#94a3b8", // Slate 400
      grid: "#1e293b", // Slate 800
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: chartColors.text } },
    },
    scales: {
        x: { 
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text }
        },
        y: { 
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text }
        }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="pt-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Personal Analytics</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl">
            Track your wellness journey with real-time insights.
          </p>
        </div>

        {/* Log Data Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
              <PlusCircle className="mr-2 h-4 w-4" /> Log Today&apos;s Data
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Daily Wellness</DialogTitle>
              <DialogDescription>
                Update your stats for today. Empty fields will be ignored.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meditation" className="text-right">
                  Meditation
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="meditation"
                    type="number"
                    placeholder="Minutes"
                    value={meditationInput}
                    onChange={(e) => setMeditationInput(e.target.value)}
                  />
                  <span className="text-xs text-muted-foreground">min</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout" className="text-right">
                  Workout
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="workout"
                    type="number"
                    placeholder="Minutes"
                    value={workoutInput}
                    onChange={(e) => setWorkoutInput(e.target.value)}
                  />
                  <span className="text-xs text-muted-foreground">min</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleLogData}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      {/* AI Insights Section */}
      <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-xl flex items-start gap-4 shadow-sm">
        <Sparkles className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
        <div>
            <h3 className="font-semibold text-foreground">AI Insight</h3>
            <p className="text-muted-foreground mt-1">
                You are on track! Consistent meditation has improved your focus score by <span className="text-primary font-bold">15%</span> this week. Try adding a 5-minute HIIT session to boost your energy levels.
            </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
            icon={<HeartPulse className="text-rose-500" />}
            title="Heart Rate"
            value="72 bpm"
            desc="Resting rate is optimal."
            trend="Stable"
            trendColor="text-emerald-500"
        />
        <StatsCard 
            icon={<BrainCircuit className="text-primary" />}
            title="Focus Score"
            value="8.5/10"
            desc="Peak mental clarity detected."
            trend="+12%"
            trendColor="text-primary"
        />
        <StatsCard 
            icon={<Zap className="text-amber-500" />}
            title="Energy Level"
            value="High"
            desc="Ready for intense activity."
            trend="Peak"
            trendColor="text-amber-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meditation Trend */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Timer className="text-primary" size={20} /> Weekly Meditation
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <Line
              options={chartOptions}
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Minutes",
                    data: meditationData,
                    borderColor: chartColors.primary,
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: chartColors.primary,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Workout Progress */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="text-emerald-500" size={20} /> Workout Intensity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <Bar
               options={chartOptions}
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Calories Burned",
                    data: workoutData.map(min => min * 8), // Mock calc
                    backgroundColor: "rgba(16, 185, 129, 0.6)", // Emerald
                    borderColor: "#10b981",
                    borderWidth: 1,
                    borderRadius: 4,
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    desc: string;
    trend?: string;
    trendColor?: string;
}

function StatsCard({ icon, title, value, desc, trend, trendColor }: StatsCardProps) {
    return (
        <Card className="bg-card border-border shadow-sm hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
               {icon} {title}
            </CardTitle>
            {trend && <span className={`text-xs font-bold ${trendColor}`}>{trend}</span>}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </CardContent>
        </Card>
    )
}
