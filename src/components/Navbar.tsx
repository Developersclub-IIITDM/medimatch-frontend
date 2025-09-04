"use client";

import Link from "next/link";
import { useTheme } from "next-themes"; // for light/dark mode
import {
  MenuIcon,
  SunIcon,
  MoonIcon,
  LogInIcon,
  LogOutIcon,
  HeartPulse,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import type { SessionValidationResult } from "@/lib/server/session";

interface NavbarProps {
  data: SessionValidationResult
}

export default function Navbar({ data }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="h-16 px-2 mx-auto flex max-w-7xl flex-row gap-4 items-center">
        <div>
          <Link className="flex flex-row items-center gap-2" href="/">
            <HeartPulse className="h-8 w-8 text-primary" />
            <h1 className="font-semibold">MediMatch</h1>
          </Link>
        </div>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {data?.user ? (
                <Avatar className="ml-auto cursor-pointer">
                  <AvatarImage
                    src={data.user.picture}
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {data.user.name[0]}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <MenuIcon className="ml-auto cursor-pointer" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {data?.user ? data.user.name : "Not signed in"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                >
                  {theme === "dark" ? (
                    <>
                      <SunIcon className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  {data?.user ? (
                    <Link href="/logout" className="flex items-center">
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </Link>
                  ) : (
                    <Link
                      href="/login/google"
                      className="flex items-center"
                    >
                      <LogInIcon className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
