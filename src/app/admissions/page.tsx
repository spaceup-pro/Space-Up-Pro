"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, GraduationCap, ChevronRight, Clock, MapPin, Mail, Phone, Code, Palette, Calculator, TrendingUp, Scale, Heart, Cpu as CpuIcon, Globe, Hammer, BrickWall } from "lucide-react";
import Link from "next/link";

interface AdmissionItem {
  id: number;
  title: string;
  year: number;
  block: string;
  quota: number;
  deadline: string;
  tuitionFee: number;
  status: "open" | "closing" | "closed";
  description: string;
}

interface Course {
  id: number;
  name: string;
  majorName: string;
  description: string;
  credits: number;
  icon: React.ElementType;
  gradient: string;
  image: string;
}

const admissionData: AdmissionItem[] = [
  {
    id: 1,
    title: "Tuyển sinh đại học chính quy - Đợt 2024",
    year: 2024,
    block: "A, A1, B, C, D, D1",
    quota: 5000,
    deadline: "2024-06-30",
    tuitionFee: 45000000,
    status: "closing",
    description: "Tuyển sinh các ngành đại học chính quy theo chương trình đào tạo chuẩn.",
  },
  {
    id: 2,
    title: "Tuyển sinh Công nghệ Thông tin - Tiên tiến",
    year: 2024,
    block: "A, A1",
    quota: 200,
    deadline: "2024-05-31",
    tuitionFee: 65000000,
    status: "open",
    description: "Chương trình tiên tiến hợp tác với các trường đại học quốc tế.",
  },
  {
    id: 3,
    title: "Tuyển sinh Kinh tế - Quản trị Kinh doanh",
    year: 2024,
    block: "A, D",
    quota: 800,
    deadline: "2024-07-15",
    tuitionFee: 42000000,
    status: "open",
    description: "Chương trình đào tạo kinh tế và quản trị kinh doanh chuyên sâu.",
  },
  {
    id: 4,
    title: "Tuyển sinh Ngôn ngữ - Truyền thông Quốc tế",
    year: 2024,
    block: "C, D",
    quota: 300,
    deadline: "2024-07-01",
    tuitionFee: 38000000,
    status: "open",
    description: "Chương trình ngôn ngữ và truyền thông với cơ hội trao đổi quốc tế.",
  },
  {
    id: 5,
    title: "Tuyển sinh Kỹ thuật - Công nghệ",
    year: 2024,
    block: "A, A1, B",
    quota: 1000,
    deadline: "2024-06-30",
    tuitionFee: 40000000,
    status: "closing",
    description: "Các ngành kỹ thuật cơ khí, điện, điện tử, tự động hóa.",
  },
];

// 10 Môn học tiêu biểu cho các ngành
const coursesData: Course[] = [
  {
    id: 1,
    name: "Lập trình Python & AI",
    majorName: "Công nghệ Thông tin",
    description: "Học lập trình Python, Machine Learning và Deep Learning với các thư viện TensorFlow, PyTorch.",
    credits: 4,
    icon: Code,
    gradient: "from-blue-500 via-cyan-400 to-emerald-500",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Thiết kế UX/UI",
    majorName: "Thiết kế Đồ họa",
    description: "Nguyên lý thiết kế giao diện, nghiên cứu người dùng và tạo trải nghiệm số.",
    credits: 3,
    icon: Palette,
    gradient: "from-pink-500 via-rose-400 to-violet-500",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Kế toán Tài chính",
    majorName: "Kế toán",
    description: "Học nguyên lý kế toán, báo cáo tài chính, phân tích doanh nghiệp và chuẩn mực IFRS.",
    credits: 4,
    icon: Calculator,
    gradient: "from-amber-500 via-orange-400 to-yellow-500",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Marketing Digital",
    majorName: "Quản trị Kinh doanh",
    description: "Chiến lược marketing online, SEO, Google Ads, Facebook Marketing và phân tích dữ liệu.",
    credits: 3,
    icon: TrendingUp,
    gradient: "from-green-500 via-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Luật Kinh doanh",
    majorName: "Luật",
    description: "Luật thương mại, đầu tư, sở hữu trí tuệ và giải quyết tranh chấp trong kinh doanh.",
    credits: 3,
    icon: Scale,
    gradient: "from-slate-500 via-gray-400 to-zinc-500",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Y học Cơ bản",
    majorName: "Y khoa",
    description: "Giải phẫu học, sinh lý học, bệnh học và nền tảng lâm sàng cho bác sĩ.",
    credits: 6,
    icon: Heart,
    gradient: "from-red-500 via-rose-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d42d52?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Kiến trúc Máy tính",
    majorName: "Kỹ thuật Điện",
    description: "Thiết kế hệ thống số, vi xử lý, embedded systems và IoT.",
    credits: 4,
    icon: CpuIcon,
    gradient: "from-indigo-500 via-purple-400 to-violet-500",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Giao tiếp Quốc tế",
    majorName: "Ngôn ngữ Anh",
    description: "Anh ngữ học thuật, giao tiếp kinh doanh quốc tế và thương thuyết.",
    credits: 3,
    icon: Globe,
    gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1543269865-cbf13effca14?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Cơ khí Ứng dụng",
    majorName: "Kỹ thuật Cơ khí",
    description: "Thiết kế CAD/CAM, gia công cơ khí chính xác và công nghệ sản xuất hiện đại.",
    credits: 4,
    icon: Hammer,
    gradient: "from-orange-500 via-amber-400 to-yellow-500",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Kết cấu Công trình",
    majorName: "Xây dựng",
    description: "Phân tích kết cấu, thiết kế bê tông cốt thép, thép và nền móng công trình.",
    credits: 4,
    icon: BrickWall,
    gradient: "from-stone-500 via-neutral-400 to-gray-500",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
];

const blockColors: Record<string, string> = {
  A: "bg-red-500/20 text-red-400",
  A1: "bg-orange-500/20 text-orange-400",
  B: "bg-green-500/20 text-green-400",
  C: "bg-blue-500/20 text-blue-400",
  D: "bg-violet-500/20 text-violet-400",
  D1: "bg-pink-500/20 text-pink-400",
};

export default function AdmissionsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredData = selectedYear
    ? admissionData.filter((item) => item.year === selectedYear)
    : admissionData;

  const years = [...new Set(admissionData.map((item) => item.year))];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
            Đang mở
          </span>
        );
      case "closing":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
            Sắp đóng
          </span>
        );
      case "closed":
        return (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal-600 text-charcoal-400">
            Đã đóng
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
            📚 Thông Tin Tuyển Sinh
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Tuyển Sinh </span>
            <span className="gradient-text">2024</span>
          </h1>
          <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
            Khám phá các chương trình tuyển sinh và lựa chọn con đường học tập phù hợp với bạn
          </p>
        </motion.div>

        {/* Filter by Year */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              selectedYear === null
                ? "bg-violet-600 text-white"
                : "bg-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-700"
            }`}
          >
            Tất cả
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                selectedYear === year
                  ? "bg-violet-600 text-white"
                  : "bg-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-700"
              }`}
            >
              Năm {year}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-violet-400" />
            <p className="text-2xl font-bold text-white">{admissionData.length}</p>
            <p className="text-sm text-charcoal-400">Chương trình</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <p className="text-2xl font-bold text-white">
              {admissionData.reduce((acc, item) => acc + item.quota, 0).toLocaleString()}
            </p>
            <p className="text-sm text-charcoal-400">Tổng chỉ tiêu</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-mint-400" />
            <p className="text-2xl font-bold text-white">
              {admissionData.filter((i) => i.status === "open").length}
            </p>
            <p className="text-sm text-charcoal-400">Đang mở</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-cobalt-400" />
            <p className="text-2xl font-bold text-white">6</p>
            <p className="text-sm text-charcoal-400">Khối thi</p>
          </div>
        </motion.div>

        {/* Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Các Môn Học <span className="gradient-text">Tiêu Biểu</span>
            </h2>
            <p className="text-charcoal-400 max-w-2xl mx-auto">
              Khám phá các môn học chuyên ngành được giảng dạy bởi giảng viên giàu kinh nghiệm
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {coursesData.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-charcoal-900/50 border border-charcoal-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all hover:shadow-xl hover:shadow-violet-500/10"
              >
                {/* Course Image (Real Image with Icon) */}
                <div className="h-32 relative overflow-hidden">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/70 to-transparent" />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {/* Credits badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
                    {course.credits} tín chỉ
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 group-hover:text-violet-300 transition-colors line-clamp-2">
                    {course.name}
                  </h3>
                  <p className="text-xs text-charcoal-400 mb-2 line-clamp-1">{course.majorName}</p>
                  <p className="text-xs text-charcoal-500 line-clamp-2">{course.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Admission List */}
        <div className="space-y-4">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 hover:border-violet-500/50 transition-all hover:shadow-xl hover:shadow-violet-500/10"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left - Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {getStatusBadge(item.status)}
                    <span className="text-sm text-charcoal-500">Năm {item.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-400 text-sm mb-4">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.block.split(", ").map((block) => (
                      <span
                        key={block}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          blockColors[block] || "bg-charcoal-700 text-charcoal-300"
                        }`}
                      >
                        Khối {block}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right - Details */}
                <div className="flex lg:flex-col gap-6 lg:gap-3 lg:text-right">
                  <div className="flex items-center gap-2 text-charcoal-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Chỉ tiêu: <span className="text-white font-medium">{item.quota}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Hạn chót: <span className="text-white font-medium">{formatDate(item.deadline)}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Học phí: <span className="text-white font-medium">{formatCurrency(item.tuitionFee)}</span></span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-5 border-t border-charcoal-800 flex justify-end">
                <Link
                  href={`/auth/register?admission=${item.id}`}
                  className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group/btn"
                >
                  <span className="font-medium">Đăng ký ngay</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-violet-900/20 to-pink-900/20 border border-violet-500/20 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Cần hỗ trợ thêm?</h3>
          <p className="text-charcoal-400 mb-5">Liên hệ với chúng tôi để được tư vấn miễn phí</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Liên hệ ngay
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}