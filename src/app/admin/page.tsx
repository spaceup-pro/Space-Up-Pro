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
} from "lucide-react";

// Task types for admin workspace
export type TaskType =
  | "review-applications"
  | "input-grades"
  | "manage-students"
  | "view-schedules"
  | "settings";

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
];

export default function AdminDashboardPage() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceContext, setWorkspaceContext] = useState<Record<string, unknown>>({});

  // Handle task selection
  const handleTaskSelect = useCallback((task: Task) => {
    setActiveTask(task);
    setIsWorkspaceOpen(true);
  }, []);

  // Close workspace
  const handleCloseWorkspace = useCallback(() => {
    setIsWorkspaceOpen(false);
  }, []);

  // Handle form data changes with debounce
  const handleFormChange = useCallback((data: Record<string, unknown>) => {
    setWorkspaceContext(data);
    // This would be debounced and saved to Redis in production
  }, []);

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
              Chọn một tác vụ để bắt đầu làm việc
            </p>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminTasks.map((task, index) => (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleTaskSelect(task)}
                className="group p-6 text-left rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-violet-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
                  {task.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {task.label}
                </h3>
                <p className="text-sm text-charcoal-400">{task.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace Panel (Sandbox) */}
      <AnimatePresence>
        {isWorkspaceOpen && activeTask && (
          <WorkspacePanel
            task={activeTask}
            onClose={handleCloseWorkspace}
            onFormChange={handleFormChange}
            context={workspaceContext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}