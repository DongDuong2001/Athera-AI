"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-32 relative text-center px-6">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5"></div>
       <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-8"
          >
            Begin Your Transformation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12"
          >
            Join a community committed to mental clarity and emotional resilience.
            Completely free for everyone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform bg-foreground text-background hover:bg-white/90">
                Join Athera AI Now
              </Button>
            </Link>
          </motion.div>
       </div>
    </section>
  );
}
