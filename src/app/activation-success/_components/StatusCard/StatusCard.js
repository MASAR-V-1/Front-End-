import React from "react";
import { Building2, ShieldCheck, Milestone } from "lucide-react";
import styles from "./StatusCard.module.css"; // الستايل المعزول الخاص بالكرت فقط

export default function StatusCard({ organizationName }) {
  return (
    <div className={styles.statusBox}>
      {/* عنوان الكرت الداخلي */}
      <h3 className={styles.statusTitle}>حالة النظام</h3>

      {/* خط فاصل ناعم */}
      <hr className={styles.divider} />

      {/* شبكة المعلومات (Grid / Flex) */}
      <div className={styles.infoGrid}>
        {/* تفاصيل المؤسسة */}
        <div className={styles.infoItem}>
          <Building2 className={styles.infoIcon} size={20} />
          <div className={styles.textGroup}>
            <span className={styles.label}>المؤسسة</span>
            <span className={styles.value}>
              {organizationName || "مؤسسة الأمل"}
            </span>
          </div>
        </div>
      </div>

      {/* الخطوة التالية (تأتي بالأسفل بعرض كامل) */}
      <div className={`${styles.infoItem} styles.fullWidth`}>
        <Milestone className={styles.infoIconNext} size={20} />
        <div className={styles.textGroup}>
          <span className={styles.label}>الخطوة التالية</span>
          <span className={styles.valueNext}>اكمال انشاء مساحة العمل </span>
        </div>
      </div>
    </div>
  );
}
