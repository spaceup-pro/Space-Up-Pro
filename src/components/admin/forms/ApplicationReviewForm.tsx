"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Search, Loader2, User, Phone, Mail, MapPin } from "lucide-react";
import { cn, getApplicationStatusLabel, formatDate } from "@/lib/utils";
import { createIdempotencyKey, generateTaskId } from "@/lib/redis";

interface ApplicationReviewFormProps {
  onChange: (data: Record<string, unknown>) => void;
  initialData: Record<string, unknown>;
}

interface Application {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  highSchool: string;
  graduationYear: number;
  admissionBlock: string;
  firstChoiceMajor: string;
  totalScore: number;
  status: string;
  createdAt: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    fullName: "Nguyễn Thị Mai",
    dateOfBirth: "2006-05-15",
    gender: "female",
    phone: "0912345678",
    email: "mai.nguyen@email.com",
    address: "Quận 1, TP.HCM",
    highSchool: "THPT Chuyên Lê Hồng Phong",
    graduationYear: 2024,
    admissionBlock: "A",
    firstChoiceMajor: "CNTT",
    totalScore: 26.5,
    status: "pending",
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    fullName: "Trần Văn Bảo",
    dateOfBirth: "2006-08-20",
    gender: "male",
    phone: "0923456789",
    email: "bao.tran@email.com",
    address: "Quận Bình Thạnh, TP.HCM",
    highSchool: "THPT Nguyễn Thượng Hiền",
    graduationYear: 2024,
    admissionBlock: "D",
    firstChoiceMajor: "NNTA",
    totalScore: 24.0,
    status: "pending",
    createdAt: "2024-06-02",
  },
  {
    id: 3,
    fullName: "Lê Thị Hương",
    dateOfBirth: "2006-03-10",
    gender: "female",
    phone: "0934567890",
    email: "huong.le@email.com",
    address: "Quận 7, TP.HCM",
    highSchool: "THPT Mạc Đĩnh Chi",
    graduationYear: 2024,
    admissionBlock: "B",
    firstChoiceMajor: "KT",
    totalScore: 25.8,
    status: "pending",
    createdAt: "2024-06-03",
  },
  {
    id: 4,
    fullName: "Phạm Minh Quân",
    dateOfBirth: "2006-11-25",
    gender: "male",
    phone: "0945678901",
    email: "quan.pham@email.com",
    address: "Quận Gò Vấp, TP.HCM",
    highSchool: "THPT Phan Bội Châu",
    graduationYear: 2024,
    admissionBlock: "A1",
    firstChoiceMajor: "QTKD",
    totalScore: 23.2,
    status: "pending",
    createdAt: "2024-06-04",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
  waitlisted: "bg-cobalt-500/20 text-cobalt-400",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  approved: <CheckCircle className="w-4 h-4" />,
  rejected: <XCircle className="w-4 h-4" />,
  waitlisted: <Clock className="w-4 h-4" />,
};

export function ApplicationReviewForm({ onChange, initialData }: ApplicationReviewFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const [currentSessionId] = useState(() => generateTaskId());

  const filteredApps = mockApplications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = useCallback(async (appId: number) => {
    setIsProcessing(appId);
    const idempotencyKey = createIdempotencyKey(currentSessionId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onChange({ action: "approve", applicationId: appId, timestamp: new Date() });
    } catch (error) {
      console.error("Failed to approve:", error);
    } finally {
      setIsProcessing(null);
    }
  }, [currentSessionId, onChange]);

  const handleReject = useCallback(async (appId: number) => {
    setIsProcessing(appId);
    const idempotencyKey = createIdempotencyKey(currentSessionId);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onChange({ action: "reject", applicationId: appId, timestamp: new Date() });
    } catch (error) {
      console.error("Failed to reject:", error);
    } finally {
      setIsProcessing(null);
    }
  }, [currentSessionId, onChange]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên, SĐT hoặc email..."
          className="w-full pl-10 pr-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-lg text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application List */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <h4 className="text-sm font-medium text-charcoal-400 uppercase tracking-wider">
            Danh sách hồ sơ ({filteredApps.length})
          </h4>
          {filteredApps.map((app) => (
            <motion.button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full p-4 text-left rounded-xl border transition-all",
                selectedApp?.id === app.id
                  ? "bg-violet-600/20 border-violet-500"
                  : "bg-charcoal-800/50 border-charcoal-700 hover:border-charcoal-600"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{app.fullName}</span>
                <span className={cn("text-xs px-2 py-1 rounded-full flex items-center gap-1", statusColors[app.status])}>
                  {statusIcons[app.status]}
                  {getApplicationStatusLabel(app.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-400">{app.firstChoiceMajor}</span>
                <span className="text-sm text-charcoal-500">Điểm: {app.totalScore}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Application Detail */}
        <div className="lg:col-span-2">
          {selectedApp ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-charcoal-800/50 border border-charcoal-700 rounded-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Chi tiết hồ sơ</h3>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1", statusColors[selectedApp.status])}>
                  {statusIcons[selectedApp.status]}
                  {getApplicationStatusLabel(selectedApp.status)}
                </span>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <User className="w-4 h-4" />
                    <span>{selectedApp.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <Clock className="w-4 h-4" />
                    <span>Ngày sinh: {formatDate(selectedApp.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <span className="w-4 h-4" />
                    <span>Giới tính: {selectedApp.gender === "male" ? "Nam" : "Nữ"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <Phone className="w-4 h-4" />
                    <span>{selectedApp.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <Mail className="w-4 h-4" />
                    <span>{selectedApp.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-charcoal-400">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedApp.address}</span>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="p-4 bg-charcoal-900/50 rounded-lg mb-6">
                <h4 className="text-sm font-medium text-charcoal-400 uppercase tracking-wider mb-3">
                  Thông tin học tập
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-charcoal-500">Trường THPT</p>
                    <p className="text-white">{selectedApp.highSchool}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-500">Tốt nghiệp</p>
                    <p className="text-white">{selectedApp.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-500">Khối thi</p>
                    <p className="text-white">Khối {selectedApp.admissionBlock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-500">Tổng điểm</p>
                    <p className="text-white font-semibold">{selectedApp.totalScore}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  disabled={isProcessing === selectedApp.id || selectedApp.status !== "pending"}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 disabled:bg-charcoal-700 disabled:text-charcoal-500 text-white rounded-lg font-medium transition-all"
                >
                  {isProcessing === selectedApp.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Phê duyệt
                </button>
                <button
                  onClick={() => handleReject(selectedApp.id)}
                  disabled={isProcessing === selectedApp.id || selectedApp.status !== "pending"}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-500 disabled:bg-charcoal-700 disabled:text-charcoal-500 text-white rounded-lg font-medium transition-all"
                >
                  {isProcessing === selectedApp.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  Từ chối
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-charcoal-500">
              Chọn một hồ sơ để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}