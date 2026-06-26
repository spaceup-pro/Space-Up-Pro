"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

const FACEBOOK_PAGE_ID = "spaceupvn"; // Replace with actual page ID
const MESSENGER_URL = `https://m.me/${FACEBOOK_PAGE_ID}`;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChoices, setShowChoices] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChatOnWeb = useCallback(() => {
    setShowChoices(false);
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Xin chào! Tôi là Lê Thành Chung - nhân viên tư vấn tuyển sinh của Space Up. Anh/Chị cần hỗ trợ gì ạ?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleMessenger = useCallback(() => {
    window.open(MESSENGER_URL, "_blank", "noopener,noreferrer");
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra. Vui lòng thử lại.");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-violet-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        aria-label="Mở chat hỗ trợ"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-charcoal-900 border border-charcoal-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-600 to-pink-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Hỗ trợ tuyển sinh</h3>
                  <p className="text-xs text-white/70">Online 24/7</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowChoices(true);
                }}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="h-96 flex flex-col">
              {showChoices ? (
                /* Choice Options */
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <p className="text-charcoal-300 text-center mb-2">
                    Anh/Chị muốn liên hệ bằng cách nào?
                  </p>
                  <button
                    onClick={handleChatOnWeb}
                    className="w-full p-4 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 rounded-xl transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Chat trực tiếp tại Website</p>
                      <p className="text-sm text-charcoal-400">Nhắn tin ngay với tư vấn viên</p>
                    </div>
                  </button>
                  <button
                    onClick={handleMessenger}
                    className="w-full p-4 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 rounded-xl transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cobalt-500/20 text-cobalt-400 flex items-center justify-center group-hover:bg-cobalt-500/30 transition-colors">
                      <Facebook className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Chat qua Messenger</p>
                      <p className="text-sm text-charcoal-400">Mở Messenger để nhắn tin nhanh hơn</p>
                    </div>
                  </button>
                </div>
              ) : (
                /* Chat Interface */
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] p-3 rounded-2xl text-sm",
                            message.role === "user"
                              ? "bg-violet-600 text-white rounded-br-md"
                              : "bg-charcoal-800 text-charcoal-100 rounded-bl-md"
                          )}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-charcoal-800 p-3 rounded-2xl rounded-bl-md">
                          <Loader2 className="w-5 h-5 text-charcoal-400 animate-spin" />
                        </div>
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center"
                      >
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-charcoal-800">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Nhập tin nhắn..."
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-xl text-white placeholder:text-charcoal-500 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="w-10 h-10 bg-violet-600 hover:bg-violet-500 disabled:bg-charcoal-700 disabled:text-charcoal-500 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}