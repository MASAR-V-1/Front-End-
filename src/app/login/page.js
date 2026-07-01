"use client";

import React from "react";
import LoginHeader from "./_components/LoginHeader";
import FeaturesSection from "./_components/FeaturesSection";
import LoginForm from "./_components/LoginForm";
import styles from "./login-page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      {/* 1. الهيدر المتدرج العلوي مع شعار مسار والاسم */}
      <LoginHeader />

      {/* 2. الكارد الأبيض الكبير الشامل الذي يجمع الشقين */}
      <main className={styles.mainCard}>
        {/* الشق الأيسر: لوحة المميزات والبادجات */}
        <FeaturesSection />

        {/* الشق الأيمن التفاعلي: فورم تسجيل الدخول */}
        <LoginForm />
      </main>
    </div>
  );
}
