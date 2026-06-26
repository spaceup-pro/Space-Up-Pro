"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, Download, Upload, RefreshCw, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceToolbarProps {
  taskType: string;
}

interface ToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "primary";
}

export function WorkspaceToolbar({ taskType }: WorkspaceToolbarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const handleExport = useCallback(() => {
    // In production, this would export data to Excel/PDF
    console.log("Exporting data...");
  }, []);

  const handleImport = useCallback(() => {
    // In production, this would open file import dialog
    console.log("Opening import dialog...");
  }, []);

  const defaultActions: ToolbarAction[] = [
    {
      id: "refresh",
      label: "Làm mới",
      icon: <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />,
      onClick: handleRefresh,
    },
    {
      id: "export",
      label: "Xuất dữ liệu",
      icon: <Download className="w-4 h-4" />,
      onClick: handleExport,
    },
    {
      id: "import",
      label: "Nhập dữ liệu",
      icon: <Upload className="w-4 h-4" />,
      onClick: handleImport,
    },
  ];

  const gradeInputActions: ToolbarAction[] = [
    {
      id: "auto-calculate",
      label: "Tính điểm tự động",
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log("Auto calculate"),
    },
  ];

  const applicationReviewActions: ToolbarAction[] = [
    {
      id: "bulk-approve",
      label: "Phê duyệt hàng loạt",
      icon: <Save className="w-4 h-4" />,
      onClick: () => console.log("Bulk approve"),
      variant: "primary",
    },
  ];

  const getActions = () => {
    switch (taskType) {
      case "input-grades":
        return [...defaultActions, ...gradeInputActions];
      case "review-applications":
        return [...defaultActions, ...applicationReviewActions];
      default:
        return defaultActions;
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-charcoal-900/50 border-b border-charcoal-800">
      <div className="flex items-center gap-2">
        {getActions().map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              action.variant === "primary"
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : "bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300"
            )}
          >
            {action.icon}
            {action.label}
          </motion.button>
        ))}
      </div>
      <button className="p-2 text-charcoal-400 hover:text-white hover:bg-charcoal-700 rounded-lg transition-colors">
        <HelpCircle className="w-4 h-4" />
      </button>
    </div>
  );
}