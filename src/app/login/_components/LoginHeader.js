"use client";

import React from "react";
import styles from "./LoginHeader.module.css";
import Link from "next/link";
import Image from "next/image";

export default function LoginHeader() {
  return (
    <div className={styles.headerWrapper}>
      {/* منطقة الشعار والاسم */}
      <div className={styles.logoContainer}>
        {/* أيقونة شبكة مَسَار المنحنية بيضاء */}

        <Image
          src="/logo.png"
          alt="شعار مَسَار"
          width={250}
          height={250}
          priority
        />
      </div>

      {/* العنوان الرئيسي العريض */}
      <h1 className={styles.mainTitle}>الدخول إلى مساحة العمل</h1>
    </div>
  );
}
