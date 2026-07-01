"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [userData, setUserData] = useState({
    name: "",
    initial: "م",
  });

  useEffect(() => {
    // قراءة بيانات التسجيل من sessionStorage
    try {
      const savedData = sessionStorage.getItem("registerFormData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserData({
          name: name,
          initial: name.charAt(0),
        });
      }
    } catch (e) {
      console.error("Error loading user data", e);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* الشق الأيمن: الشعار واسم المنصة */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Image
              src="/logo.png"
              alt="شعار مَسَار"
              width={150}
              height={150}
              priority
            />
          </div>
        </div>

        {/* الشق الأيسر: معلومات حساب المستخدم الحالي */}
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userData.name || "مستخدم"}</span>
            <span className={styles.userRole}>مسؤول النظام</span>
          </div>
          <div className={styles.avatar}>{userData.initial}</div>
        </div>
      </div>
    </nav>
  );
}
