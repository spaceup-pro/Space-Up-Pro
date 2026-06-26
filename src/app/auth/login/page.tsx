"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Chrome, Facebook, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin" || user.role === "superadmin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, user, router]);

  // Check for registered param
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
    }
  }, [searchParams]);

  // Validation rules
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;

  // Validation errors (real-time)
  const emailError = touched.email && !emailValid ? "Email không hợp lệ" : "";
  const passwordError = touched.password && !passwordValid ? "Mật khẩu phải có ít nhất 6 ký tự" : "";

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError("");
    setIsLoading(true);

    const success = await login(email, password);

    setIsLoading(false);

    if (!success) {
      setError("Email hoặc mật khẩu không đúng");
      return;
    }

    // Redirect based on role
    if (email.toLowerCase().includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  // Social login handlers (demo)
  const handleSocialLogin = useCallback(async (provider: string) => {
    setIsLoading(true);
    // Simulate social login - use demo credentials
    const demoEmail = provider === "google" ? "user@example.com" : "user@example.com";
    await login(demoEmail, "password123");
    setIsLoading(false);
    router.push("/");
  }, [login, router]);

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt-500/10 rounded-full blur-[180px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-charcoal-900/60 backdrop-blur-2xl border border-charcoal-800/50 rounded-3xl p-8 shadow-2xl shadow-black/20">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center"
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-white">Đăng </span>
              <span className="gradient-text">Nhập</span>
            </h1>
            <p className="text-charcoal-400">Chào mừng trở lại với Space Up</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-charcoal-800/50 hover:bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-charcoal-300 transition-all disabled:opacity-50"
            >
              <Chrome className="w-4 h-4" />
              Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-charcoal-800/50 hover:bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-charcoal-300 transition-all disabled:opacity-50"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-charcoal-800" />
            <span className="text-xs text-charcoal-500 uppercase tracking-wider">hoặc</span>
            <div className="flex-1 h-px bg-charcoal-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> {success}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                >
                  <span>⚠️</span> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`w-full pl-11 pr-4 py-3 bg-charcoal-800/50 border rounded-xl text-white placeholder-charcoal-500 focus:outline-none transition-all ${
                    touched.email
                      ? emailValid
                        ? "border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-charcoal-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                  placeholder="nhap@email.com"
                />
                {touched.email && emailValid && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 ml-1"
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={`w-full pl-11 pr-12 py-3 bg-charcoal-800/50 border rounded-xl text-white placeholder-charcoal-500 focus:outline-none transition-all ${
                    touched.password
                      ? passwordValid
                        ? "border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-charcoal-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1.5 ml-1"
                  >
                    {passwordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-charcoal-700 bg-charcoal-800 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-2 text-sm text-charcoal-400">Ghi nhớ</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 via-violet-500 to-pink-600 hover:from-violet-500 hover:via-violet-400 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng Nhập</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-violet-900/20 to-pink-900/20 border border-violet-500/20 rounded-xl"
          >
            <p className="text-xs text-charcoal-400 mb-2 font-medium">🔑 Demo đăng nhập:</p>
            <div className="space-y-1 text-xs text-charcoal-500">
              <p>
                <span className="text-violet-400">Admin:</span> admin@spaceup.vn / admin123 → /admin
              </p>
              <p>
                <span className="text-charcoal-400">User:</span> user@example.com / password123 → /
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-charcoal-400">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-300 transition-colors"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}