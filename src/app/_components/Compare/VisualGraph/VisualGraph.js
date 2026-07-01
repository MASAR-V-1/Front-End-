import styles from "./VisualGraph.module.css";
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Repeat,
  ClipboardCheck,
  LayoutGrid,
} from "lucide-react";

export default function VisualGraph() {
  return (
    <div className={styles.graphWrapper}>
      <div className={styles.mainBoard}>
        {/* الكرت الأيسر المستقر: مساحة عمل منظمة */}
        <div className={styles.organizedCard}>
          <div className={styles.iconBox}>
            <LayoutGrid size={24} />
          </div>
          <h3>مساحة عمل منظمة</h3>
          <p>كل شيء في مكانه الصحيح</p>
        </div>

        {/* سهم الانتقال الدائري في المنتصف */}
        <div className={styles.arrowCircle}>
          <ArrowLeft size={24} />
        </div>

        {/* الأقراص العائمة المتشتتة في اليمين */}
        <div className={styles.blobsContainer}>
          <div className={`${styles.blob} ${styles.redBlob}`}>
            <FileText size={14} />
            <span>ملفات متفرقة</span>
          </div>

          <div className={`${styles.blob} ${styles.greenBlob}`}>
            <ClipboardCheck size={14} />
            <span>تقارير يدوية</span>
          </div>

          <div className={`${styles.blob} ${styles.blueBlob}`}>
            <MessageSquare size={14} />
            <span>رسائل كثيرة</span>
          </div>

          <div className={`${styles.blob} ${styles.purpleBlob}`}>
            <Repeat size={14} />
            <span>سجلات مكررة</span>
          </div>

          <div className={`${styles.blob} ${styles.violetBlob}`}>
            <ClipboardCheck size={14} />
            <span>مهام منسية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
