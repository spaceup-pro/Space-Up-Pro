import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-violet-500 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-white mb-4">Không tìm thấy trang</h3>
        <p className="text-charcoal-400 mb-6">Trang bạn đang tìm kiếm không tồn tại.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}