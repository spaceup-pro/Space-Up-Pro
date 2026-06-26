"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, FileText, Users, Award, BookOpen } from "lucide-react";

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan: string;
  rowSpan: string;
}

const bentoItems: BentoItem[] = [
  {
    title: "Thông Tin Tuyển Sinh",
    description: "Cập nhật thông tin tuyển sinh các trường Đại học hàng đầu, deadline nộp hồ sơ, quota và điều kiện.",
    icon: <GraduationCap className="w-8 h-8" />,
    colSpan: "md:col-span-2",
    rowSpan: "row-span-1",
  },
  {
    title: "Lịch Học Trực Quan",
    description: "Xem lịch học theo tuần, tháng với giao diện trực quan. Nhắc nhở lịch học tự động.",
    icon: <Calendar className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    rowSpan: "row-span-2",
  },
  {
    title: "Bảng Điểm",
    description: "Theo dõi điểm số, GPA, xếp loại học tập. Tính điểm trung bình tự động.",
    icon: <FileText className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Quản Lý Sinh Viên",
    description: "Dành cho quản trị viên: quản lý hồ sơ sinh viên, phê duyệt đơn, nhập điểm.",
    icon: <Users className="w-8 h-8" />,
    colSpan: "md:col-span-2",
    rowSpan: "row-span-1",
  },
  {
    title: "Chứng Nhận & Giải Thưởng",
    description: "Xem các chứng chỉ, giải thưởng, hoạt động ngoại khóa đã đạt được.",
    icon: <Award className="w-8 h-8" />,
    colSpan: "md:col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Học Liệu",
    description: "Truy cập tài liệu học tập, giáo trình, bài giảng từ các giảng viên.",
    icon: <BookOpen className="w-8 h-8" />,
    colSpan: "md:col-span-2",
    rowSpan: "row-span-1",
  },
];

const iconColors: Record<string, string> = {
  "Thông Tin Tuyển Sinh": "text-violet-400 bg-violet-500/20",
  "Lịch Học Trực Quan": "text-pink-400 bg-pink-500/20",
  "Bảng Điểm": "text-mint-400 bg-mint-500/20",
  "Quản Lý Sinh Viên": "text-cobalt-400 bg-cobalt-500/20",
  "Chứng Nhận & Giải Thưởng": "text-amber-400 bg-amber-500/20",
  "Học Liệu": "text-rose-400 bg-rose-500/20",
};

export function BentoGrid() {
  return (
    <div className="bento-grid">
      {bentoItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`bento-card ${item.colSpan} ${item.rowSpan} hover-lift`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
              iconColors[item.title] || "text-white bg-charcoal-700"
            }`}
          >
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-charcoal-400">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}