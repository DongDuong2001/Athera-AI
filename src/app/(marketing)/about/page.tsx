"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrainCircuit, Heart, Leaf, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-36 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
             Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Athera AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A fusion of cognitive science and artificial intelligence, designing a future where technology nurtures the human mind.
          </p>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Left: Image/Graphic */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative"
             >
                <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                    <div className="relative h-full w-full bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex items-center justify-center shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                         <Image
                          src="/logo/logo-new.png" 
                          alt="Athera AI Logo"
                          width={300}
                          height={300}
                          className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
             </motion.div>

             {/* Right: Content */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col justify-center space-y-8"
             >
                <div>
                   <h2 className="text-3xl font-bold mb-4">Redefining Digital Wellness</h2>
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     In a world demanding constant attention, Athera AI offers a pause. We are dedicated to redefining digital wellness by harnessing AI to help individuals build mindful, healthy relationships with themselves and technology.
                   </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 transition-colors">
                      <BrainCircuit className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Adaptive AI</h3>
                      <p className="text-sm text-muted-foreground">Personalized emotional support that evolves with your journey.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-secondary/20 transition-colors">
                      <Heart className="w-8 h-8 text-accent mb-4" />
                      <h3 className="font-semibold mb-2">Empathetic Design</h3>
                      <p className="text-sm text-muted-foreground">Built on principles of CBT and mindfulness for genuine care.</p>
                   </div>
                </div>

                <div className="pt-4">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Team / Mission Section */}
      <section className="py-24 bg-secondary/5 relative overflow-hidden">
         <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
               "To democratize access to mental wellness tools, making emotional intelligence and self-care accessible, engaging, and personalized for everyone, everywhere."
            </p>
            
            <div className="bg-background/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl max-w-2xl mx-auto">
               <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 mb-4 overflow-hidden relative">
                      {/* Placeholder for Founder Image if available, otherwise generic avatar */}
                      <div className="absolute inset-0 bg-primary/20" />
                  </div>
                  <h3 className="text-xl font-bold">Lab68Dev</h3>
                  <p className="text-sm text-primary font-medium mb-4">Founder & Lead Engineer</p>
                  <p className="text-muted-foreground text-sm mb-6">
                     Passionate about the intersection of mental health and technology. Building Athera AI to solve the loneliness epidemic in the digital age.
                  </p>
                  <div className="flex gap-4">
                     <Link href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary">
                        <Twitter size={18} />
                     </Link>
                     <Link href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary">
                        <Linkedin size={18} />
                     </Link>
                     <Link href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary">
                        <Mail size={18} />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-10">
            Join thousands of others who are finding clarity and balance with Athera AI.
            </p>
            <Link href="/sign-up">
              <Button className="h-12 px-8 text-lg rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0">
                Create Free Account
              </Button>
            </Link>
        </div>
      </section>
    </>
  );
}
