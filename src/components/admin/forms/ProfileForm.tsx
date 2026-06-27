"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle, User, Mail, Phone, Shield, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";

interface ProfileFormProps {
  onChange: (data: Record<string, unknown>) => void;
  initialData: Record<string, unknown>;
}

export function ProfileForm({ onChange, initialData }: ProfileFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "Super Admin",
    email: user?.email || "SU@admin.com",
    phone: "0912345678",
    avatarUrl: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePasswordChange = useCallback((field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onChange({ ...formData, updatedAt: new Date() });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, onChange]);

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
      onChange({ action: "password_changed", updatedAt: new Date() });
      setSaveSuccess(true);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setIsSaving(false);
    }
  }, [passwordData, onChange]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 p-1 bg-charcoal-800 rounded-xl">
        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            activeTab === "profile"
              ? "bg-violet-600 text-white"
              : "text-charcoal-400 hover:text-white"
          )}
        >
          <User className="w-4 h-4 inline-block mr-2" />
          Thông tin cá nhân
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            activeTab === "security"
              ? "bg-violet-600 text-white"
              : "text-charcoal-400 hover:text-white"
          )}
        >
          <Shield className="w-4 h-4 inline-block mr-2" />
          Bảo mật
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Avatar Section */}
          <div className="flex items-center gap-6 p-6 bg-charcoal-800/50 rounded-xl border border-charcoal-700">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
              {formData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-1">{formData.name}</h3>
              <p className="text-charcoal-400 text-sm mb-3">Super Admin</p>
              <button className="px-4 py-2 text-sm bg-charcoal-700 hover:bg-charcoal-600 text-white rounded-lg transition-all">
                Đổi ảnh đại diện
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6 bg-charcoal-800/50 rounded-xl border border-charcoal-700 space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Thông tin cá nhân</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  <User className="w-4 h-4 inline-block mr-1" />
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  <Phone className="w-4 h-4 inline-block mr-1" />
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  <Shield className="w-4 h-4 inline-block mr-1" />
                  Vai trò
                </label>
                <input
                  type="text"
                  value="Super Admin"
                  disabled
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-charcoal-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-700">
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                  saveSuccess
                    ? "bg-green-600 text-white"
                    : "bg-violet-600 hover:bg-violet-500 text-white"
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
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-charcoal-800/50 rounded-xl border border-charcoal-700 space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Đổi mật khẩu</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  <Key className="w-4 h-4 inline-block mr-1" />
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-400 mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-charcoal-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-all"
                  placeholder="Xác nhận mật khẩu mới"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal-700">
              <button
                onClick={handleSavePassword}
                disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
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
                    Đã đổi mật khẩu!
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    Đổi mật khẩu
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="p-6 bg-charcoal-800/50 rounded-xl border border-charcoal-700">
            <h4 className="text-lg font-semibold text-white mb-4">Thông tin bảo mật</h4>
            <div className="space-y-3 text-charcoal-400">
              <p className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Tài khoản Super Admin có quyền cao nhất
              </p>
              <p className="flex items-center gap-2">
                <Key className="w-4 h-4 text-violet-400" />
                Mật khẩu phải có ít nhất 6 ký tự
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cobalt-400" />
                Bạn có thể quản lý tất cả người dùng và dữ liệu
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}