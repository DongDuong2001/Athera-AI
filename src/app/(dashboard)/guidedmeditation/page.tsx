import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, Timer, Music, Headphones, Upload, Trash2, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface Meditation {
  id: string;
  title: string;
  duration: string;
  audio: string;
  category?: string;
  isCustom?: boolean;
}

const sampleMeditations: Meditation[] = [
  {
    id: "m1",
    title: "Meditation Relax",
    duration: "10 min",
    audio: "/music/MeditationRelax.mp3",
    category: "Relax"
  },
  {
    id: "m2",
    title: "Deep Meditation",
    duration: "15 min",
    audio: "/music/DeepMeditation.mp3",
    category: "Deep"
  }
];

export default function GuidedMeditation() {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [customTracks, setCustomTracks] = useState<Meditation[]>([]);
  const [volume, setVolume] = useState([100]); // Slider uses array, 0-100
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const customTracksRef = useRef(customTracks);
  customTracksRef.current = customTracks;

  useEffect(() => {
    // Cleanup object URLs on unmount to avoid memory leaks
    return () => {
        customTracksRef.current.forEach(track => {
            if (track.isCustom) {
                URL.revokeObjectURL(track.audio);
            }
        });
    };
  }, []);

  // Update volume when state changes
  useEffect(() => {
     if (audioRef.current) {
         audioRef.current.volume = volume[0] / 100;
     }
  }, [volume]);

  const handlePlay = (track: Meditation) => {
    if (!audioRef.current) {
        audioRef.current = new Audio(track.audio);
        audioRef.current.volume = volume[0] / 100;
        audioRef.current.onended = () => setCurrentTrackId(null);
        audioRef.current.onerror = () => {
             toast.error("Error playing audio. The URL might be broken or protected.");
             setCurrentTrackId(null);
        };
    }

    if (currentTrackId === track.id) {
        // Toggle Pause
        if (audioRef.current.paused) {
            audioRef.current.play().catch(() => toast.error("Playback failed"));
        } else {
            audioRef.current.pause();
            setCurrentTrackId(null); 
            return; 
        }
    } else {
        // Play New Track
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = track.audio;
            audioRef.current.load();
        }
        audioRef.current.play().catch(e => {
            toast.error("Could not play audio. File might be missing or blocked.");
            console.error(e);
        });
    }
    setCurrentTrackId(track.id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
        toast.error("Please upload an audio file.");
        return;
    }

    const newTrack: Meditation = {
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        duration: "Custom",
        audio: URL.createObjectURL(file), // Create blob URL
        category: "My Upload",
        isCustom: true
    };

    setCustomTracks(prev => [...prev, newTrack]);
    toast.success("Track added to your library!");
  };

  const removeCustomTrack = (id: string) => {
    setCustomTracks(tracks => {
        const trackToRemove = tracks.find(t => t.id === id);
        if (trackToRemove && trackToRemove.isCustom) URL.revokeObjectURL(trackToRemove.audio);
        return tracks.filter(t => t.id !== id);
    });
    if (currentTrackId === id) {
        audioRef.current?.pause();
        setCurrentTrackId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-card p-8 md:p-12 text-center border-2 border-border shadow-brutal-lg">
        <Headphones className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Guided <span className="text-primary">Meditation</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Find your center with our curated sessions or upload your own soothing tracks.
        </p>

        <div className="flex flex-col items-center justify-center gap-6">
            {/* Upload Button */}
            <div className="relative">
                <Input 
                    type="file" 
                    accept="audio/*" 
                    className="hidden" 
                    id="audio-upload"
                    onChange={handleFileUpload}
                />
                <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                    <label htmlFor="audio-upload" className="cursor-pointer">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Custom Music
                    </label>
                </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 w-full max-w-xs bg-secondary/10 p-4 rounded-xl border-2 border-border shadow-brutal">
                 <Volume2 className="text-muted-foreground" size={20} />
                 <Slider 
                    value={volume} 
                    onValueChange={setVolume} 
                    max={100} 
                    step={1} 
                    className="w-full"
                 />
                 <span className="text-xs font-bold w-8 text-right">{volume}%</span>
            </div>
        </div>
      </section>

      {/* Custom Uploads */}
      {customTracks.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Upload className="text-secondary" size={20} /> My Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customTracks.map((track) => (
                    <MeditationCard 
                        key={track.id} 
                        item={track} 
                        isPlaying={currentTrackId === track.id} 
                        onPlay={() => handlePlay(track)} 
                        onDelete={() => removeCustomTrack(track.id)}
                    />
                ))}
            </div>
          </section>
      )}

      {/* Library */}
      <section>
         <h2 className="text-xl font-bold text-foreground mb-6">Curated Library</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMeditations.map((meditation) => (
                <MeditationCard 
                    key={meditation.id} 
                    item={meditation} 
                    isPlaying={currentTrackId === meditation.id} 
                    onPlay={() => handlePlay(meditation)} 
                />
            ))}
         </div>
      </section>
    </div>
  );
}

function MeditationCard({ item, isPlaying, onPlay, onDelete, featured }: { item: Meditation, isPlaying: boolean, onPlay: () => void, onDelete?: () => void, featured?: boolean }) {
    return (
        <Card className={`overflow-hidden border-2 border-border bg-card hover:border-primary/50 transition-all group shadow-brutal hover:shadow-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${featured ? 'border-primary bg-primary/5' : ''}`}>
            <CardContent className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`h-12 w-12 shrink-0 rounded-full flex items-center justify-center border-2 border-border transition-colors ${isPlaying ? 'bg-primary text-primary-foreground' : 'bg-secondary/20 text-secondary group-hover:bg-primary/20 group-hover:text-primary'}`}>
                        {isPlaying ? <Music size={20} className="animate-pulse" /> : <Headphones size={20} />}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Timer size={12} /> {item.duration}</span>
                            {item.category && <span className="bg-secondary/20 px-2 py-0.5 rounded-full text-secondary border border-secondary/20">{item.category}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {onDelete && (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8"
                        >
                            <Trash2 size={16} />
                        </Button>
                    )}
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className={`rounded-full h-10 w-10 border-2 border-transparent hover:border-primary/20 ${isPlaying ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                        onClick={onPlay}
                    >
                        {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
