"use client";

import {
  BarChart2,
  BotMessageSquareIcon,
  Flame,
  Settings,
  Headphones,
  Home,
  Menu,
  Notebook,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/guidedmeditation", label: "Meditation", icon: Headphones },
    { href: "/mood-diary", label: "Diary", icon: Notebook },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/workout", label: "Workout Plan", icon: Flame },
    { href: "/chatbot", label: "AI Companion", icon: BotMessageSquareIcon },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
            "fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-sidebar border-r border-sidebar-border shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-sidebar-border flex items-center gap-3 bg-sidebar">
             <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/20 shadow-inner">
                <Image src="/logo/logo-new.png" alt="Logo" fill className="object-cover" />
             </div>
             <h2 className="text-xl font-bold tracking-tight text-foreground">
                Athera AI
             </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto bg-sidebar">
            {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-transparent",
                            isActive 
                                ? "bg-sidebar-accent text-primary border-sidebar-border font-medium shadow-sm" 
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                    >
                        <item.icon size={20} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className={cn("transition-colors", isActive ? "text-primary" : "")}>{item.label}</span>
                    </Link>
                )
            })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-sidebar-border bg-sidebar">
             <div className="bg-sidebar-accent/50 rounded-xl p-4 mb-2 border border-sidebar-border/50">
                 <p className="text-xs text-muted-foreground mb-2 flex justify-between">
                    <span>Weekly Goal</span>
                    <span className="text-primary">70%</span>
                 </p>
                 <div className="h-1.5 w-full bg-sidebar-border rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[70%]"></div>
                 </div>
             </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-background">
        {/* Top Header (Mobile Toggle) */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-30">
             <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                 <Menu className="h-6 w-6 text-foreground" />
             </Button>
             <span className="font-bold text-lg text-foreground">Dashboard</span>
             <div className="w-10"></div> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
               {children}
            </div>
        </div>
      </main>
    </div>
  );
}
