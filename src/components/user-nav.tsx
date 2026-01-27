import {
  BarChart2,
  BotMessageSquareIcon,
  Flame,
  Settings,
  Headphones,
  Home,
  User,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutButton from "./sign-out-button";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface UserNavProps {
  user: UserData;
}

export default function UserNav({ user }: UserNavProps) {
  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/guidedmeditation",
      label: "Guided Meditations",
      icon: Headphones,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart2,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      href: "/chatbot",
      label: "AI Chatbot",
      icon: BotMessageSquareIcon,
    },
    {
      href: "/workout",
      label: "Workout Plan",
      icon: Flame,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="User avatar" />
            <AvatarFallback className="bg-[#07304A]">
              <User className="h-5 w-5 text-white" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="flex items-center gap-2 cursor-pointer"
              >
                <IconComponent size={16} />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User size={16} />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <SignOutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
