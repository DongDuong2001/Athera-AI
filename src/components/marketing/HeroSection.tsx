"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GeminiDiscuss } from "@/components/GeminiDiscuss";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-background px-6 pt-32">
      {/* Enhanced Soft Organic Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -60, 0],
            y: [0, 80, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
           animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="container relative z-10 mx-auto text-center max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-md shadow-sm ring-1 ring-primary/10"
        >
          <Leaf size={14} className="mr-2" />
          Holistic Mental Wellness
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8 drop-shadow-sm text-balance"
        >
          Restore Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-text inline-block">
            Inner Balance
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed text-balance"
        >
          A sanctuary for your mind. Powered by empathetic AI to help you reflect, meditate, and thrive in a chaotic world.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="group relative h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105 font-medium overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shimmer Effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all font-medium backdrop-blur-sm bg-background/50">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-8 opacity-80 hover:opacity-100 transition-opacity">
            <GeminiDiscuss 
              title="Athera AI Mission" 
              content="Athera AI combines cognitive behavioral science with state-of-the-art AI to provide a safe space for growth, offering features like empathetic AI companions, mindfulness meditation, and reflective journaling." 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
