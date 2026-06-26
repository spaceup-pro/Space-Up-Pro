"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
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
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cobalt-600/15 rounded-full blur-[150px]"
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
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-cobalt-400 bg-cobalt-500/10 rounded-full border border-cobalt-500/20">
            🔒 Chính Sách
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Chính Sách </span>
            <span className="gradient-text">Bảo Mật</span>
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
                Space Up cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này
                giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
              </p>
              <p>
                Bằng việc sử dụng Space Up, bạn đồng ý với các thực hành được mô tả trong chính sách này.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">2. Thông tin chúng tôi thu thập</h2>
              <p className="mb-4">Chúng tôi thu thập các loại thông tin sau:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Thông tin đăng ký:</strong> Họ tên, email, số điện thoại, ngày sinh</li>
                <li><strong className="text-white">Thông tin hồ sơ:</strong> Ảnh đại diện, giới tính, địa chỉ</li>
                <li><strong className="text-white">Thông tin học tập:</strong> Thông tin tuyển sinh, điểm số, lịch học</li>
                <li><strong className="text-white">Thông tin sử dụng:</strong> Dữ liệu truy cập, cookies, log files</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
              <p className="mb-4">Chúng tôi sử dụng thông tin của bạn để:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cung cấp và cải thiện dịch vụ của chúng tôi</li>
                <li>Xử lý đăng ký và quản lý tài khoản người dùng</li>
                <li>Gửi thông tin tuyển sinh và cập nhật quan trọng</li>
                <li>Hỗ trợ khách hàng và giải đáp thắc mắc</li>
                <li>Phân tích dữ liệu để cải thiện trải nghiệm người dùng</li>
                <li>Ngăn chặn gian lận và đảm bảo an ninh</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">4. Chia sẻ thông tin</h2>
              <p className="mb-4">
                Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Với sự đồng ý của bạn:</strong> Khi bạn cho phép chia sẻ</li>
                <li><strong className="text-white">Với các nhà cung cấp dịch vụ:</strong> Để vận hành và duy trì dịch vụ</li>
                <li><strong className="text-white">Theo yêu cầu của pháp luật:</strong> Khi được cơ quan có thẩm quyền yêu cầu</li>
                <li><strong className="text-white">Để bảo vệ quyền và an toàn:</strong> Trong trường hợp khẩn cấp</li>
              </ul>
              <p className="mt-4">
                Chúng tôi <strong className="text-white">không bán</strong> thông tin cá nhân của bạn cho bên thứ ba.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">5. Bảo mật dữ liệu</h2>
              <p className="mb-4">
                Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin của bạn:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mã hóa dữ liệu nhạy cảm (SSL/TLS)</li>
                <li>Xác thực hai yếu tố (2FA)</li>
                <li>Giám sát hệ thống chống xâm nhập</li>
                <li>Kiểm soát quyền truy cập nghiêm ngặt</li>
                <li> Sao lưu dữ liệu định kỳ</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">6. Cookies và công nghệ theo dõi</h2>
              <p className="mb-4">
                Space Up sử dụng cookies và các công nghệ tương tự để:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ghi nhớ preferences và cài đặt của bạn</li>
                <li>Phân tích lưu lượng truy cập và xu hướng sử dụng</li>
                <li>Cá nhân hóa nội dung và quảng cáo</li>
                <li>Cải thiện hiệu suất trang web</li>
              </ul>
              <p className="mt-4">
                Bạn có thể từ chối cookies bằng cách thay đổi cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến một số tính năng của dịch vụ.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">7. Quyền của người dùng</h2>
              <p className="mb-4">Bạn có các quyền sau đối với thông tin cá nhân của mình:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Truy cập:</strong> Xem và tải thông tin cá nhân</li>
                <li><strong className="text-white">Chỉnh sửa:</strong> Cập nhật hoặc sửa thông tin không chính xác</li>
                <li><strong className="text-white">Xóa:</strong> Yêu cầu xóa thông tin cá nhân</li>
                <li><strong className="text-white">Từ chối:</strong> Từ chối việc xử lý dữ liệu nhất định</li>
                <li><strong className="text-white">Di chuyển:</strong> Chuyển dữ liệu sang dịch vụ khác</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">8. Lưu trữ dữ liệu</h2>
              <p>
                Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để cung cấp dịch vụ và
                tuân thủ các nghĩa vụ pháp lý. Khi không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh hóa dữ liệu của bạn.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">9. Thay đổi chính sách</h2>
              <p className="mb-4">
                Chúng tôi có thể cập nhật chính sách bảo mật này bất kỳ lúc nào. Chúng tôi sẽ thông báo cho bạn
                về bất kỳ thay đổi quan trọng nào bằng cách:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Đăng thông báo trên trang web</li>
                <li>Gửi email thông báo</li>
                <li>Hiển thị thông báo khi đăng nhập</li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              <h2 className="text-xl font-semibold text-white mb-4">10. Liên hệ</h2>
              <p>
                Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ với chúng tôi tại{" "}
                <a href="mailto:privacy@spaceup.edu.vn" className="text-violet-400 hover:text-violet-300">
                  privacy@spaceup.edu.vn
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