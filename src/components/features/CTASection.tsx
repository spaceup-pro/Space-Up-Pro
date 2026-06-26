"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-violet-900/30 to-pink-900/30 border border-violet-500/20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Sẵn Sàng Cho Tương Lai?
        </h2>
        <p className="text-lg text-charcoal-300 mb-8 max-w-xl mx-auto">
          Đăng ký ngay hôm nay để nhận thông tin tuyển sinh mới nhất và cập nhật lịch học trực tiếp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary">
            Đăng Ký Miễn Phí
          </Link>
          <Link href="/admissions" className="btn-secondary">
            Xem Tuyển Sinh
          </Link>
        </div>
      </motion.div>
    </section>
  );
}