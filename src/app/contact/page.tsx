"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Địa chỉ",
      content: "Tầng 4, Tòa nhà Space Up, 123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
      color: "text-rose-400 bg-rose-500/20",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Điện thoại",
      content: "+84 28 1234 5678",
      color: "text-mint-400 bg-mint-500/20",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "tuyensinh@spaceup.edu.vn",
      color: "text-violet-400 bg-violet-500/20",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 17:30\nThứ 7: 8:00 - 12:00",
      color: "text-cobalt-400 bg-cobalt-500/20",
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", color: "hover:bg-blue-600" },
    { icon: <MessageCircle className="w-5 h-5" />, name: "Messenger", color: "hover:bg-blue-500" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", color: "hover:bg-pink-600" },
    { icon: <Youtube className="w-5 h-5" />, name: "Youtube", color: "hover:bg-red-600" },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-16">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-rose-400 bg-rose-500/10 rounded-full border border-rose-500/20">
            📞 Liên Hệ
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Kết Nối </span>
            <span className="gradient-text">Với Chúng Tôi</span>
          </h1>
          <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn. Hãy liên hệ ngay!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1 group-hover:text-violet-300 transition-colors">{info.title}</h3>
                    <p className="text-charcoal-400 text-sm whitespace-pre-line">{info.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-charcoal-900/50 border border-charcoal-800"
            >
              <h3 className="text-white font-medium mb-4">Kết nối mạng xã hội</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.name}
                    className={`p-3 rounded-xl bg-charcoal-800 text-charcoal-400 hover:text-white transition-all ${social.color}`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-charcoal-900/50 border border-charcoal-800">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Gửi thành công!</h3>
                  <p className="text-charcoal-400 mb-6">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-semibold text-white mb-5">Gửi tin nhắn cho chúng tôi</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        placeholder="+84 xxx xxx xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Chủ đề *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="tuyensinh">Tư vấn tuyển sinh</option>
                        <option value="hocphi">Thông tin học phí</option>
                        <option value="chương trình">Chương trình đào tạo</option>
                        <option value="khac">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-gradient-to-r from-violet-600 via-violet-500 to-pink-600 hover:from-violet-500 hover:via-violet-400 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Gửi tin nhắn</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 rounded-2xl bg-charcoal-900/50 border border-charcoal-800"
            >
              <div className="h-48 md:h-64 rounded-xl bg-charcoal-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-charcoal-500" />
                  <p className="text-charcoal-400">Bản đồ sẽ hiển thị tại đây</p>
                  <p className="text-sm text-charcoal-500">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}