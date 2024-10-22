"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Mountain, Palette, User } from "lucide-react";
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
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Navbar({ user }: { user: boolean | null }) {
  const pathname = usePathname();
  const href = "asdf";
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <MaxWidthWrapper>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <Mountain className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <ThemeToggle />
                <Button variant="outline">
                  <LogIn /> Login
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="mt-[0.33rem] w-56 rounded-md bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50"
                >
                  <Link className="block" href="/profile">
                    <DropdownMenuItem
                      className={clsx(
                        "focus:bg-accent rounded-md cursor-pointer p-2 duration-300 focus:outline-none hover:text-foreground text-foreground/80 transition-colors",
                        {
                          "!text-foreground": pathname === href,
                        }
                      )}
                    >
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
                  <Link className="block" href="/logout">
                    <DropdownMenuItem
                      className={clsx(
                        "focus:bg-accent rounded-md p-2 cursor-pointer duration-300 focus:outline-none hover:text-foreground text-foreground/80 transition-colors",
                        {
                          "!text-foreground": pathname === href,
                        }
                      )}
                    >
                      <LogOut className="mr-2 h-4 w-4" color="red" />
                      <span className="text-red-600">Logout</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
