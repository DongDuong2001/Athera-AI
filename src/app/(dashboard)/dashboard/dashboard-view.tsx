"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bot, Calendar, ChevronRight, Moon, Sun, Quote } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardViewProps {
  user: { name: string | null; email: string } | null;
  stats: {
    moodCount: number;
  };
}

export default function DashboardView({ user, stats }: DashboardViewProps) {
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuote(data[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingQuote(false));
  }, []);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const userName = user?.name || "Traveler";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {greeting}, {userName}
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s your wellness overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground shadow-sm">
           <Calendar className="h-4 w-4 text-primary" />
           <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Quote of the Day (Real-time External Data) */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border border-primary/20">
          <Quote className="h-8 w-8 text-primary/40 absolute top-4 left-4" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
             {loadingQuote ? (
                 <div className="space-y-2">
                     <Skeleton className="h-4 w-3/4 mx-auto" />
                     <Skeleton className="h-4 w-1/2 mx-auto" />
                 </div>
             ) : (
                 <>
                    <p className="text-xl font-medium text-foreground italic mb-3">&quot;{quote?.q || "Peace comes from within."}&quot;</p>
                    <p className="text-sm text-muted-foreground">— {quote?.a || "Unknown"}</p>
                 </>
             )}
          </div>
      </div>

      {/* Quick Stats Grid (Real-time DB Data) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Entries</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moodCount}</div>
            <p className="text-xs text-muted-foreground">Total check-ins logged.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Mood</CardTitle>
            <Sun className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Pending</div>
            <p className="text-xs text-muted-foreground">How are you feeling right now?</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meditation</CardTitle>
            <Moon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15m Goal</div>
            <p className="text-xs text-muted-foreground">Try a focused session today.</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <ActionCard 
            title="Chat with Athera"
            desc="Need to vent or seek advice? Athera is here to listen."
            icon={<Bot className="h-6 w-6 text-primary-foreground" />}
            href="/chatbot"
            color="bg-primary"
         />
         <ActionCard 
            title="Log Your Mood"
            desc="Track emotional patterns to better understand yourself."
            icon={<Activity className="h-6 w-6 text-secondary-foreground" />}
            href="/mood-diary"
            color="bg-secondary"
         />
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, href, color }: { title: string, desc: string, icon: React.ReactNode, href: string, color: string }) {
    return (
        <Link href={href} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/30">
            <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${color} opacity-10 group-hover:opacity-20 transition-opacity`}>
                 {icon}
            </div>
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} shadow-sm group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                Start Now <ChevronRight className="ml-1 h-3 w-3" />
            </div>
        </Link>
    )
}
