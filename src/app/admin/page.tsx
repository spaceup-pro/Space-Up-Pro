"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkspacePanel } from "@/components/admin/WorkspacePanel";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Users,
  GraduationCap,
  FileText,
  Calendar,
  Settings,
  User,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  ChevronDown,
  Eye,
  Info,
} from "lucide-react";

// Task types for admin workspace
export type TaskType =
  | "review-applications"
  | "input-grades"
  | "manage-students"
  | "view-schedules"
  | "settings"
  | "profile";

interface Task {
  id: string;
  type: TaskType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const adminTasks: Task[] = [
  {
    id: "review-applications",
    type: "review-applications",
    label: "Phê duyệt đơn",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Duyệt và xử lý đơn tuyển sinh",
  },
  {
    id: "input-grades",
    type: "input-grades",
    label: "Nhập điểm",
    icon: <FileText className="w-5 h-5" />,
    description: "Nhập điểm học phần cho sinh viên",
  },
  {
    id: "manage-students",
    type: "manage-students",
    label: "Quản lý sinh viên",
    icon: <Users className="w-5 h-5" />,
    description: "Quản lý thông tin sinh viên",
  },
  {
    id: "view-schedules",
    type: "view-schedules",
    label: "Xem lịch học",
    icon: <Calendar className="w-5 h-5" />,
    description: "Xem và quản lý lịch học",
  },
  {
    id: "settings",
    type: "settings",
    label: "Cài đặt",
    icon: <Settings className="w-5 h-5" />,
    description: "Cấu hình hệ thống",
  },
  {
    id: "profile",
    type: "profile",
    label: "Hồ sơ cá nhân",
    icon: <User className="w-5 h-5" />,
    description: "Quản lý thông tin và bảo mật tài khoản",
  },
];

// Thống kê mẫu
const stats = [
  { label: "Tổng sinh viên", value: "1,248", change: "+12%", up: true, icon: Users },
  { label: "Đơn tuyển sinh", value: "356", change: "+8%", up: true, icon: GraduationCap },
  { label: "Đơn chờ duyệt", value: "42", change: "-5%", up: false, icon: Clock },
  { label: "Đã hoàn thành", value: "314", change: "+15%", up: true, icon: CheckCircle },
];

// Dữ liệu biểu đồ tuyển sinh theo tháng
const admissionData = [
  { month: "T1", applications: 45, approved: 40, pending: 5 },
  { month: "T2", applications: 52, approved: 45, pending: 7 },
  { month: "T3", applications: 78, approved: 70, pending: 8 },
  { month: "T4", applications: 65, approved: 55, pending: 10 },
  { month: "T5", applications: 89, approved: 75, pending: 14 },
  { month: "T6", applications: 102, approved: 85, pending: 17 },
];

// Dữ liệu biểu đồ sinh viên theo ngành
const majorData = [
  { major: "CNTT", students: 320, color: "from-violet-600 to-violet-500" },
  { major: "Kinh tế", students: 280, color: "from-pink-600 to-pink-500" },
  { major: "Kỹ thuật", students: 245, color: "from-blue-600 to-blue-500" },
  { major: "Y dược", students: 180, color: "from-green-600 to-green-500" },
  { major: "Luật", students: 150, color: "from-orange-600 to-orange-500" },
];

// Dữ liệu trạng thái đơn
const statusData = [
  { status: "Đã duyệt", count: 245, color: "bg-green-500", label: "Đơn đã được duyệt" },
  { status: "Chờ duyệt", count: 42, color: "bg-yellow-500", label: "Đơn đang chờ xử lý" },
  { status: "Từ chối", count: 18, color: "bg-red-500", label: "Đơn bị từ chối" },
];

export default function AdminDashboardPage() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceContext, setWorkspaceContext] = useState<Record<string, unknown>>({});

  // Trạng thái tương tác
  const [timeRange, setTimeRange] = useState("6 tháng");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredMajor, setHoveredMajor] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<{type: string; data: any} | null>(null);

  const handleTaskSelect = useCallback((task: Task) => {
    setActiveTask(task);
    setIsWorkspaceOpen(true);
  }, []);

  const handleCloseWorkspace = useCallback(() => {
    setIsWorkspaceOpen(false);
  }, []);

  const handleFormChange = useCallback((data: Record<string, unknown>) => {
    setWorkspaceContext(data);
  }, []);

  // Xử lý làm mới dữ liệu
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  // Xử lý hiển thị chi tiết
  const handleBarClick = useCallback((month: string, data: any) => {
    setShowDetailModal({ type: 'admission', data: { month, ...data } });
  }, []);

  const handleMajorClick = useCallback((major: string, data: any) => {
    setShowDetailModal({ type: 'major', data: { major, ...data } });
  }, []);

  // Tính phần trăm cho biểu đồ
  const maxApplications = Math.max(...admissionData.map(d => d.applications));
  const maxStudents = Math.max(...majorData.map(d => d.students));
  const totalStatus = statusData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="min-h-screen bg-charcoal-950 flex">
      {/* Sidebar */}
      <AdminSidebar tasks={adminTasks} onTaskSelect={handleTaskSelect} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bảng Điều Khiển Quản Trị
              </h1>
              <p className="text-charcoal-400">
                Tổng quan về hệ thống và số liệu thống kê
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-charcoal-800 border border-charcoal-700 text-white px-4 py-2 pr-10 rounded-lg text-sm cursor-pointer hover:border-violet-500 transition-colors"
                >
                  <option value="3 tháng">3 tháng</option>
                  <option value="6 tháng">6 tháng</option>
                  <option value="1 năm">1 năm</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-charcoal-800 border border-charcoal-700 text-white rounded-lg text-sm hover:border-violet-500 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Làm mới
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-500 transition-colors">
                <Download className="w-4 h-4" />
                Xuất Excel
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-violet-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-charcoal-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Biểu đồ tuyển sinh theo tháng */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Đơn tuyển sinh theo tháng</h3>
                <button
                  onClick={() => setShowDetailModal({ type: 'admission', data: admissionData })}
                  className="text-charcoal-400 hover:text-white transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {admissionData.map((item) => (
                  <div
                    key={item.month}
                    className="flex flex-col items-center flex-1 cursor-pointer group"
                    onClick={() => handleBarClick(item.month, item)}
                  >
                    <div className="w-full flex flex-col items-center justify-end h-full relative">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-xs whitespace-nowrap z-10">
                        <p className="text-white font-medium">{item.month}</p>
                        <p className="text-violet-400">Tổng: {item.applications}</p>
                        <p className="text-green-400">Đã duyệt: {item.approved}</p>
                        <p className="text-yellow-400">Chờ: {item.pending}</p>
                      </div>
                      <div
                        className="w-full max-w-[40px] bg-gradient-to-t from-violet-600 to-pink-500 rounded-t-md transition-all hover:from-violet-500 hover:to-pink-400 hover:scale-105"
                        style={{ height: `${(item.applications / maxApplications) * 100}%` }}
                      />
                    </div>
                    <span className="text-charcoal-500 text-xs mt-2">{item.month}</span>
                    <span className="text-white text-xs font-medium">{item.applications}</span>
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-violet-600 rounded" />
                  <span className="text-charcoal-400">Tổng đơn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-charcoal-400">Đã duyệt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span className="text-charcoal-400">Chờ duyệt</span>
                </div>
              </div>
            </motion.div>

            {/* Biểu đồ sinh viên theo ngành */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Sinh viên theo ngành</h3>
                <button
                  onClick={() => setShowDetailModal({ type: 'major', data: majorData })}
                  className="text-charcoal-400 hover:text-white transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {majorData.map((item) => (
                  <div
                    key={item.major}
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => handleMajorClick(item.major, item)}
                  >
                    <span className="w-16 text-charcoal-400 text-sm">{item.major}</span>
                    <div className="flex-1 h-6 bg-charcoal-800 rounded-full overflow-hidden relative">
                      {/* Tooltip */}
                      <div className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-xs whitespace-nowrap z-10">
                        <p className="text-white font-medium">{item.major}</p>
                        <p className="text-violet-400">Số sinh viên: {item.students}</p>
                        <p className="text-charcoal-400">Tỷ lệ: {Math.round(item.students / 1248 * 100)}%</p>
                      </div>
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all group-hover:opacity-80`}
                        style={{ width: `${(item.students / maxStudents) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium w-12 text-right">{item.students}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Trạng thái đơn tuyển sinh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Trạng thái đơn tuyển sinh</h3>
              <button
                onClick={() => setShowDetailModal({ type: 'status', data: statusData })}
                className="text-charcoal-400 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {statusData.map((item, index) => (
                <motion.div
                  key={item.status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-charcoal-800/50 rounded-lg cursor-pointer hover:bg-charcoal-800 transition-colors"
                  onClick={() => setShowDetailModal({ type: 'status', data: item })}
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-charcoal-400 text-sm">{item.status}</p>
                    <p className="text-white font-medium">{item.count}</p>
                  </div>
                  <span className="ml-auto text-charcoal-500 text-sm">
                    {Math.round(item.count / totalStatus * 100)}%
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Thanh tổng */}
            <div className="flex h-4 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowDetailModal({ type: 'status', data: statusData })}>
              {statusData.map((item) => (
                <div
                  key={item.status}
                  className={`${item.color} transition-all hover:opacity-80`}
                  style={{ width: `${(item.count / totalStatus) * 100}%` }}
                />
              ))}
            </div>
            <p className="text-charcoal-500 text-sm mt-2 text-center">Tổng: {totalStatus} đơn - Click để xem chi tiết</p>
          </motion.div>
        </div>
      </div>

      {/* Workspace Panel (Sandbox) */}
      {isWorkspaceOpen && activeTask && (
        <WorkspacePanel
          task={activeTask}
          onClose={handleCloseWorkspace}
          onFormChange={handleFormChange}
          context={workspaceContext}
        />
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-charcoal-900 border border-charcoal-700 rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {showDetailModal.type === 'admission' && 'Chi tiết tuyển sinh'}
                  {showDetailModal.type === 'major' && 'Chi tiết sinh viên theo ngành'}
                  {showDetailModal.type === 'status' && 'Chi tiết trạng thái'}
                </h3>
                <button
                  onClick={() => setShowDetailModal(null)}
                  className="text-charcoal-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Nội dung chi tiết */}
              <div className="space-y-3">
                {showDetailModal.type === 'admission' && Array.isArray(showDetailModal.data) && (
                  <div className="space-y-2">
                    <p className="text-charcoal-400 text-sm">Dữ liệu 6 tháng gần nhất:</p>
                    {showDetailModal.data.map((item: any) => (
                      <div key={item.month} className="flex justify-between p-3 bg-charcoal-800 rounded-lg">
                        <span className="text-white">{item.month}</span>
                        <div className="text-right">
                          <span className="text-violet-400">{item.applications} đơn</span>
                          <span className="text-charcoal-500 text-sm ml-2">
                            (Đã duyệt: {item.approved}, Chờ: {item.pending})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showDetailModal.type === 'major' && Array.isArray(showDetailModal.data) && (
                  <div className="space-y-2">
                    <p className="text-charcoal-400 text-sm">Phân bố sinh viên theo ngành:</p>
                    {showDetailModal.data.map((item: any) => (
                      <div key={item.major} className="flex justify-between p-3 bg-charcoal-800 rounded-lg">
                        <span className="text-white">{item.major}</span>
                        <div className="text-right">
                          <span className="text-violet-400">{item.students} sinh viên</span>
                          <span className="text-charcoal-500 text-sm ml-2">
                            ({Math.round(item.students / 1248 * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showDetailModal.type === 'status' && !Array.isArray(showDetailModal.data) && (
                  <div className="space-y-2">
                    <p className="text-charcoal-400 text-sm">{showDetailModal.data.label}</p>
                    <div className="flex justify-between p-3 bg-charcoal-800 rounded-lg">
                      <span className="text-white">{showDetailModal.data.status}</span>
                      <span className="text-violet-400">{showDetailModal.data.count} đơn</span>
                    </div>
                    <p className="text-charcoal-500 text-sm">
                      Tỷ lệ: {Math.round(showDetailModal.data.count / totalStatus * 100)}% trên tổng {totalStatus} đơn
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDetailModal(null)}
                  className="flex-1 py-2 px-4 bg-charcoal-800 text-white rounded-lg hover:bg-charcoal-700 transition-colors"
                >
                  Đóng
                </button>
                <button className="flex-1 py-2 px-4 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Tải xuống
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}