"use client"; // 🌟 يجب أن يكون في السطر الأول تماماً قبل الـ imports
import { useState } from "react";
import styles from "./AdditionalModules.module.css";
import {
  Boxes,
  Briefcase,
  Handshake,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

export default function AdditionalModules() {
  const [toggles, setToggles] = useState({
    inventory: true,
    finance: false,
    partners: false,
    orders: true,
    custom: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const modules = [
    { id: "inventory", name: "إدارة المخزون", icon: <Boxes size={20} /> },
    { id: "finance", name: "إدارة التمويل", icon: <Briefcase size={20} /> },
    { id: "partners", name: "إدارة الشراكات", icon: <Handshake size={20} /> },
    { id: "orders", name: "إدارة الطلبات", icon: <ShoppingCart size={20} /> },
  ];

  return (
    <div className={styles.additionalSection}>
      <div className={styles.additionalInfo}>
        <h2>الوحدات الإضافية</h2>
        <p>
          قم بتخصيص مساحة عملك عبر تفعيل الوحدات المتخصصة التي تناسب نشاط
          مؤسستك.
        </p>
      </div>

      <div className={styles.toggleGrid}>
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`${styles.toggleCard} ${toggles[mod.id] ? styles.activeRow : ""}`}
          >
            <button
              className={`${styles.switch} ${toggles[mod.id] ? styles.switchOn : ""}`}
              onClick={() => handleToggle(mod.id)}
            >
              <span className={styles.slider}></span>
            </button>
            <span className={styles.statusLabel}>
              {toggles[mod.id] ? "مفعلة" : "غير مفعلة"}
            </span>
            <div className={styles.cardItemRight}>
              <span>{mod.name}</span>
              <div className={styles.additionalIcon}>{mod.icon}</div>
            </div>
          </div>
        ))}

        {/* كرت الوحدة المخصصة ممتد بالكامل في الأسفل */}
        <div
          className={`${styles.toggleCard} ${styles.fullWidthRow} ${toggles.custom ? styles.activeRow : ""}`}
        >
          <button
            className={`${styles.switch} ${toggles.custom ? styles.switchOn : ""}`}
            onClick={() => handleToggle("custom")}
          >
            <span className={styles.slider}></span>
          </button>
          <span className={styles.statusLabel}>
            {toggles.custom ? "مفعلة" : "غير مفعلة"}
          </span>
          <div className={styles.cardItemRight}>
            <span>وحدة مخصصة</span>
            <div className={styles.additionalIcon}>
              <Sparkles size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
