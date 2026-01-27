import { Button } from "@/components/ui/button";
import {
  Notebook,
  BrainCircuit,
  Bot,
  ArrowRight,
  Check,
  Leaf,
  Wind
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-background px-6 pt-32">
        {/* Soft Organic Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
        </div>

        <div className="container relative z-10 mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-sm">
            <Leaf size={14} className="mr-2" />
            Holistic Mental Wellness
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-12 mb-6 drop-shadow-sm">
            Restore Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-200 to-secondary animate-gradient-text">
              Inner Balance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            A sanctuary for your mind. Powered by empathetic AI to help you reflect, meditate, and thrive in a chaotic world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all hover:scale-105 font-medium">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-primary/30 text-primary hover:bg-primary/10 transition-all font-medium">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Showcase (Floating Cards) */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
               icon={<Bot className="text-primary" size={32} />}
               title="Empathetic AI Companion"
               desc="Chat securely with an AI trained to listen, support, and guide you through difficult emotions."
            />
            <FeatureCard 
               icon={<BrainCircuit className="text-secondary" size={32} />}
               title="Mindfulness &amp; Meditation"
               desc="Access curated meditation sessions tailored to your current mood and stress levels."
            />
            <FeatureCard 
               icon={<Notebook className="text-accent" size={32} />}
               title="Reflective Journaling"
               desc="Track your emotional journey with smart insights that help you understand your patterns."
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-card/30 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/5 skew-y-3 transform origin-bottom-left"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
           <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Wellness meets <span className="text-secondary">Innovation</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that mental health support should be accessible, personalized, and deeply scientifically grounded. 
                Athera AI combines the latest in cognitive behavioral science with state-of-the-art AI to provide a safe space for growth.
              </p>
              <ul className="space-y-4">
                {["Private & Secure", "24/7 Availability", "Science-backed Techniques"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Check size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
           </div>
           {/* Visual Element */}
           <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute p-8 bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-4 border-b border-border/50 pb-4">
                     <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Wind size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-foreground">Daily Calm</h4>
                        <p className="text-xs text-muted-foreground">Today&apos;s Focus</p>
                     </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;Peace comes from within. Do not seek it without.&quot;</p>
                  <div className="mt-4 flex gap-2">
                     <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Meditation</span>
                     <span className="text-xs bg-accent/10 text-accent-foreground px-2 py-1 rounded-full">5 min</span>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative text-center px-6">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
         <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Begin Your Transformation</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join a community committed to mental clarity and emotional resilience.
              Completely free for everyone.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform bg-foreground text-background hover:bg-white/90">
                Join Athera AI Now
              </Button>
            </Link>
         </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 group">
      <div className="mb-6 h-14 w-14 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
