"use client";

import { useState } from "react";
import { MessageSquare, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface GeminiDiscussProps {
  title: string;
  content: string;
}

export function GeminiDiscuss({ title, content }: GeminiDiscussProps) {
  const [copied, setCopied] = useState(false);

  const handleDiscuss = async () => {
    const prompt = `I am reading "${title}". Content: ${content}. Explain this to me in simple terms and provide key insights.`;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast.success("Prompt copied to clipboard! Opening Gemini...");
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);

      // Open Gemini in a new tab
      window.open("https://gemini.google.com/app", "_blank");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleDiscuss}
        variant="outline"
        size="sm"
        className="group relative overflow-hidden border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <MessageSquare className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">
            Discuss with Gemini
          </span>
          <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </span>
        
        {/* Subtle background shine effect */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000" />
      </Button>
    </div>
  );
}
