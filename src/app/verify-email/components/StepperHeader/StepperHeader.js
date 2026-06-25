import React from "react";
import { Check } from "lucide-react";
import styles from "./StepperHeader.module.css";
import Link from "next/link";
import Image from "next/image";
// استيراد الستايل الخاص به فقط

export default function StepperHeader() {
  return (
    <div className={styles.topHeader}>
      <div className={styles.logoArea}>
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="شعار مَسَار"
            width={250} /* اضبط الحجم المناسب لتصميمك */
            height={250} /* اضبط الحجم المناسب لتصميمك */
            priority /* لجعل المتصفح يحمل اللوجو فوراً دون تأخير */
          />
        </Link>
      </div>
      <h1 className={styles.mainTitle}>تأكيد بريد المؤسسة</h1>

      <div className={styles.stepperContainer}>
        {/* الخطوة 1: مكتملة */}
        <div className={`${styles.step} ${styles.completed}`}>
          <div className={styles.stepCircle}>
            <Check size={20} strokeWidth={3} />
          </div>
          <span className={styles.stepLabel}>إنشاء المساحة</span>
        </div>

        <div className={`${styles.stepLine} ${styles.lineCompleted}`}></div>

        {/* الخطوة 2: الحالية */}
        <div className={`${styles.step} ${styles.active}`}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>تفعيل البريد</span>
        </div>

        <div className={styles.stepLine}></div>

        {/* الخطوة 3: القادمة */}
        <div className={styles.step}>
          <div className={styles.stepCircle}>3</div>
          <span className={styles.stepLabel}>فتح لوحة التحكم</span>
        </div>
      </div>
    </div>
  );
}
