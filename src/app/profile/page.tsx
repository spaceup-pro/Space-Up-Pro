"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Shield, Key, MapPin, Calendar,
  GraduationCap, Save, Loader2, CheckCircle, Camera,
  Eye, EyeOff, Bell, Settings, LogOut, FileText,
  Clock, Upload, Download, Trash2, Edit, Plus,
  CheckSquare, XSquare, AlertCircle, Award,
  BookOpen, ClipboardList, History, FolderOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";

// Demo application data
const mockApplications = [
  {
    id: "1",
    major: "Khoa học Máy tính",
    year: "2024",
    status: "admitted",
    submittedAt: "2024-03-15",
    resultDate: "2024-04-20",
    score: 85.5,
    priority: 1,
  },
  {
    id: "2",
    major: "Kỹ thuật Phần mềm",
    year: "2024",
    status: "pending",
    submittedAt: "2024-03-20",
    resultDate: null,
    score: null,
    priority: 2,
  },
  {
    id: "3",
    major: "Trí tuệ Nhân tạo",
    year: "2024",
    status: "rejected",
    submittedAt: "2024-03-10",
    resultDate: "2024-04-25",
    score: 72.0,
    priority: 3,
  },
];

// Demo activity history
const mockActivities = [
  { id: "1", action: "Đăng nhập", time: "2024-06-29 09:30", device: "Chrome - Windows" },
  { id: "2", action: "Cập nhật thông tin cá nhân", time: "2024-06-28 14:20", device: "Chrome - Windows" },
  { id: "3", action: "Nộp hồ sơ xét tuyển", time: "2024-06-27 10:15", device: "Safari - macOS" },
  { id: "4", action: "Đổi mật khẩu", time: "2024-06-25 16:45", device: "Chrome - Windows" },
  { id: "5", action: "Đăng ký tài khoản", time: "2024-06-20 08:00", device: "Chrome - Windows" },
];

// Demo documents
const mockDocuments = [
  { id: "1", name: "CV_NguyenVanA.pdf", type: "cv", size: "2.4 MB", uploadedAt: "2024-06-20" },
  { id: "2", name: "Bang_Diem_12.pdf", type: "transcript", size: "1.8 MB", uploadedAt: "2024-06-15" },
  { id: "3", name: "HoChieu.pdf", type: "identity", size: "0.5 MB", uploadedAt: "2024-06-15" },
];

// Demo grades
const mockGrades = [
  { id: "1", subject: "Toán cao cấp", credit: 4, grade: "A", score: 9.0 },
  { id: "2", subject: "Lập trình cơ bản", credit: 3, grade: "A", score: 8.5 },
  { id: "3", subject: "Tiếng Anh 1", credit: 3, grade: "B+", score: 7.5 },
  { id: "4", subject: "Nhập môn CNTT", credit: 2, grade: "A", score: 8.8 },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"profile" | "applications" | "documents" | "grades" | "activity" | "security" | "notifications">("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [applications, setApplications] = useState(mockApplications);
  const [documents, setDocuments] = useState(mockDocuments);

  const [formData, setFormData] = useState({
    name: user?.name || "Người dùng",
    email: user?.email || "",
    phone: "0912345678",
    dateOfBirth: "2000-01-15",
    address: "Hà Nội, Việt Nam",
    studentId: "SV2024001",
    major: "Khoa học Máy tính",
    course: "2024-2028",
    cccd: "012345678901",
    nationality: "Việt Nam",
    gender: "Nam",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    admissionAlerts: true,
    newsAlerts: false,
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePasswordChange = useCallback((field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNotificationChange = useCallback((field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handleSavePassword = useCallback(async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setIsSaving(false);
    }
  }, [passwordData]);

  const handleDeleteDocument = useCallback((id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "admitted":
        return { label: "Đã trúng tuyển", class: "bg-green-500/20 text-green-400" };
      case "pending":
        return { label: "Đang xét tuyển", class: "bg-yellow-500/20 text-yellow-400" };
      case "rejected":
        return { label: "Không trúng tuyển", class: "bg-red-500/20 text-red-400" };
      default:
        return { label: status, class: "bg-charcoal-500/20 text-charcoal-400" };
    }
  };

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [logout, router]);

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "superadmin": return "Quản trị viên cao cấp";
      case "admin": return "Quản trị viên";
      case "student": return "Sinh viên";
      case "applicant": return "Ứng viên";
      default: return "Người dùng";
    }
  };

  const getRoleBadgeClass = (role?: string) => {
    switch (role) {
      case "superadmin": return "bg-red-500/20 text-red-400";
      case "admin": return "bg-violet-500/20 text-violet-400";
      case "student": return "bg-green-500/20 text-green-400";
      case "applicant": return "bg-blue-500/20 text-blue-400";
      default: return "bg-charcoal-500/20 text-charcoal-400";
    }
  };

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "applications", label: "Đơn ứng tuyển", icon: ClipboardList },
    { id: "documents", label: "Tài liệu", icon: FolderOpen },
    { id: "grades", label: "Kết quả học tập", icon: BookOpen },
    { id: "activity", label: "Lịch sử hoạt động", icon: History },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "notifications", label: "Thông báo", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Hồ sơ cá nhân</h1>
          <p className="text-charcoal-400">Quản lý thông tin, hồ sơ ứng tuyển và hoạt động của bạn</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white hover:bg-violet-500 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-white mt-4">{formData.name}</h3>
                <p className="text-charcoal-400 text-sm">{formData.email}</p>
                <span className={cn("inline-block mt-2 px-3 py-1 text-xs rounded-full", getRoleBadgeClass(user?.role))}>
                  {getRoleLabel(user?.role)}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-charcoal-950 rounded-xl hover:bg-charcoal-800/50 transition-colors cursor-pointer group">
                  <span className="text-charcoal-400 text-sm group-hover:text-charcoal-300 transition-colors">Đơn đã nộp</span>
                  <span className="text-white font-semibold group-hover:text-violet-400 transition-colors">{applications.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-charcoal-950 rounded-xl hover:bg-charcoal-800/50 transition-colors cursor-pointer group">
                  <span className="text-charcoal-400 text-sm group-hover:text-charcoal-300 transition-colors">Đã trúng tuyển</span>
                  <span className="text-green-400 font-semibold group-hover:text-green-300 transition-colors">{applications.filter(a => a.status === "admitted").length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-charcoal-950 rounded-xl hover:bg-charcoal-800/50 transition-colors cursor-pointer group">
                  <span className="text-charcoal-400 text-sm group-hover:text-charcoal-300 transition-colors">Đang chờ</span>
                  <span className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors">{applications.filter(a => a.status === "pending").length}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 p-1 bg-charcoal-900 rounded-xl border border-charcoal-800 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-violet-600 text-white"
                      : "text-charcoal-400 hover:text-white hover:bg-charcoal-800"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Basic Info */}
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-violet-400" />
                      Thông tin cơ bản
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Họ và tên</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Ngày sinh</label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Giới tính</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Quốc tịch</label>
                        <input
                          type="text"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange("nationality", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">
                          <MapPin className="w-4 h-4 inline-block mr-1" /> Địa chỉ
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Số CCCD/CMND</label>
                        <input
                          type="text"
                          value={formData.cccd}
                          onChange={(e) => handleInputChange("cccd", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Info */}
                  {(user?.role === "student" || user?.role === "applicant") && (
                    <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-pink-400" />
                        Thông tin học tập
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-400 mb-2">Mã sinh viên</label>
                          <input
                            type="text"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange("studentId", e.target.value)}
                            className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-charcoal-400 mb-2">Ngành học</label>
                          <input
                            type="text"
                            value={formData.major}
                            onChange={(e) => handleInputChange("major", e.target.value)}
                            className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-charcoal-400 mb-2">Khóa học</label>
                          <input
                            type="text"
                            value={formData.course}
                            onChange={(e) => handleInputChange("course", e.target.value)}
                            className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                        saveSuccess ? "bg-green-600 text-white" : "bg-violet-600 hover:bg-violet-500 text-white"
                      )}
                    >
                      {isSaving ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
                      ) : saveSuccess ? (
                        <><CheckCircle className="w-4 h-4" /> Đã lưu!</>
                      ) : (
                        <><Save className="w-4 h-4" /> Lưu thay đổi</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Applications Tab */}
              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-violet-400" />
                        Hồ sơ ứng tuyển
                      </h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all">
                        <Plus className="w-4 h-4" />
                        Nộp hồ sơ mới
                      </button>
                    </div>

                    <div className="space-y-4">
                      {applications.map((app) => {
                        const status = getStatusBadge(app.status);
                        return (
                          <div key={app.id} className="p-4 bg-charcoal-950 rounded-xl border border-charcoal-800 hover:border-violet-500/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-white font-semibold">{app.major}</h4>
                                  <span className={cn("px-2 py-0.5 text-xs rounded-full", status.class)}>
                                    {status.label}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-charcoal-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Năm: {app.year}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Ngày nộp: {app.submittedAt}
                                  </span>
                                  {app.resultDate && (
                                    <span className="flex items-center gap-1">
                                      <Award className="w-4 h-4" />
                                      Ngày có kết quả: {app.resultDate}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {app.score && (
                                  <div className="text-right">
                                    <p className="text-2xl font-bold text-violet-400">{app.score}</p>
                                    <p className="text-xs text-charcoal-400">Điểm xét tuyển</p>
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <button className="p-2 text-charcoal-400 hover:text-white hover:bg-charcoal-800 rounded-lg transition-all">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 text-charcoal-400 hover:text-white hover:bg-charcoal-800 rounded-lg transition-all">
                                    <FileText className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Application Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckSquare className="w-5 h-5 text-green-400" />
                        <span className="text-charcoal-400 text-sm">Tổng đơn</span>
                      </div>
                      <p className="text-3xl font-bold text-white">{applications.length}</p>
                    </div>
                    <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-violet-400" />
                        <span className="text-charcoal-400 text-sm">Đã trúng tuyển</span>
                      </div>
                      <p className="text-3xl font-bold text-green-400">{applications.filter(a => a.status === "admitted").length}</p>
                    </div>
                    <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <span className="text-charcoal-400 text-sm">Đang chờ</span>
                      </div>
                      <p className="text-3xl font-bold text-yellow-400">{applications.filter(a => a.status === "pending").length}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Documents Tab */}
              {activeTab === "documents" && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-violet-400" />
                        Tài liệu cá nhân
                      </h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all">
                        <Upload className="w-4 h-4" />
                        Tải lên
                      </button>
                    </div>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-charcoal-700 rounded-xl p-8 text-center mb-6 hover:border-violet-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-charcoal-500" />
                      <p className="text-white font-medium mb-1">Kéo thả file vào đây hoặc click để chọn</p>
                      <p className="text-charcoal-400 text-sm">Hỗ trợ: PDF, JPG, PNG (tối đa 10MB)</p>
                    </div>

                    {/* Document List */}
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-charcoal-950 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{doc.name}</h4>
                              <p className="text-sm text-charcoal-400">{doc.type === "cv" ? "CV" : doc.type === "transcript" ? "Bảng điểm" : "Giấy tờ"} • {doc.size} • {doc.uploadedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-charcoal-400 hover:text-white hover:bg-charcoal-800 rounded-lg transition-all">
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="p-2 text-charcoal-400 hover:text-red-400 hover:bg-charcoal-800 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grades Tab */}
              {activeTab === "grades" && (
                <motion.div
                  key="grades"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        Kết quả học tập
                      </h3>
                      <select className="px-4 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500">
                        <option>Học kỳ 1 - 2024</option>
                        <option>Học kỳ 2 - 2024</option>
                      </select>
                    </div>

                    {/* GPA Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-charcoal-950 rounded-xl p-4 text-center">
                        <p className="text-charcoal-400 text-sm mb-1">Điểm trung bình tích lũy</p>
                        <p className="text-3xl font-bold text-violet-400">8.45</p>
                      </div>
                      <div className="bg-charcoal-950 rounded-xl p-4 text-center">
                        <p className="text-charcoal-400 text-sm mb-1">Tổng tín chỉ</p>
                        <p className="text-3xl font-bold text-white">12</p>
                      </div>
                      <div className="bg-charcoal-950 rounded-xl p-4 text-center">
                        <p className="text-charcoal-400 text-sm mb-1">Xếp loại</p>
                        <p className="text-3xl font-bold text-green-400">Giỏi</p>
                      </div>
                    </div>

                    {/* Grades Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-charcoal-800">
                            <th className="text-left py-3 px-4 text-charcoal-400 font-medium">Môn học</th>
                            <th className="text-center py-3 px-4 text-charcoal-400 font-medium">Tín chỉ</th>
                            <th className="text-center py-3 px-4 text-charcoal-400 font-medium">Điểm</th>
                            <th className="text-center py-3 px-4 text-charcoal-400 font-medium">Xếp loại</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockGrades.map((grade) => (
                            <tr key={grade.id} className="border-b border-charcoal-800/50">
                              <td className="py-3 px-4 text-white">{grade.subject}</td>
                              <td className="py-3 px-4 text-center text-charcoal-300">{grade.credit}</td>
                              <td className="py-3 px-4 text-center text-white font-medium">{grade.score}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={cn(
                                  "px-2 py-1 text-xs rounded-full",
                                  grade.grade.startsWith("A") ? "bg-green-500/20 text-green-400" :
                                  grade.grade.startsWith("B") ? "bg-blue-500/20 text-blue-400" :
                                  "bg-yellow-500/20 text-yellow-400"
                                )}>
                                  {grade.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Activity Tab */}
              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                      <History className="w-5 h-5 text-violet-400" />
                      Lịch sử hoạt động
                    </h3>

                    <div className="space-y-4">
                      {mockActivities.map((activity, index) => (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-violet-600 rounded-full" />
                            {index < mockActivities.length - 1 && (
                              <div className="w-0.5 h-full bg-charcoal-800 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <p className="text-white font-medium">{activity.action}</p>
                            <p className="text-sm text-charcoal-400">{activity.time}</p>
                            <p className="text-xs text-charcoal-500">{activity.device}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 py-3 text-charcoal-400 hover:text-white text-sm transition-colors">
                      Xem thêm lịch sử
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                      <Key className="w-5 h-5 text-violet-400" />
                      Đổi mật khẩu
                    </h3>

                    <div className="space-y-6 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Mật khẩu hiện tại</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                            className="w-full px-4 py-3 pr-12 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                            placeholder="Nhập mật khẩu hiện tại"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-white transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Mật khẩu mới</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                            className="w-full px-4 py-3 pr-12 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                            placeholder="Nhập mật khẩu mới"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-white transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-400 mb-2">Xác nhận mật khẩu</label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                          className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-all"
                          placeholder="Xác nhận mật khẩu mới"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleSavePassword}
                        disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                          saveSuccess ? "bg-green-600 text-white" : "bg-violet-600 hover:bg-violet-500 text-white disabled:bg-charcoal-700 disabled:text-charcoal-500"
                        )}
                      >
                        {isSaving ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
                        ) : saveSuccess ? (
                          <><CheckCircle className="w-4 h-4" /> Đã đổi mật khẩu!</>
                        ) : (
                          <><Key className="w-4 h-4" /> Đổi mật khẩu</>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Mẹo bảo mật
                    </h3>
                    <ul className="space-y-3 text-charcoal-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Sử dụng mật khẩu có ít nhất 8 ký tự</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Không sử dụng cùng mật khẩu cho nhiều tài khoản</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-800">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-violet-400" />
                      Cài đặt thông báo
                    </h3>

                    <div className="space-y-4">
                      {[
                        { key: "emailNotifications", title: "Thông báo qua Email", desc: "Nhận thông báo qua địa chỉ email của bạn" },
                        { key: "smsNotifications", title: "Thông báo qua SMS", desc: "Nhận thông báo qua tin nhắn SMS" },
                        { key: "admissionAlerts", title: "Thông báo tuyển sinh", desc: "Cập nhật thông tin tuyển sinh mới nhất" },
                        { key: "newsAlerts", title: "Tin tức & Khuyến mãi", desc: "Nhận tin tức và khuyến mãi từ SpaceUp" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-charcoal-950 rounded-xl">
                          <div>
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <p className="text-sm text-charcoal-400">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                            className={cn(
                              "w-12 h-7 rounded-full transition-colors relative",
                              notifications[item.key as keyof typeof notifications] ? "bg-violet-600" : "bg-charcoal-700"
                            )}
                          >
                            <span className={cn(
                              "absolute top-1 w-5 h-5 bg-white rounded-full transition-transform",
                              notifications[item.key as keyof typeof notifications] ? "left-6" : "left-1"
                            )} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}