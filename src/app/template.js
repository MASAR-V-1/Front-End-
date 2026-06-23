"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  // 🌟 فحص ذكي: إذا كنا في صفحة التسجيل، نطبق حركة السلايدر الفخمة
  // وإذا كنا في اللاندينق (/) تفتح الصفحة بشكل طبيعي بدون حركة سحب
  const isRegisterPage = pathname === "/register";

  return (
    <motion.div
      initial={
        isRegisterPage ? { x: "100%", opacity: 0.8 } : { x: 0, opacity: 1 }
      }
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} // منحنى حركة سريع وسلس جداً
      style={{ width: "100%", minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}
