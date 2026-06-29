"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  const isRegisterPage = pathname === "/register";

  return (
    <motion.div
      initial={
        isRegisterPage
          ? { x: "100%", y: 0, opacity: 0.8 }
          : { x: 0, y: 15, opacity: 0 }
      }
      // الحالة النهائية الثابتة والمشتركة لكل الصفحات
      animate={{ x: 0, y: 0, opacity: 1 }}
      // منحنى الحركة السلس والسريع
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      style={{ width: "100%", minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}
