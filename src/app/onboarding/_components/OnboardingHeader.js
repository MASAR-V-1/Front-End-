import styles from "./OnboardingHeader.module.css";

export default function OnboardingHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.titleSection}>
          <h1>إعداد ملف المنظمة</h1>
          <p>
            أكمل بيانات منظمتك ليتم إرسالها إلى إدارة منصة مسار للمراجعة. ستتمكن
            من إنشاء مساحات العمل بعد الموافقة.
          </p>
        </div>
        <div className={styles.progressSection}>
          <span className={styles.progressText}>
            الخطوة 1 من 1 - إكمال ملف المنظمة{" "}
            <strong className={styles.percent}>70%</strong>
          </span>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
