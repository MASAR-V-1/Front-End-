"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const navItems = [
    { id: "#", name: "الرئيسية", href: "/" },
    { id: "security", name: "الأمان", href: "/security" },
    { id: "modules", name: "الوحدات", href: "/modules" },
    { id: "compare", name: "كيف يعمل", href: "/how-it-works" },
    { id: "contact", name: "تواصل معنا", href: "/contact" },
  ];

  const [activeTab, setActiveTab] = useState("home");
  // State جديدة للتحكم في فتح وإغلاق قائمة الموبايل
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navWrapper}>
          {/* 1. أقصى اليمين: الشعار */}
          <div className={styles.logoContainer}>
            <Link href={"/"} className={styles.logoLink}>
              <Logo width={100} height={100} />
            </Link>
          </div>

          {/* 2. المنتصف: روابط التنقل (تأخذ كلاس إضافي ديناميكي عند الفتح) */}
          <div
            className={`${styles.navLinksWrapper} ${isMenuOpen ? styles.menuOpen : ""}`}
          >
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    /* 🌟 جعل الرابط ديناميكي بناءً على الـ id الخاص بكل قسم */
                    href={`#${item.id}`}
                    className={`${styles.navLink} ${activeTab === item.id ? styles.activeLink : ""}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false); // إغلاق القائمة تلقائياً عند الضغط على رابط
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={`${styles.underline} ${styles[activeTab]}`}></div>
          </div>

          {/* 3. أقصى الشمال: زر التسجيل + زر الـ Burger الذكي */}
          <div className={styles.navAction}>
            <button className={styles.registerBtn}>سجّل مؤسستك</button>

            {/* زر الـ Burger المكون من 3 أسطر تتحول إلى X عند الفتح */}
            <button
              className={`${styles.burgerMenu} ${isMenuOpen ? styles.burgerActive : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="القائمة"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
