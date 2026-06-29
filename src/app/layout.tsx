import type { Metadata } from "next";
import { Inter,Montserrat,Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { AIChatWidget } from "@/components/chat/AIChatWidget";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam"
});

export const metadata: Metadata = {
  title: "Space Up - Cổng Thông Tin Tuyển Sinh & Sinh Viên",
  description: "Nền tảng tuyển sinh và quản lý sinh viên hiện đại",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={cn(
        inter.variable,
        montserrat.variable,
        beVietnam.variable,
        "font-sans bg-charcoal-950 text-white antialiased"
      )}>
        <AuthProvider>
          <ToastProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <AIChatWidget />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}