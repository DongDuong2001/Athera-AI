import Link from "next/link";
import Image from "next/image";
import NavbarActions from "./navbar-actions";


export default async function Navbar() {
  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-background/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg transition-all duration-300 supports-[backdrop-filter]:bg-background/40">
        <div className="px-6 h-16 flex items-center justify-between">
          
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide"
            >
              Dashboard
            </Link>
            <Link
              href="/meditation"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide"
            >
              Meditation
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-500 border border-primary/20 bg-background">
                  <Image
                    src="/logo/logo-new.png" 
                    alt="Athera AI"
                    fill
                    className="object-cover p-0.5"
                  />
                </div>
                <span className="font-bold text-lg tracking-tight hidden md:block text-foreground group-hover:text-primary transition-colors">Athera</span>
              </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-6">
             <Link
              href="/mood-diary"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide"
            >
              Diary
            </Link>
             <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm tracking-wide"
            >
              About
            </Link>
            <div className="pl-4 border-l border-border/50">
                <NavbarActions />
            </div>
          </div>

          {/* Mobile Menu Button (Simple Placeholder for now) */}
          <div className="md:hidden flex items-center gap-4">
               <NavbarActions />
          </div>
        </div>
      </nav>
    </div>
  );
}
