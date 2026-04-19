import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghost - 저주 기반 학업 보조",
  description: "스마트폰을 딴짓에 쓰는 순간, 빙의가 시작됩니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
