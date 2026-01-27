"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Camera, Lock, Trash2, Save, Moon, Shield, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [avatar, setAvatar] = useState("/default-avatar.png");

  const handleSave = () => {
      toast.success("Settings saved successfully!");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <div className="text-center md:text-left">
         <h1 className="text-3xl font-bold text-foreground">User Settings</h1>
         <p className="text-muted-foreground mt-2">Manage your account preferences and security.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="text-primary"/> Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                            <Image 
                                src={avatar} 
                                alt="Avatar" 
                                width={96} 
                                height={96} 
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                            <Camera size={16} />
                            <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if(file) setAvatar(URL.createObjectURL(file));
                                }}
                            />
                        </label>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-foreground">Full Name</label>
                            <Input placeholder="Enter your name" className="bg-background border-input" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <Input type="email" placeholder="Enter your email" className="bg-background border-input" />
                        </div>
                    </div>
                 </div>
            </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="text-secondary"/> Security</CardTitle>
                <CardDescription>Protect your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-foreground">Change Password</h3>
                        <p className="text-sm text-muted-foreground">Update your password regularly.</p>
                    </div>
                    <Button variant="outline" className="border-border hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50">
                        <Lock size={16} className="mr-2" /> Change
                    </Button>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security.</p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-card border-border">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Moon className="text-accent"/> Preferences</CardTitle>
                <CardDescription>Customize your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-foreground">Dark Mode</h3>
                        <p className="text-sm text-muted-foreground">Toggle application theme preference.</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-foreground">Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive updates and alerts.</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
            </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-destructive/10 border-destructive/20">
             <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2"><Trash2 size={20}/> Danger Zone</CardTitle>
                <CardDescription className="text-destructive/80">Irreversible actions.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-destructive">Delete Account</h3>
                        <p className="text-sm text-destructive/70">Permanently remove your account and data.</p>
                    </div>
                    <Button variant="destructive">
                        Delete
                    </Button>
                 </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button size="lg" onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save size={16} className="mr-2" /> Save Changes
            </Button>
        </div>

      </div>
    </div>
  );
}
