"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Calendar, FileText, Users, Award, BookOpen, ArrowRight, Sparkles, TrendingUp, Star } from "lucide-react";

const features = [
  {
    title: "Thông Tin Tuyển Sinh",
    description: "Cập nhật thông tin tuyển sinh các trường Đại học hàng đầu, deadline nộp hồ sơ.",
    icon: GraduationCap,
    size: "large",
    gradient: "from-violet-600 to-pink-500",
    link: "/admissions",
    color: "violet",
  },
  {
    title: "Lịch Học Trực Quan",
    description: "Xem lịch học theo tuần, tháng với giao diện trực quan.",
    icon: Calendar,
    size: "tall",
    gradient: "from-pink-500 to-rose-500",
    link: "/schedule",
    color: "pink",
  },
  {
    title: "Bảng Điểm",
    description: "Theo dõi điểm số, GPA, xếp loại học tập.",
    icon: FileText,
    size: "medium",
    gradient: "from-mint-500 to-emerald-500",
    link: "/profile",
    color: "mint",
  },
  {
    title: "Quản Lý Sinh Viên",
    description: "Dành cho quản trị viên: quản lý hồ sơ sinh viên.",
    icon: Users,
    size: "medium",
    gradient: "from-cobalt-500 to-blue-500",
    link: "/admin",
    color: "cobalt",
  },
  {
    title: "Giải Thưởng",
    description: "Xem các chứng chỉ, giải thưởng, hoạt động ngoại khóa.",
    icon: Award,
    size: "small",
    gradient: "from-amber-500 to-orange-500",
    link: "/profile",
    color: "amber",
  },
  {
    title: "Học Liệu",
    description: "Truy cập tài liệu học tập, giáo trình, bài giảng.",
    icon: BookOpen,
    size: "small",
    gradient: "from-rose-500 to-red-500",
    link: "/materials",
    color: "rose",
  },
  {
    title: "Theo Dõi Tiến Độ",
    description: "Cập nhật lộ trình học tập và mục tiêu cá nhân.",
    icon: TrendingUp,
    size: "small",
    gradient: "from-cyan-500 to-sky-500",
    link: "/profile",
    color: "cyan",
  },
  {
    title: "Sự Kiện",
    description: "Các sự kiện, hoạt động sắp diễn ra trong năm học.",
    icon: Star,
    size: "small",
    gradient: "from-violet-400 to-purple-500",
    link: "/events",
    color: "violet",
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

            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div>
                <div className={`inline-flex p-3 rounded-xl mb-3 ${colorMap[item.color]} group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-400 group-hover:text-charcoal-200 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-charcoal-700/50 group-hover:border-white/20">
                <Link href={item.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  <span>Xem chi tiết</span>
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