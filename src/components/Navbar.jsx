"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Lightbulb,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    { name: "Add Idea", path: "/add-idea" },
    { name: "My Ideas", path: "/my-ideas" },
    { name: "My Interactions", path: "/my-interactions" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md border-b border-yellow-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          
          <Link href="/" className="flex items-center gap-2">
            <Lightbulb className="text-yellow-600" size={28} />
            <span className="text-2xl font-bold bg-linear-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              IdeaVault
            </span>
          </Link>

          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-gray-700 dark:text-gray-200 hover:text-yellow-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          
          <div className="flex items-center gap-3">
           
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-yellow-100 dark:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700" size={20} />
              )}
            </button>

           
            {!isPending && !user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">Login</Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              !isPending &&
              user && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={user.image || "https://i.pravatar.cc/100"}
                      alt="profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <span>{user?.name?.split(" ")[0]}</span>
                    <ChevronDown size={18} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-50"
                      >
                        <User size={16} />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

           
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link href="/login">Login</Link>
                <Link href="/sign-up">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href="/profile">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}