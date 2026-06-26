"use client";

import { useState, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { cn, getCourseStatusLabel } from "@/lib/utils";

interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  major: string;
  admissionYear: number;
  gpa: number;
  failedCourses: number;
  status: string;
}

// Generate mock data - in production this would come from API
const generateMockStudents = (count: number): Student[] => {
  const majors = ["CNTT", "KT", "QTKD", "NNTA", "KCK", "KTD"];
  const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đặng", "Bùi", "Đỗ", "Ngô"];
  const lastNames = ["An", "Bảo", "Cường", "Dũng", "Hùng", "Khoa", "Long", "Minh", "Nam", "Phong", "Quân", "Sơn", "Thắng", "Trung", "Việt"];

  return Array.from({ length: count }, (_, i) => ({
    id: `student-${i + 1}`,
    studentId: `SV2024${majors[i % majors.length]}${String(i + 1).padStart(3, "0")}`,
    fullName: `${firstNames[i % firstNames.length]} ${lastNames[(i * 7) % lastNames.length]}`,
    email: `student${i + 1}@email.com`,
    major: majors[i % majors.length],
    admissionYear: 2024,
    gpa: parseFloat((2.5 + Math.random() * 1.5).toFixed(2)),
    failedCourses: Math.floor(Math.random() * 5),
    status: Math.random() > 0.1 ? "active" : "inactive",
  }));
};

const MOCK_STUDENTS = generateMockStudents(500);

export function StudentListTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const parentRef = useMemo(() => {
    const ref = document.getElementById("student-table-container");
    return ref as HTMLDivElement | null;
  }, []);

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const rowVirtualizer = useVirtualizer({
    count: filteredStudents.length,
    getScrollElement: () => parentRef,
    estimateSize: () => 64,
    overscan: 10,
  });

  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === filteredStudents.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredStudents.map((s) => s.id)));
    }
  }, [filteredStudents, selectedRows.size]);

  const handleSelectRow = useCallback((id: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-400";
    if (gpa >= 3.0) return "text-mint-400";
    if (gpa >= 2.5) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, MSSV hoặc email..."
            className="w-full pl-10 pr-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="inactive">Đã nghỉ</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white hover:bg-charcoal-700 transition-colors">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Table Info */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-charcoal-400">
          Hiển thị <span className="text-white font-medium">{filteredStudents.length}</span> sinh viên
          {selectedRows.size > 0 && (
            <span className="ml-2 text-violet-400">
              ({selectedRows.size} đã chọn)
            </span>
          )}
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-charcoal-800 rounded-t-xl text-sm font-medium text-charcoal-400">
        <div className="col-span-1">
          <input
            type="checkbox"
            checked={selectedRows.size === filteredStudents.length && filteredStudents.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-900 text-violet-600 focus:ring-violet-500"
          />
        </div>
        <div className="col-span-2">MSSV</div>
        <div className="col-span-3">Họ tên</div>
        <div className="col-span-2">Ngành</div>
        <div className="col-span-1">GPA</div>
        <div className="col-span-1">Môn chưa đạt</div>
        <div className="col-span-1">Thao tác</div>
      </div>

      {/* Virtualized Table Body */}
      <div
        id="student-table-container"
        className="h-[500px] overflow-auto rounded-b-xl bg-charcoal-900/50 border border-charcoal-700"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const student = filteredStudents[virtualRow.index];
            return (
              <div
                key={student.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={cn(
                  "grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-charcoal-800 hover:bg-charcoal-800/50 transition-colors",
                  selectedRows.has(student.id) && "bg-violet-600/10"
                )}
              >
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(student.id)}
                    onChange={() => handleSelectRow(student.id)}
                    className="w-4 h-4 rounded border-charcoal-600 bg-charcoal-900 text-violet-600 focus:ring-violet-500"
                  />
                </div>
                <div className="col-span-2 text-sm text-white">{student.studentId}</div>
                <div className="col-span-3 text-sm text-white">{student.fullName}</div>
                <div className="col-span-2 text-sm text-charcoal-400">{student.major}</div>
                <div className={cn("col-span-1 text-sm font-medium", getGpaColor(student.gpa))}>
                  {student.gpa.toFixed(2)}
                </div>
                <div className="col-span-1">
                  {student.failedCourses > 0 ? (
                    <span className="text-sm text-red-400">{student.failedCourses} môn</span>
                  ) : (
                    <span className="text-sm text-charcoal-500">-</span>
                  )}
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <button className="p-1.5 text-charcoal-400 hover:text-white hover:bg-charcoal-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-charcoal-400 hover:text-white hover:bg-charcoal-700 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}