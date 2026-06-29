"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowRight, Clock, GraduationCap, CreditCard, Sparkles, Code, Calculator, Globe, Cpu, Language, Gauge, Zap } from "lucide-react";

interface Major {
  id: number;
  name: string;
  code: string;
  description: string;
  tuition_fee_per_year: number;
  duration_years: number;
  total_credits: number;
  emoji: string;
  gradient: string;
}

interface AdmissionBlock {
  value: string;
  label: string;
  emoji: string;
}

const admissionBlocks: AdmissionBlock[] = [
  { value: "A", label: "Khối A", emoji: "📐" },
  { value: "A1", label: "Khối A1", emoji: "⚡" },
  { value: "B", label: "Khối B", emoji: "🧬" },
  { value: "C", label: "Khối C", emoji: "📚" },
  { value: "D", label: "Khối D", emoji: "🌍" },
  { value: "D1", label: "Khối D1", emoji: "🥖" },
];

const mockMajors: Major[] = [
  {
    id: 1,
    name: "Công nghệ thông tin",
    code: "CNTT",
    description: "Lập trình, AI, an ninh mạng",
    tuition_fee_per_year: 45000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "💻",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Kế toán",
    code: "KT",
    description: "Tài chính, kiểm toán doanh nghiệp",
    tuition_fee_per_year: 38000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "📊",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 3,
    name: "Quản trị kinh doanh",
    code: "QTKD",
    description: "Marketing, kinh doanh quốc tế",
    tuition_fee_per_year: 42000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "💼",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    name: "Ngôn ngữ Anh",
    code: "NNTA",
    description: "Biên phiên dịch, giao tiếp",
    tuition_fee_per_year: 35000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "🗣️",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    name: "Kỹ thuật cơ khí",
    code: "KT",
    description: "Thiết kế, chế tạo máy",
    tuition_fee_per_year: 40000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "⚙️",
    gradient: "from-slate-500 to-zinc-500",
  },
  {
    id: 6,
    name: "Kỹ thuật điện",
    code: "KTĐ",
    description: "Điện tử, tự động hóa",
    tuition_fee_per_year: 38000000,
    duration_years: 4,
    total_credits: 120,
    emoji: "🔌",
    gradient: "from-yellow-500 to-amber-500",
  },
];

export function ProgramFinder() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  const filteredMajors = selectedBlock
    ? mockMajors.filter((major, index) => index % 2 === 0)
    : mockMajors;

  const handleBlockSelect = useCallback((block: string) => {
    setSelectedBlock((prev) => (prev === block ? null : block));
    setSelectedMajor(null);
  }, []);

  const handleMajorSelect = useCallback((major: Major) => {
    setSelectedMajor((prev) => (prev?.id === major.id ? null : major));
  }, []);

  return (
    <div className="w-full">
      {/* Visual Block Selection */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Bạn thi khối nào? 🎯
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {admissionBlocks.map((block) => (
            <motion.button
              key={block.value}
              onClick={() => handleBlockSelect(block.value)}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative px-6 py-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 min-w-[100px]",
                selectedBlock === block.value
                  ? "bg-violet-600/30 border-violet-500 shadow-lg shadow-violet-500/30"
                  : "bg-charcoal-800/50 border-charcoal-700 hover:border-charcoal-500 hover:bg-charcoal-800"
              )}
            >
              <span className="text-3xl">{block.emoji}</span>
              <span className="text-white font-semibold">{block.label}</span>
              {selectedBlock === block.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Visual Major Selection */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Chọn ngành học bạn quan tâm ✨
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMajors.map((major, index) => (
                <motion.div
                  key={major.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <motion.button
                    onClick={() => handleMajorSelect(major)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                      selectedMajor?.id === major.id
                        ? "bg-violet-600/20 border-violet-500 shadow-lg shadow-violet-500/20"
                        : "bg-charcoal-800/50 border-charcoal-700 hover:border-charcoal-500"
                    )}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${major.gradient} opacity-0 ${selectedMajor?.id === major.id ? 'opacity-10' : ''} group-hover:opacity-20 transition-opacity`} />

                    <div className="relative z-10">
                      {/* Emoji & Code */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl">{major.emoji}</span>
                        <span className="text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full">
                          {major.code}
                        </span>
                      </div>

                      {/* Name & Description */}
                      <h4 className="text-lg font-bold text-white mb-2">{major.name}</h4>
                      <p className="text-sm text-charcoal-400 mb-3">
                        {major.description}
                      </p>

                      {/* Quick info */}
                      <div className="flex items-center gap-4 text-xs text-charcoal-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {major.duration_years} năm
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          {formatCurrency(major.tuition_fee_per_year)}/năm
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Details */}
      <AnimatePresence>
        {selectedMajor && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-charcoal-800/80 to-charcoal-900/80 border border-charcoal-700"
          >
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">{selectedMajor.emoji}</span>
              <h3 className="text-2xl font-bold text-white">
                {selectedMajor.name}
              </h3>
              <p className="text-charcoal-400 mt-2">{selectedMajor.description}</p>
            </div>

            {/* Stats Grid - Visual */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-center"
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-violet-400" />
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(selectedMajor.tuition_fee_per_year)}
                </p>
                <p className="text-xs text-charcoal-400 mt-1">Học phí/năm</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-center"
              >
                <Clock className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <p className="text-2xl font-bold text-white">
                  {selectedMajor.duration_years}
                </p>
                <p className="text-xs text-charcoal-400 mt-1">Năm học</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 text-center"
              >
                <GraduationCap className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <p className="text-2xl font-bold text-white">
                  {selectedMajor.total_credits}
                </p>
                <p className="text-xs text-charcoal-400 mt-1">Tín chỉ</p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={`/auth/register?major=${selectedMajor.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 text-center font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
              >
                <span>Đăng Ký Ngay</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 text-center font-semibold text-white bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>Xem chi tiết</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}