"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Palette, User, Loader2 } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icons } from "./icons";
import { signOut, useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, update, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (error) {
      console.error("Sign in failed:", error);
      toast.error("Failed to sign in", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
      await update();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Failed to sign out", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.1] bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 dark:border-white/[0.1]">
      <MaxWidthWrapper>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Icons.logo className="h-8 w-8" />
            <span className="sr-only">LU-CP-Archive</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {status !== "loading" &&
              (!session?.user ? (
                <Button
                  variant="outline"
                  onClick={handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                      <AvatarImage src={session.user.image ?? undefined} />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="mt-[0.33rem] w-56 rounded-md bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50"
                  >
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-foreground/80 transition-colors duration-300 hover:text-foreground focus:bg-accent focus:outline-none">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <div className="flex items-center justify-between rounded-lg px-2 py-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Theme</span>
                      </div>
                      <ThemeToggle />
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer rounded-md p-2 text-foreground/80 transition-colors duration-300 hover:text-foreground focus:bg-accent focus:outline-none"
                      disabled={isLoading}
                      onClick={handleSignOut}
                    >
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin text-red-500" />
                        ) : (
                          <LogOut className="mr-2 h-4 w-4 text-red-500" />
                        )}
                        <span className="text-red-500">
                          {isLoading ? "Logging out..." : "Logout"}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
