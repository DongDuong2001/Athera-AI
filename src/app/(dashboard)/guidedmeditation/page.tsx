"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, PauseCircle, Sparkles, Timer, Music, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Meditation {
  title: string;
  duration: string;
  audio: string;
  category?: string;
}

const sampleMeditations = [
  {
    title: "Morning Calm",
    duration: "10 min",
    audio: "/audios/morning-calm.mp3",
    category: "Focus"
  },
  {
    title: "Deep Relaxation",
    duration: "15 min",
    audio: "/audios/deep-relaxation.mp3",
    category: "Relax"
  },
  {
    title: "Sleep Serenity",
    duration: "20 min",
    audio: "/audios/sleep-meditation.mp3",
    category: "Sleep"
  },
];

export default function GuidedMeditation() {
  const [aiMeditation, setAiMeditation] = useState<Meditation | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // Store ID/Title of playing track

  const fetchAiMeditation = async () => {
    setLoading(true);
    // Mock API call for demo (replace with real one if needed, or keep existing logic)
    setTimeout(() => {
        setAiMeditation({
            title: "AI Personalized Flow",
            duration: "12 min",
            audio: "/audios/deep-relaxation.mp3"
        });
        setLoading(false);
    }, 1500)
  };

  const handlePlay = (title: string) => {
    if (isPlaying === title) {
        setIsPlaying(null); // Pause
    } else {
        setIsPlaying(title); // Play
    }
    // Actual audio logic would go here
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 md:p-12 text-center border border-primary/10">
        <Headphones className="w-16 h-16 mx-auto text-primary mb-6 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Guided <span className="text-primary">Meditation</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Find your center with our curated sessions. Let AI guide you to the perfect state of mind.
        </p>

        <Button
          onClick={fetchAiMeditation}
          disabled={loading}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg shadow-primary/20"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {loading ? "Generatng Session..." : "Get AI Recommendation"}
        </Button>
      </section>

      {/* AI Recommendation */}
      {(loading || aiMeditation) && (
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="text-primary" size={20} /> Recommended for You
          </h2>
          {loading ? (
             <div className="grid gap-4">
                 <Skeleton className="h-24 w-full rounded-xl" />
             </div>
          ) : (
             <MeditationCard 
                item={aiMeditation!} 
                isPlaying={isPlaying === aiMeditation!.title} 
                onPlay={() => handlePlay(aiMeditation!.title)} 
                featured
             />
          )}
        </section>
      )}

      {/* Library */}
      <section>
         <h2 className="text-xl font-bold text-foreground mb-6">Explore Library</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMeditations.map((meditation, index) => (
                <MeditationCard 
                    key={index} 
                    item={meditation} 
                    isPlaying={isPlaying === meditation.title} 
                    onPlay={() => handlePlay(meditation.title)} 
                />
            ))}
         </div>
      </section>
    </div>
  );
}

function MeditationCard({ item, isPlaying, onPlay, featured }: { item: Meditation, isPlaying: boolean, onPlay: () => void, featured?: boolean }) {
    return (
        <Card className={`overflow-hidden border-border bg-card hover:border-primary/50 transition-all group ${featured ? 'border-primary/30 bg-primary/5' : ''}`}>
            <CardContent className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-primary text-primary-foreground' : 'bg-secondary/10 text-secondary group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        <Music size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Timer size={12} /> {item.duration}</span>
                            {item.category && <span className="bg-secondary/10 px-2 py-0.5 rounded-full text-secondary">{item.category}</span>}
                        </div>
                    </div>
                </div>
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className={`rounded-full h-10 w-10 ${isPlaying ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                    onClick={onPlay}
                >
                    {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                </Button>
            </CardContent>
        </Card>
    )
}
