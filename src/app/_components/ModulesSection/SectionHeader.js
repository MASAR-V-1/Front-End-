import styles from "./SectionHeader.module.css";
export default function SectionHeader() {
  return (
    <div className={styles.sectionHeader}>
      <h1>ابْنِ مساحة عملك من وحدات مَسَار</h1>
      <p>
        تبدأ مساحة العمل بوحدات أساسية تدعم تشغيل المؤسسة، ويمكن تفعيل وحدات
        إضافية لاحقاً حسب احتياج كل مؤسسة.
      </p>
    </div>
  );
}
