"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency, getAdmissionBlockLabel } from "@/lib/utils";

interface Major {
  id: number;
  name: string;
  code: string;
  description: string;
  tuition_fee_per_year: number;
  duration_years: number;
  total_credits: number;
}

interface AdmissionBlock {
  value: string;
  label: string;
  subjects: string;
}

const admissionBlocks: AdmissionBlock[] = [
  { value: "A", label: "Khối A", subjects: "Toán, Lý, Hóa" },
  { value: "A1", label: "Khối A1", subjects: "Toán, Lý, Anh" },
  { value: "B", label: "Khối B", subjects: "Toán, Hóa, Sinh" },
  { value: "C", label: "Khối C", subjects: "Văn, Sử, Địa" },
  { value: "D", label: "Khối D", subjects: "Toán, Văn, Anh" },
  { value: "D1", label: "Khối D1", subjects: "Toán, Văn, Pháp" },
];

const mockMajors: Major[] = [
  {
    id: 1,
    name: "Công nghệ thông tin",
    code: "CNTT",
    description: "Học về lập trình, phần mềm, AI, an ninh mạng",
    tuition_fee_per_year: 45000000,
    duration_years: 4,
    total_credits: 120,
  },
  {
    id: 2,
    name: "Kế toán",
    code: "KT",
    description: "Học về kế toán doanh nghiệp, tài chính, kiểm toán",
    tuition_fee_per_year: 38000000,
    duration_years: 4,
    total_credits: 120,
  },
  {
    id: 3,
    name: "Quản trị kinh doanh",
    code: "QTKD",
    description: "Học về quản lý, marketing, kinh doanh quốc tế",
    tuition_fee_per_year: 42000000,
    duration_years: 4,
    total_credits: 120,
  },
  {
    id: 4,
    name: "Ngôn ngữ Anh",
    code: "NNTA",
    description: "Học về ngôn ngữ, biên phiên dịch, giao tiếp quốc tế",
    tuition_fee_per_year: 35000000,
    duration_years: 4,
    total_credits: 120,
  },
  {
    id: 5,
    name: "Kỹ thuật cơ khí",
    code: "KT",
    description: "Học về thiết kế, chế tạo, cơ khí động cơ",
    tuition_fee_per_year: 40000000,
    duration_years: 4,
    total_credits: 120,
  },
  {
    id: 6,
    name: "Kỹ thuật điện",
    code: "KTĐ",
    description: "Học về điện tử, điện lạnh, tự động hóa",
    tuition_fee_per_year: 38000000,
    duration_years: 4,
    total_credits: 120,
  },
];

export function ProgramFinder() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  const filteredMajors = selectedBlock
    ? mockMajors.filter((major, index) => index % 2 === 0) // Mock filter by block
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
      {/* Step 1: Select Admission Block */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          1. Chọn khối thi:
        </h3>
        <div className="flex flex-wrap gap-3">
          {admissionBlocks.map((block) => (
            <motion.button
              key={block.value}
              onClick={() => handleBlockSelect(block.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "program-bubble",
                selectedBlock === block.value && "selected"
              )}
            >
              {block.label}
            </motion.button>
          ))}
        </div>
        {selectedBlock && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 text-sm text-charcoal-400"
          >
            Môn thi:{" "}
            <span className="text-violet-400">
              {admissionBlocks.find((b) => b.value === selectedBlock)?.subjects}
            </span>
          </motion.p>
        )}
      </div>

      {/* Step 2: Select Major */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              2. Chọn ngành học:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMajors.map((major, index) => (
                <motion.div
                  key={major.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleMajorSelect(major)}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border transition-all duration-300",
                      selectedMajor?.id === major.id
                        ? "bg-violet-600/20 border-violet-500"
                        : "bg-charcoal-800/50 border-charcoal-700 hover:border-charcoal-600"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-violet-400 bg-violet-500/20 px-2 py-1 rounded">
                        {major.code}
                      </span>
                      <span className="text-sm text-charcoal-400">
                        {major.duration_years} năm
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{major.name}</h4>
                    <p className="text-sm text-charcoal-400 line-clamp-2">
                      {major.description}
                    </p>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Show Tuition & Details */}
      <AnimatePresence>
        {selectedMajor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-charcoal-800/50 to-charcoal-900/50 border border-charcoal-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              3. Thông tin chi tiết:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-charcoal-900/50">
                <p className="text-sm text-charcoal-400 mb-1">Học phí hàng năm</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(selectedMajor.tuition_fee_per_year)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-charcoal-900/50">
                <p className="text-sm text-charcoal-400 mb-1">Thời gian học</p>
                <p className="text-2xl font-bold text-white">
                  {selectedMajor.duration_years} năm
                </p>
              </div>
              <div className="p-4 rounded-lg bg-charcoal-900/50">
                <p className="text-sm text-charcoal-400 mb-1">Tổng tín chỉ</p>
                <p className="text-2xl font-bold text-white">
                  {selectedMajor.total_credits}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href={`/auth/register?major=${selectedMajor.id}`}
                className="btn-primary flex-1 text-center"
              >
                Đăng ký ngay
              </a>
              <button className="btn-secondary flex-1">
                Xem chi tiết
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}