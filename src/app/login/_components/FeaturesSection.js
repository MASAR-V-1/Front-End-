"use client";

import React from "react";
import { ShieldAlert, AppWindow, BarChart3, ShieldCheck } from "lucide-react";
import styles from "./FeaturesSection.module.css";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "صلاحيات محمية",
      icon: <ShieldAlert size={20} />,
      colorClass: styles.iconGreen,
    },
    {
      id: 2,
      title: "وحدات مفعّلة",
      icon: <AppWindow size={20} />,
      colorClass: styles.iconBlue,
    },
    {
      id: 3,
      title: "تقارير ومتابعة",
      icon: <BarChart3 size={20} />,
      colorClass: styles.iconGray,
    },
    {
      id: 4,
      title: "مساحة عمل آمنة",
      icon: <ShieldCheck size={20} />,
      colorClass: styles.iconShield,
    },
  ];

  return (
    <div className={styles.featuresWrapper}>
      {/* النصوص التوضيحية العلوية */}
      <span className={styles.brandTag}>مَسَار</span>
      <h2 className={styles.featuresTitle}>مساحة تشغيل ذكية للمؤسسات</h2>
      <p className={styles.featuresDescription}>
        ادخل إلى مساحة عمل مؤسستك وتابع الفرق، الوحدات، المهام، والتقارير من
        مكان واحد.
      </p>

      {/* قائمة البادجات الرأسية */}
      <div className={styles.featuresList}>
        {features.map((item) => (
          <div key={item.id} className={styles.featureRow}>
            {/* البادج النصي العريض */}
            <div className={styles.featureCard}>
              <span>{item.title}</span>
            </div>
            {/* مربع الأيقونة الجانبي */}
            <div className={`${styles.iconBox} ${item.colorClass}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
