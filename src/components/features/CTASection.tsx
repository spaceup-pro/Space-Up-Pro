"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-900/40 via-charcoal-900/80 to-pink-900/40 border border-violet-500/30 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Decor elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-[60px]" />

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className="relative z-10"
        >
          {/* Big animated rocket */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-600/30">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            {/* Flame */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent rounded-full blur-md"
            />
          </motion.div>

          {/* Short headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Sẵn Sàng 🚀
          </h2>
          <p className="text-lg text-charcoal-300 mb-8 max-w-xl mx-auto">
            Tham gia ngay để nhận thông tin tuyển sinh & cơ hội học tập tại các trường top đầu!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl overflow-hidden shadow-lg shadow-violet-600/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Đăng Ký Ngay</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('program-finder')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-lg font-semibold text-white bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Tìm Ngành Học
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}