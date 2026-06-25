"use client";

import styles from "./register.module.css";
import RegisterHeader from "./RegisterHeader";
import RegisterForm from "./RegisterForm";
import RegisterSidebar from "./RegisterSidebar";

export default function RegisterWorkspacePage() {
  return (
    <div className={styles.pageContainer}>
      {/* 1. الهيدر العلوي الخلفي (البانر المتدرج) */}
      <RegisterHeader />

      {/* الحاوية الأساسية للمحتوى الشامل لشبكة الأعمدة */}
      <main className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* 2. العمود الأيمن الكبير: نموذج البيانات (الـ Form) */}
          <RegisterForm />

          {/* 3. العمود الأيسر الصغير: الوحدات وروابط التحويل (الـ Sidebar) */}
          <RegisterSidebar />
        </div>
      </main>
    </div>
  );
}
