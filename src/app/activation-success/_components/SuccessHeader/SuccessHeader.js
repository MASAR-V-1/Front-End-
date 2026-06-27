import React from "react";
import { Check } from "lucide-react";
import styles from "./SuccessHeader.module.css"; // استيراد الستايل الخاص بهذا الهيدر فقط

export default function SuccessHeader() {
  return (
    <div className={styles.topHeader}>
      {/* اسم المنصة */}
      <div className={styles.logoArea}>مَسَار</div>

      {/* العنوان الجديد الخاص بمرحلة تفعيل الدخول */}
      <h1 className={styles.mainTitle}>الدخول إلى مساحة العمل</h1>

      {/* حزام الخطوات (Stepper) المحدث */}
      <div className={styles.stepperContainer}>
        {/* الخطوة 1: مكتملة (إنشاء المساحة) */}
        <div className={`${styles.step} ${styles.completed}`}>
          <div className={styles.stepCircle}>
            <Check size={14} strokeWidth={3} />
          </div>
          <span className={styles.stepLabel}>إنشاء المساحة</span>
        </div>

        {/* الخط الفاصل الأول: مكتمل ومشمر باللون الأخضر */}
        <div className={`${styles.stepLine} ${styles.lineCompleted}`}></div>

        {/* الخطوة 2: مكتملة أيضاً (تفعيل البريد) */}
        <div className={`${styles.step} ${styles.completed}`}>
          <div className={styles.stepCircle}>
            <Check size={14} strokeWidth={3} />
          </div>
          <span className={styles.stepLabel}>تفعيل البريد</span>
        </div>

        {/* الخط الفاصل الثاني: مكتمل ومشمر باللون الأخضر */}
        <div className={`${styles.stepLine} ${styles.lineCompleted}`}></div>

        {/* الخطوة 3: الحالية والنشطة (فتح لوحة التحكم) */}
        <div className={`${styles.step} ${styles.active}`}>
          <div className={styles.stepCircle}>3</div>
          <span className={styles.stepLabel}>فتح لوحة التحكم</span>
        </div>
      </div>
    </div>
  );
}
