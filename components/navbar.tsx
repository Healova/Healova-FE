"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo, useTransition } from "react";
import { User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/user-context";

export function Navbar() {
  const { currentUser } = useUser();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update isScrolled when changing pages
    if (!isHomePage) {
      setIsScrolled(true);
    } else if (isHomePage && mounted) {
      setIsScrolled(window.scrollY > 20);
    }
  }, [isHomePage, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const { signOut } = await import("@/lib/auth");
    await signOut();
    window.location.href = "/";
  };

  const handleConsultationClick = (e: React.MouseEvent, isMobile = false) => {
    if (!currentUser) {
      e.preventDefault();
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
      window.location.href = "/sign-in";
    } else {
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const isActive = useMemo(
    () => (href: string) => {
      if (!mounted) return false;
      return pathname === href;
    },
    [pathname, mounted]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      style={{
        contain: "layout",
        transition:
          "background-color 500ms ease-in-out, box-shadow 500ms ease-in-out",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span
                className={`text-2xl font-bold transition-colors duration-500 ${
                  isScrolled
                    ? "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                HEALOVA
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-300 relative group whitespace-nowrap ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Home
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  mounted && isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors duration-300 relative group whitespace-nowrap ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              About
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  mounted && isActive("/about")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Link
              href="/testimonials"
              className={`text-sm font-medium transition-colors duration-300 relative group whitespace-nowrap ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Testimonials
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  mounted && isActive("/testimonials")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            {/* <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors duration-300 relative group whitespace-nowrap ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Pricing
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  mounted && isActive("/pricing")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link> */}
            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors duration-300 relative group whitespace-nowrap ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              FAQ
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-pink-600 transition-all duration-300 ${
                  mounted && isActive("/faq")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              onClick={(e) => handleConsultationClick(e)}
            >
              <Link href="/consultation">Consultation</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Right: Auth buttons or User menu */}
            <div className="hidden md:flex items-center gap-3 w-32 justify-end">
              {currentUser ? (
                <div className="w-10 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      >
                        <User className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {currentUser.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={
                            currentUser.role === "doctor"
                              ? "/dashboard/doctor"
                              : "/dashboard/patient"
                          }
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className={
                      isScrolled
                        ? "text-gray-700 hover:text-pink-600"
                        : "text-white hover:text-pink-400"
                    }
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className={`rounded-full ${
                      isScrolled
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/40"
                    }`}
                  >
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/testimonials"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Button
                asChild
                size="sm"
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white mx-4 my-2"
                onClick={(e) => handleConsultationClick(e, true)}
              >
                <Link href="/consultation">Consultation</Link>
              </Button>

              <div className="pt-3 border-t border-gray-200">
                {currentUser ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href={
                        currentUser.role === "doctor"
                          ? "/dashboard/doctor"
                          : "/dashboard/patient"
                      }
                      className="block px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-pink-600 hover:bg-pink-50 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-4">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link
                        href="/sign-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      asChild
                    >
                      <Link
                        href="/sign-up"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
