"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { debouncedSaveContext, generateTaskId, createIdempotencyKey } from "@/lib/redis";
import { cn, getVietnameseGradeStatus } from "@/lib/utils";

interface GradeInputFormProps {
  onChange: (data: Record<string, unknown>) => void;
  initialData: Record<string, unknown>;
}

interface Student {
  id: string;
  studentId: string;
  fullName: string;
  major: string;
}

interface GradeEntry {
  studentId: string;
  courseId: string;
  score: string;
}

const mockStudents: Student[] = [
  { id: "1", studentId: "SV2024CNTT001", fullName: "Nguyễn Văn A", major: "CNTT" },
  { id: "2", studentId: "SV2024CNTT002", fullName: "Trần Thị B", major: "CNTT" },
  { id: "3", studentId: "SV2024KT001", fullName: "Lê Văn C", major: "Kế toán" },
  { id: "4", studentId: "SV2024QTKD001", fullName: "Phạm Thị D", major: "QTKD" },
  { id: "5", studentId: "SV2024NNTA001", fullName: "Hoàng Văn E", major: "NNTA" },
];

const mockCourses = [
  { id: "1", code: "CS101", name: "Nhập môn lập trình" },
  { id: "2", code: "CS102", name: "Cấu trúc dữ liệu" },
  { id: "3", code: "MATH101", name: "Toán cao cấp" },
  { id: "4", code: "ENG101", name: "Tiếng Anh cơ bản" },
];

export function GradeInputForm({ onChange, initialData }: GradeInputFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentSessionId] = useState(() => generateTaskId());

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScoreChange = useCallback((studentId: string, score: string) => {
    setGrades((prev) => {
      const existing = prev.find((g) => g.studentId === studentId);
      if (existing) {
        return prev.map((g) =>
          g.studentId === studentId ? { ...g, score } : g
        );
      }
      return [...prev, { studentId, courseId: selectedCourse, score }];
    });
  }, [selectedCourse]);

  const handleSave = useCallback(async () => {
    if (!selectedCourse || grades.length === 0) return;

    setIsSaving(true);
    const idempotencyKey = createIdempotencyKey(currentSessionId);

    try {
      // Simulate API call with idempotency key
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, this would be:
      // await fetch('/api/grades', {
      //   method: 'POST',
      //   headers: { 'X-Idempotency-Key': idempotencyKey },
      //   body: JSON.stringify({ courseId: selectedCourse, grades })
      // });

      setSaveSuccess(true);
      onChange({ courseId: selectedCourse, grades, savedAt: new Date() });

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save grades:", error);
    } finally {
      setIsSaving(false);
    }
  }, [selectedCourse, grades, currentSessionId, onChange]);

  // Debounced save to Redis
  useEffect(() => {
    if (selectedCourse && grades.length > 0) {
      debouncedSaveContext({
        userId: "current-user",
        taskId: currentSessionId,
        taskType: "input-grades",
        formData: { courseId: selectedCourse, grades },
        draftData: {},
        timestamp: Date.now(),
      }, 300);
    }
  }, [selectedCourse, grades, currentSessionId]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc MSSV..."
            className="w-full pl-10 pr-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
        >
          <option value="">Chọn môn học</option>
          {mockCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grade Table */}
      <div className="border border-charcoal-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">MSSV</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Họ tên</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Ngành</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Điểm (0-10)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Xếp loại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800">
              {filteredStudents.map((student) => {
                const grade = grades.find((g) => g.studentId === student.studentId);
                const score = grade?.score ? parseFloat(grade.score) : null;
                const gradeStatus = score !== null ? getVietnameseGradeStatus(score) : null;

                return (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-charcoal-800/50"
                  >
                    <td className="px-4 py-3 text-sm text-white">{student.studentId}</td>
                    <td className="px-4 py-3 text-sm text-white">{student.fullName}</td>
                    <td className="px-4 py-3 text-sm text-charcoal-400">{student.major}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={grade?.score || ""}
                        onChange={(e) => handleScoreChange(student.studentId, e.target.value)}
                        placeholder="0-10"
                        className="w-24 px-3 py-1.5 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {gradeStatus && (
                        <span className={cn("text-sm font-medium", gradeStatus.color)}>
                          {gradeStatus.label}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-charcoal-400">
          {grades.length} sinh viên đã nhập điểm
        </p>
        <button
          onClick={handleSave}
          disabled={!selectedCourse || grades.length === 0 || isSaving}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all",
            saveSuccess
              ? "bg-green-600 text-white"
              : "bg-violet-600 hover:bg-violet-500 text-white disabled:bg-charcoal-700 disabled:text-charcoal-500"
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang lưu...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Đã lưu!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu điểm
            </>
          )}
        </button>
      </div>
    </div>
  );
}