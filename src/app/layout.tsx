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
  title: "PolicyLens",
  description: "경제정책의 변천과 해외 정책이 국내 경제에 번지는 경로를 공식 자료로 살펴보는 교육용 앱",
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
