"use client";

import { useState, useCallback } from "react";
import Navbar from "./_components/Navbar";
import OnboardingHeader from "./_components/OnboardingHeader";
import ProgressSidebar from "./_components/ProgressSidebar";
import OrganizationForm from "./_components/OrganizationForm";
import styles from "./onboarding-page.module.css";

const REQUIRED_FIELDS = [
  "orgName",
  "orgType",
  "regNumber",
  "country",
  "phone",
  "email",
  "managerName",
];

export default function OnboardingPage() {
  const [progress, setProgress] = useState(0);

  // دالة تحديث نسبة الإكمال تُمررّ للفورم ليستدعيها عند كل تغيير
  const handleProgressUpdate = useCallback((formData) => {
    const filledCount = REQUIRED_FIELDS.filter((key) => {
      const value = formData[key];
      return value && String(value).trim() !== "";
    }).length;

    const percentage = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);
    setProgress(percentage);
  }, []);

  return (
    <div className={styles.container}>
      {/* الشعار واسم الحساب في أعلى الصفحة مباشرة */}
      <Navbar />

      {/* هيدر نسبة الإكمال - ديناميكي */}
      <OnboardingHeader progress={progress} />

      {/* تقسيم الشاشة السفلي للاستمارة والسايدبار */}
      <div className={styles.contentLayout}>
        {/* الشق الأيمن: الاستمارة الرئيسية */}
        <main className={styles.mainContent}>
          <OrganizationForm onProgressUpdate={handleProgressUpdate} />
        </main>

        {/* الشق الأيسر: الخطوات والتنبيهات */}
        <aside className={styles.sidebarContent}>
          <ProgressSidebar />
        </aside>
      </div>
    </div>
  );
}
