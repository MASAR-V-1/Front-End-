import { Cairo } from "next/font/google"; // 1. استيراد الخط من نكست
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"], // أوزان مختلفة من العادي إلى العريض جداً
  variable: "--font-cairo", // تعريف متغير CSS للخط
});
export const metadata = {
  title: "منصة مسار | MASAR",
  description: "مساحة عمل رقمية متكاملة لإدارة العمليات والمؤسسات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cairo.className}>
      <body>{children}</body>
    </html>
  );
}
