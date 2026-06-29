"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Calendar, FileText, Users, Award, BookOpen, ArrowRight, Sparkles, TrendingUp, Star, Rocket, Brain, Target } from "lucide-react";

const features = [
  {
    title: "Tuyển Sinh",
    description: "Cập nhật thông tin tuyển sinh các trường Đại học hàng đầu",
    icon: GraduationCap,
    size: "large",
    gradient: "from-violet-600 to-pink-500",
    link: "/admissions",
    color: "violet",
    emoji: "🎓",
  },
  {
    title: "Lịch Học",
    description: "Xem lịch học theo tuần, tháng với giao diện trực quan",
    icon: Calendar,
    size: "tall",
    gradient: "from-pink-500 to-rose-500",
    link: "/schedule",
    color: "pink",
    emoji: "📅",
  },
  {
    title: "Điểm Số",
    description: "Theo dõi điểm số, GPA, xếp loại học tập",
    icon: FileText,
    size: "medium",
    gradient: "from-mint-500 to-emerald-500",
    link: "/profile",
    color: "mint",
    emoji: "📊",
  },
  {
    title: "AI Thông Minh",
    description: "Tư vấn ngành học & định hướng tương lai",
    icon: Brain,
    size: "medium",
    gradient: "from-cobalt-500 to-blue-500",
    link: "/admissions",
    color: "cobalt",
    emoji: "🤖",
  },
  {
    title: "Hồ Sơ",
    description: "Xem thông tin cá nhân & quản lý hồ sơ sinh viên",
    icon: Users,
    size: "small",
    gradient: "from-amber-500 to-orange-500",
    link: "/profile",
    color: "amber",
    emoji: "👤",
  },
  {
    title: "Học Liệu",
    description: "Truy cập tài liệu học tập, giáo trình, bài giảng",
    icon: BookOpen,
    size: "small",
    gradient: "from-rose-500 to-red-500",
    link: "/materials",
    color: "rose",
    emoji: "📚",
  },
  {
    title: "Mục Tiêu",
    description: "Cập nhật lộ trình học tập và mục tiêu cá nhân",
    icon: Target,
    size: "small",
    gradient: "from-cyan-500 to-sky-500",
    link: "/profile",
    color: "cyan",
    emoji: "🎯",
  },
  {
    title: "Sự Kiện",
    description: "Các sự kiện, hoạt động sắp diễn ra trong năm học",
    icon: Star,
    size: "small",
    gradient: "from-violet-400 to-purple-500",
    link: "/events",
    color: "violet",
    emoji: "✨",
  },
];

const sizeMap: Record<string, string> = {
  large: "md:col-span-2 md:row-span-1",
  medium: "md:col-span-1 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
};

const colorMap: Record<string, string> = {
  violet: "text-violet-400 bg-violet-500/20",
  pink: "text-pink-400 bg-pink-500/20",
  mint: "text-mint-400 bg-mint-500/20",
  cobalt: "text-cobalt-400 bg-cobalt-500/20",
  amber: "text-amber-400 bg-amber-500/20",
  rose: "text-rose-400 bg-rose-500/20",
  cyan: "text-cyan-400 bg-cyan-500/20",
};

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
      {features.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`${sizeMap[item.size]} group relative overflow-hidden rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-violet-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

            {/* Large emoji background */}
            <div className="absolute top-2 right-2 text-6xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
              {item.emoji}
            </div>

            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div>
                {/* Big Icon with glow */}
                <motion.div
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-4 rounded-2xl mb-4 ${colorMap[item.color]} group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300`}
                >
                  <IconComponent className="w-10 h-10" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-400 group-hover:text-charcoal-200 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-charcoal-700/50 group-hover:border-white/20">
                <Link href={item.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  <span>Khám phá</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <motion.span initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-violet-300">
                  <Sparkles className="w-5 h-5" />
                </motion.span>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );
      })}
    </div>
  );
}