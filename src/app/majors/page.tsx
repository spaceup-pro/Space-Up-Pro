"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Calculator, Briefcase, Languages, Cpu, Stethoscope, PenTool, Building, ChevronDown, ChevronUp, Search, ChevronRight, Database, Microscope, Palette } from "lucide-react";
import Link from "next/link";

interface Major {
  id: number;
  name: string;
  code: string;
  category: string;
  description: string;
  tuitionFee: number;
  duration: number;
  credits: number;
  blocks: string[];
  careers: string[];
  subjects: string;
  image: string;
}


const majorsData: Major[] = [
  {
    id: 1,
    name: "Công nghệ Thông tin",
    code: "CNTT",
    category: "Công nghệ",
    description: "Chương trình đào tạo toàn diện về phát triển phần mềm, hệ thống thông tin, trí tuệ nhân tạo và an ninh mạng.",
    tuitionFee: 45000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "A1"],
    careers: ["Lập trình viên", "Kỹ sư AI", "Chuyên gia an ninh mạng", "Quản lý dự án CNTT"],
    subjects: "Toán, Lý, Tin học",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Kế toán",
    code: "KT",
    category: "Kinh tế",
    description: "Đào tạo chuyên sâu về kế toán doanh nghiệp, kiểm toán, tài chính ngân hàng và phân tích đầu tư.",
    tuitionFee: 38000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "D"],
    careers: ["Kế toán", "Kiểm toán viên", "Chuyên viên tài chính", "Tư vấn thuế"],
    subjects: "Toán, Văn, Anh",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Quản trị Kinh doanh",
    code: "QTKD",
    category: "Kinh tế",
    description: "Chương trình cung cấp kiến thức toàn diện về quản lý, marketing, kinh doanh quốc tế và khởi nghiệp.",
    tuitionFee: 42000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "D"],
    careers: ["Quản lý", "Chuyên viên marketing", "Nhân viên kinh doanh", "Giám đốc kinh doanh"],
    subjects: "Toán, Văn, Anh",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Ngôn ngữ Anh",
    code: "NNTA",
    category: "Ngôn ngữ",
    description: "Đào tạo về ngôn ngữ Anh, biên phiên dịch, giao tiếp quốc tế và phương pháp giảng dạy tiếng Anh.",
    tuitionFee: 35000000,
    duration: 4,
    credits: 120,
    blocks: ["C", "D"],
    careers: ["Biên dịch", "Phiên dịch", "Giảng viên tiếng Anh", "Chuyên viên ngoại giao"],
    subjects: "Văn, Sử, Anh",
    image: "https://images.unsplash.com/photo-1543269865-cbf13effca14?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Kỹ thuật Cơ khí",
    code: "KTCO",
    category: "Kỹ thuật",
    description: "Chương trình đào tạo về thiết kế, chế tạo và bảo trì máy móc, động cơ và hệ thống cơ khí.",
    tuitionFee: 40000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "A1", "B"],
    careers: ["Kỹ sư cơ khí", "Kỹ sư thiết kế", "Kỹ sư sản xuất", "Chuyên gia CAD/CAM"],
    subjects: "Toán, Lý, Hóa",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Kỹ thuật Điện",
    code: "KTDI",
    category: "Kỹ thuật",
    description: "Đào tạo về hệ thống điện, điện tử, điện lạnh, tự động hóa và năng lượng tái tạo.",
    tuitionFee: 38000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "A1"],
    careers: ["Kỹ sư điện", "Kỹ sư tự động hóa", "Kỹ thuật viên điện lạnh", "Chuyên gia năng lượng"],
    subjects: "Toán, Lý, Anh",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Y khoa",
    code: "YK",
    category: "Y tế",
    description: "Chương trình đào tạo bác sĩ đa khoa với kiến thức nền tảng vững chắc và kỹ năng lâm sàng thực hành.",
    tuitionFee: 70000000,
    duration: 6,
    credits: 180,
    blocks: ["A", "B"],
    careers: ["Bác sĩ đa khoa", "Bác sĩ chuyên khoa", "Nghiên cứu y học", "Giảng viên y khoa"],
    subjects: "Toán, Hóa, Sinh",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d42d52?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Luật",
    code: "LUAT",
    category: "Pháp luật",
    description: "Đào tạo chuyên gia pháp luật với kiến thức toàn diện về luật dân sự, hình sự, kinh tế và quốc tế.",
    tuitionFee: 36000000,
    duration: 4,
    credits: 120,
    blocks: ["C", "D"],
    careers: ["Luật sư", "Thẩm phán", "Chuyên viên pháp chế", "Cố vấn pháp lý"],
    subjects: "Văn, Sử, Địa",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Thiết kế Đồ họa",
    code: "TDTH",
    category: "Nghệ thuật",
    description: "Chương trình đào tạo về thiết kế đồ họa, UX/UI, truyền thông đa phương tiện và sáng tạo nội dung.",
    tuitionFee: 38000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "D"],
    careers: ["Nhà thiết kế đồ họa", "UX/UI Designer", "Art Director", "Sáng tạo nội dung"],
    subjects: "Toán, Văn, Anh",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Xây dựng",
    code: "XD",
    category: "Kỹ thuật",
    description: "Đào tạo về thiết kế, thi công và quản lý các công trình xây dựng dân dụng và công nghiệp.",
    tuitionFee: 42000000,
    duration: 4,
    credits: 120,
    blocks: ["A", "A1"],
    careers: ["Kỹ sư xây dựng", "Kỹ sư kết cấu", "Chỉ huy trưởng", "Giám sát xây dựng"],
    subjects: "Toán, Lý, Vẽ",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
];


const categories = [
  { name: "Tất cả", icon: null },
  { name: "Công nghệ", icon: Cpu },
  { name: "Kinh tế", icon: Briefcase },
  { name: "Kỹ thuật", icon: Calculator },
  { name: "Ngôn ngữ", icon: Languages },
  { name: "Y tế", icon: Stethoscope },
  { name: "Pháp luật", icon: PenTool },
  { name: "Nghệ thuật", icon: PenTool },
];

const categoryColors: Record<string, string> = {
  "Công nghệ": "text-cobalt-400 bg-cobalt-500/20",
  "Kinh tế": "text-amber-400 bg-amber-500/20",
  "Kỹ thuật": "text-mint-400 bg-mint-500/20",
  "Ngôn ngữ": "text-violet-400 bg-violet-500/20",
  "Y tế": "text-rose-400 bg-rose-500/20",
  "Pháp luật": "text-yellow-400 bg-yellow-500/20",
  "Nghệ thuật": "text-pink-400 bg-pink-500/20",
};

const blockColors: Record<string, string> = {
  A: "bg-red-500/20 text-red-400",
  A1: "bg-orange-500/20 text-orange-400",
  B: "bg-green-500/20 text-green-400",
  C: "bg-blue-500/20 text-blue-400",
  D: "bg-violet-500/20 text-violet-400",
  D1: "bg-pink-500/20 text-pink-400",
};

export default function MajorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [expandedMajor, setExpandedMajor] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMajors = majorsData.filter((major) => {
    const matchesCategory = selectedCategory === "Tất cả" || major.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleExpand = (id: number) => {
    setExpandedMajor(expandedMajor === id ? null : id);
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
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cobalt-600/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-mint-600/15 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-cobalt-400 bg-cobalt-500/10 rounded-full border border-cobalt-500/20">
            🎓 Danh Mục Ngành Học
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Các Ngành </span>
            <span className="gradient-text">Đào Tạo</span>
          </h1>
          <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
            Khám phá các ngành học đa dạng và tìm kiếm con đường sự nghiệp phù hợp với bạn
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm ngành học..."
              className="w-full pl-12 pr-4 py-3 bg-charcoal-900/50 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.name
                  ? "bg-violet-600 text-white"
                  : "bg-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-700"
              }`}
            >
              {cat.icon && <cat.icon className="w-4 h-4" />}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <p className="text-3xl font-bold gradient-text">{majorsData.length}</p>
            <p className="text-sm text-charcoal-400">Ngành học</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <p className="text-3xl font-bold text-white">{categories.length - 1}</p>
            <p className="text-sm text-charcoal-400">Lĩnh vực</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <p className="text-3xl font-bold text-white">4-6</p>
            <p className="text-sm text-charcoal-400">Năm học</p>
          </div>
          <div className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-center">
            <p className="text-3xl font-bold text-white">120-180</p>
            <p className="text-sm text-charcoal-400">Tín chỉ</p>
          </div>
        </motion.div>


        {/* Majors Grid - New Design with Image Headers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredMajors.map((major, index) => {
            const majorIcons: Record<string, React.ElementType> = {
              "Công nghệ": Cpu,
              "Kinh tế": Briefcase,
              "Kỹ thuật": Calculator,
              "Ngôn ngữ": Languages,
              "Y tế": Stethoscope,
              "Pháp luật": PenTool,
              "Nghệ thuật": Palette,
            };

            const IconComponent = majorIcons[major.category] || Cpu;

            return (
              <motion.div
                key={major.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group relative bg-charcoal-900/50 border border-charcoal-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all hover:shadow-xl hover:shadow-violet-500/10"
              >
                {/* Major Header with Image Background */}
                <div
                  onClick={() => toggleExpand(major.id)}
                  className="h-32 relative overflow-hidden cursor-pointer"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${major.image})` }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/70 to-transparent" />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    {major.duration} năm
                  </div>
                </div>

                {/* Major Info */}
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-charcoal-800 text-charcoal-300">
                      {major.category}
                    </span>
                    <span className="text-xs text-charcoal-500">Mã: {major.code}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-violet-300 transition-colors line-clamp-2">
                    {major.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 line-clamp-2 mb-3">{major.description}</p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-charcoal-800">
                    <div className="text-xs">
                      <span className="text-charcoal-500">Học phí: </span>
                      <span className="text-white font-medium">{formatCurrency(major.tuitionFee)}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-charcoal-500">Tín chỉ: </span>
                      <span className="text-white font-medium">{major.credits}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedMajor === major.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 border-t border-charcoal-800"
                    >
                      <div className="pt-3 space-y-3">
                        {/* Blocks */}
                        <div>
                          <p className="text-xs text-charcoal-500 mb-1.5">Khối thi:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {major.blocks.map((block) => (
                              <span
                                key={block}
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  blockColors[block] || "bg-charcoal-700 text-charcoal-300"
                                }`}
                              >
                                Khối {block}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Careers */}
                        <div>
                          <p className="text-xs text-charcoal-500 mb-1.5">Cơ hội nghề nghiệp:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {major.careers.slice(0, 2).map((career, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-charcoal-800 text-charcoal-300"
                              >
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action */}
                        <Link
                          href={`/auth/register?major=${major.id}`}
                          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium group/btn"
                        >
                          <span>Đăng ký ngay</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMajors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-charcoal-400 text-lg">Không tìm thấy ngành học phù hợp</p>
            <button
              onClick={() => {
                setSelectedCategory("Tất cả");
                setSearchQuery("");
              }}
              className="mt-4 text-violet-400 hover:text-violet-300 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}