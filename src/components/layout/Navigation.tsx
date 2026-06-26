"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { LogOut, User } from "lucide-react";

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

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
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">{user.name}</span>
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="p-3 border-b border-charcoal-700">
                        <p className="text-sm text-white font-medium">{user.name}</p>
                        <p className="text-xs text-charcoal-400">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-violet-600/20 text-violet-400 rounded">
                          {user.role === "superadmin" ? "Quản trị viên" : user.role === "admin" ? "Admin" : "Sinh viên"}
                        </span>
                      </div>
                      <div className="p-2">
                        {user.role === "admin" || user.role === "superadmin" ? (
                          <Link
                            href="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal-300 hover:text-white hover:bg-charcoal-700 rounded-lg transition-all"
                          >
                            Bảng điều khiển
                          </Link>
                        ) : null}
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                            router.push("/");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-charcoal-700 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              authLinks.map((link) => (
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
              ))
            )}
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
                {isAuthenticated && user ? (
                  <>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-violet-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-sm text-charcoal-400">{user.email}</p>
                    </div>
                    {user.role === "admin" || user.role === "superadmin" ? (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl hover:from-violet-500 hover:to-pink-500 transition-all text-center"
                      >
                        Bảng điều khiển
                      </Link>
                    ) : null}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                        router.push("/");
                      }}
                      className="px-8 py-3 text-lg font-semibold text-red-400 hover:text-red-300 transition-colors text-center"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}