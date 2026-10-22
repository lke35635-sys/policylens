import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Design Ref: §3.1 ① 머리말 — 브라우저 탭 제목과 설명도 앱 이름을 따른다.
export const metadata: Metadata = {
  title: "MacroLens",
  description: "뉴스 한 편으로 보는 거시경제 스트레스 테스트",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 한국어 서비스이므로 문서 언어를 ko로 둔다 (PLAN 4번)
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
