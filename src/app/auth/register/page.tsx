"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, Chrome, Facebook, ArrowRight, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validation rules
  const nameValid = formData.name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const passwordValid = formData.password.length >= 6;
  const confirmPasswordValid = formData.confirmPassword === formData.password && formData.confirmPassword.length > 0;
  const isFormValid = nameValid && emailValid && passwordValid && confirmPasswordValid && formData.agreeTerms;

  // Validation errors
  const nameError = touched.name && !nameValid ? "Tên phải có ít nhất 2 ký tự" : "";
  const emailError = touched.email && !emailValid ? "Email không hợp lệ" : "";
  const passwordError = touched.password && !passwordValid ? "Mật khẩu phải có ít nhất 6 ký tự" : "";
  const confirmPasswordError = touched.confirmPassword && !confirmPasswordValid ? "Mật khẩu xác nhận không khớp" : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setError("");

    if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
      setError("Vui lòng nhập đầy đủ thông tin hợp lệ");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Bạn cần đồng ý với điều khoản sử dụng");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/login?registered=true");
    }, 1200);
  };

  // Social login handlers (demo)
  const handleSocialLogin = useCallback((provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  }, [router]);

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
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-charcoal-900/60 backdrop-blur-2xl border border-charcoal-800/50 rounded-3xl p-8 shadow-2xl shadow-black/20 max-h-[90vh] overflow-y-auto">
          {/* Logo/Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center"
            >
              <span className="text-xl">🚀</span>
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-white">Đăng </span>
              <span className="gradient-text">Ký</span>
            </h1>
            <p className="text-charcoal-400">Tạo tài khoản Space Up mới</p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
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

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`w-full pl-11 pr-4 py-3 bg-charcoal-800/50 border rounded-xl text-white placeholder-charcoal-500 focus:outline-none transition-all ${
                    touched.name
                      ? nameValid
                        ? "border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-charcoal-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                  placeholder="Nguyen Van A"
                />
                {touched.name && nameValid && (
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
                {nameError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {nameError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    className="text-red-400 text-xs mt-1 ml-1"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          formData.password.length >= 6
                            ? level <= 1
                              ? "bg-red-500"
                              : level <= 2
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            : "bg-charcoal-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-500 mt-1">
                    {formData.password.length < 6
                      ? "Yếu - cần thêm ký tự"
                      : formData.password.length < 10
                        ? "Trung bình"
                        : "Mạnh"}
                  </p>
                </div>
              )}
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {passwordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  className={`w-full pl-11 pr-4 py-3 bg-charcoal-800/50 border rounded-xl text-white placeholder-charcoal-500 focus:outline-none transition-all ${
                    touched.confirmPassword
                      ? confirmPasswordValid
                        ? "border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        : "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-charcoal-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  }`}
                  placeholder="••••••••"
                />
                {touched.confirmPassword && confirmPasswordValid && (
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
                {confirmPasswordError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-xs mt-1 ml-1"
                  >
                    {confirmPasswordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-charcoal-700 bg-charcoal-800 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="ml-2 text-sm text-charcoal-400 cursor-pointer">
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-violet-400 hover:text-violet-300 hover:underline">
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-violet-400 hover:text-violet-300 hover:underline">
                  Chính sách
                </Link>
              </label>
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
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <>
                  <span>Đăng Ký</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-charcoal-400">
              Đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline"
              >
                Đăng nhập ngay
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