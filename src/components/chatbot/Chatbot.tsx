"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

const predefinedPrompts = [
  "Recommend a 30-minute workout plan.",
  "Suggest a meditation session for relaxation.",
  "Give me a healthy nutrition plan for muscle recovery.",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Play notification sound when bot responds
      playBotReplySound();

      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [...prev, { role: "bot", content: "Something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const playBotReplySound = () => {
    const audio = new Audio("/sound/notification.mp3"); // Make sure to have this sound file in public/sounds/
    audio.play();
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-4">Athera AI Chatbot</h2>

      {/* Predefined Prompt Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="text-sm bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
            onClick={() => sendMessage(prompt)}
          >
            <Sparkles className="inline-block mr-1" size={14} />
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="h-72 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50 space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "p-3 rounded-lg w-fit max-w-xs break-words",
              msg.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"
            )}
          >
            {msg.content}
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={() => sendMessage(input)} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
