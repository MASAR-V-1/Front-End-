import styles from "./CompareHeader.module.css";

export default function CompareHeader() {
  return (
    <div className={styles.headerContainer}>
      <h1>عندما يكبر العمل، تتشتت الصورة</h1>
      <p className={styles.subText}>
        الملفات المتفرقة، الرسائل، المتابعات اليدوية، والصلاحيات غير الواضحة
        تجعل إدارة العمل أصعب.
      </p>

      <h2 className={styles.midTitle}>قبل مَسَار وبعده</h2>
    </div>
  );
}
