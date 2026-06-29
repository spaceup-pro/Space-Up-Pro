"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ProgramFinder } from "@/components/features/ProgramFinder";
import { BentoGrid } from "@/components/features/BentoGrid";
import { StatsSection } from "@/components/features/StatsSection";
import { CTASection } from "@/components/features/CTASection";
// import { AICardGrid } from "@/components/features/AICardGrid";
import { useEffect, useState } from "react";
import { GraduationCap, ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't return early - this breaks hooks! Use conditional rendering instead
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cobalt-500/10 rounded-full blur-[200px]" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cobalt-400 rounded-full"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
              <Sparkles className="w-4 h-4" />
              Chào mừng đến với Space Up
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Tuyển Sinh </span>
            <span className="gradient-text">Việt Nam</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-charcoal-400 max-w-2xl mx-auto mb-10"
          >
            Khám phá cơ hội học tập tại các trường đại học hàng đầu.
            Tìm kiếm ngành học phù hợp với ước mơ của bạn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#program-finder" className="btn-primary group">
              <GraduationCap className="w-5 h-5" />
              <span>Tìm Kiếm Ngành Học</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/auth/login" className="btn-secondary">
              Đăng Nhập Ngay
            </a>
          </motion.div>
        </div>

        {/* Quick Features Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Users, label: "10,000+ Sinh viên", color: "text-violet-400" },
            { icon: BookOpen, label: "100+ Ngành học", color: "text-pink-400" },
            { icon: Award, label: "50+ Trường ĐH", color: "text-cobalt-400" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-charcoal-400">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <StatsSection />
      </section>

      {/* Program Finder Section */}
      <section id="program-finder" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-white">Tìm Kiếm </span>
            <span className="gradient-text">Chương Trình Học</span>
          </motion.h2>
          <p className="text-charcoal-400 max-w-xl mx-auto">
            Chọn khối thi và khám phá các ngành học phù hợp với năng lực của bạn
          </p>
        </div>
        <ProgramFinder />
      </section>

      {/* AI Card Grid Section */}
      {/*
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-cobalt-400 bg-cobalt-500/10 rounded-full border border-cobalt-500/20">
              <Sparkles className="w-4 h-4" />
              Khám Phá Theo Chủ Đề
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-white">Ngành Học </span>
            <span className="gradient-text">AI Tuyển Sinh</span>
          </motion.h2>
          <p className="text-charcoal-400 max-w-xl mx-auto">
            Khám phá các ngành học phổ biến với hình ảnh minh họa AI. Tìm kiếm đam mê của bạn.
          </p>
        </div>
        <AICardGrid />
      </section>
      */}

      {/* Bento Grid Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-white">Tại Sao Chọn </span>
            <span className="gradient-text">Space Up?</span>
          </motion.h2>
          <p className="text-charcoal-400 max-w-xl mx-auto">
            Nền tảng hiện đại giúp bạn dễ dàng tiếp cận thông tin tuyển sinh
          </p>
        </div>
        <BentoGrid />
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-charcoal-500">
            © 2026 Space Up. Nền tảng Tuyển Sinh & Quản Lý Sinh Viên.
          </p>
        </div>
      </footer>
    </div>
  );
}