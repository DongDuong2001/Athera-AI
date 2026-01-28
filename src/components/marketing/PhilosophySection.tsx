"use client";

import { Check, Wind } from "lucide-react";
import { motion } from "framer-motion";

export function PhilosophySection() {
  return (
    <section className="py-24 bg-card/30 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/5 skew-y-3 transform origin-bottom-left"></div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="md:w-1/2"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Wellness meets <span className="text-secondary">Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe that mental health support should be accessible, personalized, and deeply scientifically grounded. 
              Athera AI combines the latest in cognitive behavioral science with state-of-the-art AI to provide a safe space for growth.
            </p>
            <ul className="space-y-4">
              {["Private & Secure", "24/7 Availability", "Science-backed Techniques"].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-foreground font-medium"
                >
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check size={14} />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
         </motion.div>
         {/* Visual Element */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="md:w-1/2 flex justify-center"
         >
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute p-8 bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-w-sm rotate-3"
            >
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
            </motion.div>
         </motion.div>
      </div>
    </section>
  );
}
