"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
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
  { month: "T1", applications: 45 },
  { month: "T2", applications: 52 },
  { month: "T3", applications: 78 },
  { month: "T4", applications: 65 },
  { month: "T5", applications: 89 },
  { month: "T6", applications: 102 },
];

// Dữ liệu biểu đồ sinh viên theo ngành
const majorData = [
  { major: "CNTT", students: 320 },
  { major: "Kinh tế", students: 280 },
  { major: "Kỹ thuật", students: 245 },
  { major: "Y dược", students: 180 },
  { major: "Luật", students: 150 },
];

// Dữ liệu trạng thái đơn
const statusData = [
  { status: "Đã duyệt", count: 245, color: "bg-green-500" },
  { status: "Chờ duyệt", count: 42, color: "bg-yellow-500" },
  { status: "Từ chối", count: 18, color: "bg-red-500" },
];

export default function AdminDashboardPage() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceContext, setWorkspaceContext] = useState<Record<string, unknown>>({});

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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Bảng Điều Khiển Quản Trị
            </h1>
            <p className="text-charcoal-400">
              Tổng quan về hệ thống và số liệu thống kê
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800"
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
              <h3 className="text-lg font-semibold text-white mb-6">Đơn tuyển sinh theo tháng</h3>
              <div className="flex items-end justify-between gap-2 h-48">
                {admissionData.map((item) => (
                  <div key={item.month} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full max-w-[40px] bg-gradient-to-t from-violet-600 to-pink-500 rounded-t-md transition-all hover:from-violet-500 hover:to-pink-400"
                        style={{ height: `${(item.applications / maxApplications) * 100}%` }}
                      />
                    </div>
                    <span className="text-charcoal-500 text-xs mt-2">{item.month}</span>
                    <span className="text-white text-xs font-medium">{item.applications}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Biểu đồ sinh viên theo ngành */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800"
            >
              <h3 className="text-lg font-semibold text-white mb-6">Sinh viên theo ngành</h3>
              <div className="space-y-4">
                {majorData.map((item) => (
                  <div key={item.major} className="flex items-center gap-4">
                    <span className="w-16 text-charcoal-400 text-sm">{item.major}</span>
                    <div className="flex-1 h-6 bg-charcoal-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 to-pink-500 rounded-full"
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
            <h3 className="text-lg font-semibold text-white mb-6">Trạng thái đơn tuyển sinh</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {statusData.map((item) => (
                <div key={item.status} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-charcoal-400">{item.status}</span>
                  <span className="text-white font-medium ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
            {/* Thanh tổng */}
            <div className="flex h-4 rounded-full overflow-hidden">
              {statusData.map((item) => (
                <div
                  key={item.status}
                  className={item.color}
                  style={{ width: `${(item.count / totalStatus) * 100}%` }}
                />
              ))}
            </div>
            <p className="text-charcoal-500 text-sm mt-2 text-center">Tổng: {totalStatus} đơn</p>
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
    </div>
  );
}