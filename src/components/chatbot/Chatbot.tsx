"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      const audio = new Audio("/sound/notification.mp3");
      audio.play().catch(e => console.log("Audio play failed", e)); 

      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [...prev, { role: "bot", content: "Something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 flex flex-col bg-card border-border shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot size={18} className="text-primary" />
                  </div>
                  <div>
                      <h2 className="font-bold text-foreground">Athera Assistant</h2>
                      <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
              </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                    <Bot size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Ask me anything about wellness, workouts, or meditation.</p>
                </div>
            )}
            
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-3 max-w-[90%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                  <div className={cn(
                      "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center",
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                      {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm overflow-hidden",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted text-foreground rounded-tl-sm"
                  )}>
                    {msg.role === "user" ? (
                        msg.content
                    ) : (
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                strong: ({...props}) => <strong className="font-bold text-primary" {...props} />,
                                ul: ({...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                table: ({...props}) => <div className="overflow-x-auto my-2 rounded-lg border border-border"><table className="w-full text-xs text-left" {...props} /></div>,
                                th: ({...props}) => <th className="bg-background/50 p-2 border-b border-border font-semibold" {...props} />,
                                td: ({...props}) => <td className="p-2 border-b border-border/50" {...props} />,
                                a: ({...props}) => <a className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />
                            }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    )}
                  </div>
              </motion.div>
            ))}
            {loading && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                     <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                         <Bot size={14} />
                     </div>
                     <div className="bg-muted p-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                         <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                         <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                     </div>
                </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions & Input */}
          <div className="p-4 bg-card border-t border-border">
             {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {predefinedPrompts.map((prompt, index) => (
                    <button
                        key={index}
                        className="text-xs bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-full hover:bg-secondary/20 transition-colors"
                        onClick={() => sendMessage(prompt)}
                    >
                        <Sparkles className="inline-block mr-1" size={12} />
                        {prompt}
                    </button>
                    ))}
                </div>
             )}

            <div className="flex items-center gap-2">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 bg-background border-input focus-visible:ring-primary"
                />
                <Button onClick={() => sendMessage(input)} disabled={loading} size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send size={18} />
                </Button>
            </div>
          </div>
      </Card>
    </div>
  );
}
