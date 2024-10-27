"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Binary, LogIn, LogOut, Palette, User } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.1] dark:border-white/[0.1] bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <MaxWidthWrapper>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <Binary className="h-8 w-8" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <ThemeToggle />
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl="/dashboard"
                  signUpFallbackRedirectUrl="/dashboard"
                >
                  <Button variant="outline">
                    <LogIn /> Login
                  </Button>
                </SignInButton>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-[0.33rem] w-56 rounded-md bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50"
                >
                  <Link className="block" href="/profile">
                    <DropdownMenuItem className="focus:bg-accent rounded-md cursor-pointer p-2 duration-300 focus:outline-none hover:text-foreground text-foreground/80 transition-colors">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <div className="flex items-center justify-between rounded-lg px-2 py-1 text-sm ">
                    <div className="flex items-center">
                      <Palette className="mr-2 h-4 w-4" />
                      <span>Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>
                  <DropdownMenuSeparator />
                  <SignOutButton>
                    <DropdownMenuItem className="focus:bg-accent rounded-md p-2 cursor-pointer duration-300 focus:outline-none hover:text-foreground text-foreground/80 transition-colors">
                      <LogOut className="mr-2 h-4 w-4" color="red" />
                      <span className="text-red-600">Logout</span>
                    </DropdownMenuItem>
                  </SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
