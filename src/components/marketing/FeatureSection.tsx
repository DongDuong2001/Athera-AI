"use client";

import { useRef, useState } from "react";
import { Bot, BrainCircuit, Notebook } from "lucide-react";
import { motion } from "framer-motion";

export function FeatureSection() {
  return (
    <section className="py-32 bg-background relative z-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Intelligent Tools for <span className="text-primary">Mental Clarity</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Our core features are designed to work together, creating a seamless ecosystem for your mental well-being.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
             icon={<Bot className="text-primary" size={32} />}
             title="Empathetic AI Companion"
             desc="Chat securely with an AI trained to listen, support, and guide you through difficult emotions."
             delay={0}
          />
          <FeatureCard 
             icon={<BrainCircuit className="text-secondary" size={32} />}
             title="Mindfulness & Meditation"
             desc="Access curated meditation sessions tailored to your current mood and stress levels."
             delay={0.2}
          />
          <FeatureCard 
             icon={<Notebook className="text-accent" size={32} />}
             title="Reflective Journaling"
             desc="Track your emotional journey with smart insights that help you understand your patterns."
             delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="relative group rounded-3xl"
    >
      {/* Spotlight Card Container */}
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-colors hover:border-primary/50"
      >
        {/* Spotlight Gradient */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary), 0.15), transparent 40%)`,
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-6 h-14 w-14 rounded-2xl bg-background/80 border border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md group-hover:border-primary/30">
            {icon}
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{title}</h3>
          
          <p className="text-muted-foreground leading-relaxed flex-grow">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
