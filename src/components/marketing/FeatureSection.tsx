"use client";

import { Bot, BrainCircuit, Notebook } from "lucide-react";
import { motion } from "framer-motion";

export function FeatureSection() {
  return (
    <section className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">
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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(45,212,191,0.2)" }}
      className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 group"
    >
      <div className="mb-6 h-14 w-14 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}
