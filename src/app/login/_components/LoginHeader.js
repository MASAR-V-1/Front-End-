"use client";

import React from "react";
import styles from "./LoginHeader.module.css";

export default function LoginHeader() {
  return (
    <div className={styles.headerWrapper}>
      {/* منطقة الشعار والاسم */}
      <div className={styles.logoContainer}>
        {/* أيقونة شبكة مَسَار المنحنية بيضاء */}
        <svg
          className={styles.logoIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v12M6 12h12" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
        <span className={styles.logoText}>مَسَار</span>
      </div>

      {/* العنوان الرئيسي العريض */}
      <h1 className={styles.mainTitle}>الدخول إلى مساحة العمل</h1>
    </div>
  );
}
