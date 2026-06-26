"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-charcoal-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
            📜 Điều Khoản
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Điều Khoản </span>
            <span className="gradient-text">Sử Dụng</span>
          </h1>
          <p className="text-charcoal-400">
            Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-8 text-charcoal-300">
            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">1. Giới thiệu</h2>
              <p className="mb-4">
                Chào mừng bạn đến với Space Up! Khi truy cập và sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ
                các điều khoản sử dụng này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
              <p>
                Space Up là nền tảng tuyển sinh và quản lý sinh viên, cung cấp thông tin về các chương trình đào tạo,
                tuyển sinh và dịch vụ hỗ trợ học tập.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">2. Sử dụng dịch vụ</h2>
              <p className="mb-4">
                Khi sử dụng Space Up, bạn cam kết:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản</li>
                <li>Không sử dụng dịch vụ cho bất kỳ mục đích bất hợp pháp nào</li>
                <li>Không gây hại hoặc can thiệp vào hệ thống của chúng tôi</li>
                <li>Không sao chép, phân phối hoặc sử dụng nội dung của chúng tôi cho mục đích thương mại mà không có sự đồng ý</li>
                <li>Giữ bí mật thông tin tài khoản của bạn</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">3. Tài khoản người dùng</h2>
              <p className="mb-4">
                Khi tạo tài khoản trên Space Up, bạn có trách nhiệm:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cung cấp thông tin cá nhân chính xác và cập nhật</li>
                <li>Bảo mật mật khẩu và thông tin đăng nhập</li>
                <li>Chịu trách nhiệm hoàn toàn cho mọi hoạt động dưới tài khoản của bạn</li>
                <li>Thông báo ngay cho chúng tôi nếu phát hiện bất kỳ vi phạm bảo mật nào</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">4. Quyền sở hữu trí tuệ</h2>
              <p className="mb-4">
                Tất cả nội dung trên Space Up, bao gồm văn bản, đồ họa, logo, hình ảnh, video và phần mềm,
                là tài sản của Space Up hoặc các bên cấp phép. Bạn không được phép:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sao chép, sửa đổi hoặc phân phối nội dung mà không có sự đồng ý bằng văn bản</li>
                <li>Sử dụng nội dung cho mục đích thương mại</li>
                <li>Xóa hoặc thay đổi thông báo bản quyền</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">5. Giới hạn trách nhiệm</h2>
              <p className="mb-4">
                Space Up cung cấp dịch vụ "như hiện tại" mà không đưa ra bất kỳ bảo đảm nào. Chúng tôi không chịu trách nhiệm:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lỗi hoặc gián đoạn dịch vụ</li>
                <li>Sai sót hoặc thiếu sót trong nội dung</li>
                <li>Thiệt hại phát sinh từ việc sử dụng dịch vụ</li>
                <li>Hành vi của người dùng khác</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">6. Chính sách bảo mật</h2>
              <p className="mb-4">
                Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Vui lòng tham khảo
                <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline"> Chính sách bảo mật</Link>
                để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">7. Thay đổi điều khoản</h2>
              <p>
                Chúng tôi có quyền thay đổi các điều khoản này bất kỳ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi
                thay đổi có nghĩa là bạn chấp nhận các điều khoản mới. Chúng tôi khuyến khích bạn xem lại trang này
                thường xuyên để cập nhật thông tin mới nhất.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">8. Liên hệ</h2>
              <p>
                Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ với chúng tôi tại{" "}
                <a href="mailto:support@spaceup.edu.vn" className="text-violet-400 hover:text-violet-300">
                  support@spaceup.edu.vn
                </a>
              </p>
            </section>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-charcoal-800 text-center"
        >
          <p className="text-charcoal-500 text-sm">
            © 2024 Space Up. Tất cả các quyền được bảo lưu.
          </p>
        </motion.div>
      </div>
    </div>
  );
}