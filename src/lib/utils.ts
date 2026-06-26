import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdempotencyKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function formatCurrency(amount: number, locale = "vi-VN", currency = "VND"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string, locale = "vi-VN"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function getVietnameseGradeStatus(score: number): { label: string; color: string } {
  if (score >= 9) return { label: "Xuất sắc", color: "text-green-400" };
  if (score >= 8) return { label: "Giỏi", color: "text-green-400" };
  if (score >= 7) return { label: "Khá", color: "text-mint-400" };
  if (score >= 6) return { label: "Trung bình khá", color: "text-cobalt-400" };
  if (score >= 5) return { label: "Trung bình", color: "text-yellow-400" };
  if (score >= 4) return { label: "Yếu", color: "text-orange-400" };
  return { label: "Không đạt", color: "text-red-400" };
}

export function getAdmissionBlockLabel(block: string): string {
  const labels: Record<string, string> = {
    A: "Khối A (Toán, Lý, Hóa)",
    A1: "Khối A1 (Toán, Lý, Anh)",
    B: "Khối B (Toán, Hóa, Sinh)",
    C: "Khối C (Văn, Sử, Địa)",
    D: "Khối D (Toán, Văn, Anh)",
    D1: "Khối D1 (Toán, Văn, Anh)",
  };
  return labels[block] || block;
}

export function getApplicationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Chờ duyệt",
    approved: "Đã chấp nhận",
    rejected: "Đã từ chối",
    waitlisted: "Chờ danh sách",
  };
  return labels[status] || status;
}

export function getCourseStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    not_started: "Chưa bắt đầu",
    in_progress: "Đang học",
    passed: "Đã đạt",
    failed: "Chưa đạt",
  };
  return labels[status] || status;
}