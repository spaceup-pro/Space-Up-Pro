"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Đã xảy ra lỗi!</h2>
        <p className="text-charcoal-400 mb-6">Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}