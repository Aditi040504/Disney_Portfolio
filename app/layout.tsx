import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditi Sapkal — Cinematic Portfolio",
  description: "Infrastructure Specialist – Cloud Application Operations & Creative Technologist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050508] text-[#e8e4dc] font-sans antialiased selection:bg-[#c9944d]/30 selection:text-[#fcedb3] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
