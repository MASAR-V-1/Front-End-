"use client";

import Link from "next/link";
import styles from "./register.module.css";
import { Laptop, Activity, Users, BarChart3, LogIn } from "lucide-react";

export default function RegisterSidebar() {
  // مصفوفة الوحدات الأساسية المعروضة في الكرت العلوي
  const coreModules = [
    { id: 1, name: "تقنية المعلومات والإدارة", icon: <Laptop size={18} /> },
    { id: 2, name: "العمليات الميدانية", icon: <Activity size={18} /> },
    { id: 3, name: "الموارد البشرية والمتطوعون", icon: <Users size={18} /> },
    {
      id: 4,
      name: "المتابعة والتقييم والتقارير",
      icon: <BarChart3 size={18} />,
    },
  ];

  return (
    <aside className={styles.sidebarSection}>
      {/* 1. كرت مساحة العمل والوحدات */}
      <div className={styles.modulesCard}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>مساحة عمل المؤسسة</h3>
            <span className={styles.badge}>• بانتظار تفعيل البريد</span>
          </div>
          <div className={styles.gridIcon}>
            {/* أيقونة صغيرة تمثل المربعات الأربعة للشبكة */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <p className={styles.modulesLabel}>الوحدات الأساسية:</p>

        <ul className={styles.modulesList}>
          {coreModules.map((module) => (
            <li key={module.id} className={styles.moduleItem}>
              <span className={styles.moduleName}>{module.name}</span>
              <div className={styles.moduleIconWrapper}>{module.icon}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.loginRedirectCard}>
        <p>لديك مساحة عمل بالفعل؟</p>
        <Link href="/login" className={styles.loginLink}>
          <span>تسجيل الدخول</span>
          <LogIn size={16} />
        </Link>
      </div>
    </aside>
  );
}
