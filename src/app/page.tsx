"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ProgramFinder } from "@/components/features/ProgramFinder";
import { BentoGrid } from "@/components/features/BentoGrid";
import { CTASection } from "@/components/features/CTASection";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Rocket, Sparkles, Star, Zap, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -150]);
  const y3 = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          style={{ y: y1, x: mouseX.current * 0.5 }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: y2, x: mouseX.current * 0.3 }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-0 left-1/2 w-[700px] h-[400px] bg-gradient-to-t from-pink-600/20 to-violet-600/20 rounded-full blur-[180px]"
        />

        {/* Star field */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDFWNDBIMHoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0wIDBoNHY0SDB6IiBmaWxsPSIjMzMzIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      {/* Hero Section - Visual Focused */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Floating 3D Elements */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block mb-8"
          >
            {/* Rocket icon with glow */}
            <div className="relative w-32 h-32 mx-auto">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative">
                  <Rocket className="w-24 h-24 text-white drop-shadow-[0_0_30px_rgba(167,139,250,0.8)]" />
                  {/* Flame effect */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent rounded-full blur-md"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Badge - Less text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-medium text-white bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>🚀 Sẵn sàng cho tương lai?</span>
          </motion.div>

          {/* Main Headline - Big & Visual */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">TÌM </span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              SPACE
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              CỦA BẠN
            </span>
          </motion.h1>

          {/* Subtext - Minimal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-charcoal-300 max-w-xl mx-auto mb-10"
          >
            Khám phá con đường học tập của bạn với AI thông minh ✨
          </motion.p>

          {/* CTA Buttons - Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => scrollToSection('program-finder')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl overflow-hidden shadow-lg shadow-violet-600/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Bắt Đầu Ngay
              </span>
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('discover')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-semibold text-white bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cyan-400" />
                Khám Phá
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-charcoal-400"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Visual Stats - Big Numbers */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "50+", label: "Trường ĐH", color: "from-violet-500 to-purple-500" },
              { number: "200+", label: "Ngành Học", color: "from-fuchsia-500 to-pink-500" },
              { number: "10K+", label: "Sinh Viên", color: "from-cyan-500 to-blue-500" },
              { number: "98%", label: "Hài Lòng", color: "from-emerald-500 to-teal-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative">
                  <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </span>
                  <p className="text-charcoal-400 mt-2 text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Program Finder - Card Based */}
      <section id="program-finder" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
            <Sparkles className="w-4 h-4" />
            Tìm kiếm thông minh
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-white">Ngành Học </span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Phù Hợp</span>
          </h2>
        </motion.div>
        <ProgramFinder />
      </section>

      {/* Visual Bento Grid - Big Images */}
      <section id="discover" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            <Star className="w-4 h-4" />
            Khám phá ngay
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-white">Tại Sao </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Chọn Space Up?</span>
          </h2>
        </motion.div>
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