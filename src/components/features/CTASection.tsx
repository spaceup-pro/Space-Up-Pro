"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, ArrowRight, GraduationCap, Users, Calendar } from "lucide-react";

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
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-600/30">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn Sàng Cho <span className="gradient-text">Tương Lai?</span>
          </h2>
          <p className="text-lg text-charcoal-300 mb-8 max-w-xl mx-auto">
            Đăng ký ngay hôm nay để nhận thông tin tuyển sinh mới nhất, lịch học trực tiếp và cơ hội học tập tại các trường top đầu.
          </p>

          {/* Stats in CTA */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-charcoal-400">
              <GraduationCap className="w-5 h-5 text-violet-400" />
              <span className="text-sm">50+ Trường ĐH</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-400">
              <Users className="w-5 h-5 text-pink-400" />
              <span className="text-sm">10,000+ Sinh viên</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal-400">
              <Calendar className="w-5 h-5 text-cobalt-400" />
              <span className="text-sm">100+ Ngành học</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary group">
              <span>Đăng Ký Miễn Phí</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admissions" className="btn-secondary">
              Xem Tuyển Sinh
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}