"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  // Validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError = touched && !emailValid ? "Email không hợp lệ" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    if (!emailValid) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    setIsLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setEmail("");
    setTouched(false);
  };

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
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-charcoal-900/60 backdrop-blur-2xl border border-charcoal-800/50 rounded-3xl p-8 shadow-2xl shadow-black/20">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center"
                  >
                    <span className="text-2xl">🔐</span>
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="text-white">Quên </span>
                    <span className="gradient-text">Mật Khẩu</span>
                  </h1>
                  <p className="text-charcoal-400">
                    Nhập email để khôi phục mật khẩu
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {error}
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
                        onBlur={() => setTouched(true)}
                        className={`w-full pl-11 pr-4 py-3 bg-charcoal-800/50 border rounded-xl text-white placeholder-charcoal-500 focus:outline-none transition-all ${
                          touched
                            ? emailValid
                              ? "border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                              : "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-charcoal-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        }`}
                        placeholder="nhap@email.com"
                      />
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
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi Link Khôi Phục</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Back to login */}
                <div className="mt-8 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-violet-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại đăng nhập
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  Kiểm tra email của bạn!
                </h2>

                <p className="text-charcoal-400 mb-6">
                  Chúng tôi đã gửi link khôi phục mật khẩu đến{" "}
                  <span className="text-violet-400 font-medium">{email}</span>
                </p>

                <div className="p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-sm text-charcoal-400 mb-6">
                  <p>📧 Kiểm tra hòm thư (bao gồm thư rác)</p>
                  <p className="mt-2">⏰ Link có hiệu lực trong 15 phút</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleResend}
                    className="w-full py-3 px-4 bg-charcoal-800/50 hover:bg-charcoal-800 border border-charcoal-700 rounded-xl text-charcoal-300 transition-all"
                  >
                    Gửi lại email
                  </button>

                  <Link
                    href="/auth/login"
                    className="block w-full py-3 px-4 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-xl text-violet-400 transition-all"
                  >
                    Đăng nhập với email khác
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to home */}
          <div className="mt-8 text-center">
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