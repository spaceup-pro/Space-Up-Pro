"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  activeTaskId?: string;
}

export function AdminSidebar({
  tasks,
  onTaskSelect,
  activeTaskId,
}: AdminSidebarProps) {
  return (
    <aside className="w-64 h-screen bg-charcoal-900 border-r border-charcoal-800 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-charcoal-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-lg font-bold text-white">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {tasks.map((task) => (
            <motion.button
              key={task.id}
              onClick={() => onTaskSelect(task)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTaskId === task.id
                  ? "bg-violet-600/20 text-violet-400"
                  : "text-charcoal-400 hover:text-white hover:bg-charcoal-800"
              )}
            >
              <span className={cn(
                "transition-colors",
                activeTaskId === task.id ? "text-violet-400" : "text-charcoal-500"
              )}>
                {task.icon}
              </span>
              {task.label}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-charcoal-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-400 hover:text-white hover:bg-charcoal-800 transition-all"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-400 hover:text-white hover:bg-charcoal-800 transition-all">
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}