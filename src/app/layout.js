import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo", // هذا هو المتغير المهم
});

export const metadata = {
  title: "منصة مسار | MASAR",
  description: "مساحة عمل رقمية متكاملة لإدارة العمليات والمؤسسات",
  icons: {
    icon: "/logo.svg", // التعديل الصحيح لكتابة الأيقونة في Next.js 13/14+
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      {/* نمرر المتغير هنا ليصبح متاحاً لكل المشروع */}
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
