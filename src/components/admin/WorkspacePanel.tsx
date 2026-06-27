"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { WorkspaceToolbar } from "./WorkspaceToolbar";
import { GradeInputForm } from "./forms/GradeInputForm";
import { ApplicationReviewForm } from "./forms/ApplicationReviewForm";
import { StudentListTable } from "./tables/StudentListTable";
import { ProfileForm } from "./forms/ProfileForm";

interface Task {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface WorkspacePanelProps {
  task: Task;
  onClose: () => void;
  onFormChange: (data: Record<string, unknown>) => void;
  context: Record<string, unknown>;
}

export function WorkspacePanel({
  task,
  onClose,
  onFormChange,
  context,
}: WorkspacePanelProps) {
  // Render task-specific content
  const renderTaskContent = () => {
    switch (task.type) {
      case "input-grades":
        return <GradeInputForm onChange={onFormChange} initialData={context} />;
      case "review-applications":
        return <ApplicationReviewForm onChange={onFormChange} initialData={context} />;
      case "manage-students":
        return <StudentListTable />;
      case "profile":
        return <ProfileForm onChange={onFormChange} initialData={context} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-charcoal-400">Tính năng đang được phát triển</p>
          </div>
        );
    }
  };

  return (
    <div className="workspace-panel">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="sandbox-workspace"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-charcoal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
              {task.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{task.label}</h2>
              <p className="text-sm text-charcoal-400">{task.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-700 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <WorkspaceToolbar taskType={task.type} />

        {/* Content Area */}
        <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          {renderTaskContent()}
        </div>
      </motion.div>
    </div>
  );
}