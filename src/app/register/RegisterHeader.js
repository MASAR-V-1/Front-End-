"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Settings,
  ShieldAlert,
  Users,
  Activity,
  ChevronDown,
} from "lucide-react";

export default function RegisterWorkspace() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.pageContainer}>
      {/* ==========================================
         [الجزء 1]: الهيدر الخلفي الممتد
         ========================================== */}
      <header className={styles.headerBanner}>
        <div className={styles.logoWrapper}>
          {/* هنا أيقونة مسار وجنبها الاسم */}
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>مَسَار</span>
        </div>
        <h1 className={styles.mainTitle}>إنشاء مساحة عمل</h1>
        <p className={styles.subTitle}>
          أدخل بيانات مؤسستك للبدء في إعداد مساحة العمل الخاصة بك.
        </p>
      </header>

      {/* الحاوية الكبرى التي ستجمع العمودين لاحقاً */}
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* هنا سنضع الجزء الثاني (الـ Form) والجزء الثالث (الـ Sidebar) */}
          </div>
        </div>
      </main>
    </div>
  );
}
