"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/admissions", label: "Tuyển sinh" },
  { href: "/majors", label: "Ngành học" },
  { href: "/contact", label: "Liên hệ" },
];

const authLinks = [
  { href: "/auth/login", label: "Đăng nhập" },
  { href: "/auth/register", label: "Đăng ký" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-charcoal-950/80 backdrop-blur-md border-b border-charcoal-800"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Space<span className="gradient-text">Up</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === link.href
                    ? "text-white"
                    : "text-charcoal-400 hover:text-charcoal-200"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-lg transition-all",
                  link.label === "Đăng nhập"
                    ? "text-charcoal-300 hover:text-white"
                    : "bg-violet-600 hover:bg-violet-500 text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                }}
                className="w-full h-0.5 bg-white origin-left"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-full h-0.5 bg-white"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0,
                }}
                className="w-full h-0.5 bg-white origin-left"
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen Overlay Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
              {/* Logo in Menu */}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 mb-8"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Space<span className="gradient-text">Up</span>
                </span>
              </Link>

              {/* Navigation Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-6"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-2xl font-semibold transition-colors hover:text-violet-400",
                        pathname === link.href
                          ? "text-violet-400"
                          : "text-charcoal-300"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 mt-8"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 text-lg font-semibold text-charcoal-300 hover:text-white transition-colors text-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl hover:from-violet-500 hover:to-pink-500 transition-all text-center"
                >
                  Đăng ký ngay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}