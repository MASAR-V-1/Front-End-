import styles from "./ComparisonCards.module.css";
import { X, Check } from "lucide-react";

export default function ComparisonCards() {
  const beforeList = [
    "ملفات متعددة متفرقة",
    "متابعة يدوية للمهام",
    "صعوبة معرفة حالة العمل",
    "تقارير متأخرة وغير دقيقة",
    "بيانات يصعب تتبعها وتدقيقها",
  ];

  const afterList = [
    "مساحة عمل واحدة متكاملة",
    "وحدات منظمة ومرتبطة ببعضها",
    "مهام واضحة ومسندة آلياً",
    "تقارير قابلة للمراجعة فوراً",
    "سجل تدقيق كامل للتغييرات",
  ];

  return (
    <div className={styles.cardsContainer}>
      {/* كرت قبل مَسَار (الأيمن بـ الاستايل البصري العربي) */}
      <div className={styles.beforeCard}>
        <div className={styles.cardHeader}>
          <span>قبل مَسَار</span>
          <div className={styles.xIcon}>
            <X size={16} />
          </div>
        </div>
        <ul className={styles.list}>
          {beforeList.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span>{item}</span>
              <span className={styles.minusLine}>—</span>
            </li>
          ))}
        </ul>
      </div>

      {/* كرت بعد مَسَار (الأيسر الملون) */}
      <div className={styles.afterCard}>
        <div className={styles.cardHeader}>
          <span className={styles.activeText}>بعد مَسَار</span>
          <div className={styles.checkIcon}>
            <Check size={16} />
          </div>
        </div>
        <ul className={styles.list}>
          {afterList.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span>{item}</span>
              <div className={styles.successCheck}>
                <Check size={14} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
