import React from "react";
import { CheckCircle2, Check, LayoutDashboard, LogIn } from "lucide-react";
import StatusCard from "../StatusCard/StatusCard"; // استدعاء كرت حالة النظام الداخلي
import styles from "./SuccessCard.module.css"; // الستايل المعزول للكرت الرئيسي
import { useRouter } from "next/navigation"; // ✨ التعديل الصحيح: الاستيراد من next/navigation وليس next/router

export default function SuccessCard({ organizationName }) {
  const router = useRouter(); // تهيئة الـ router بنجاح من الموجه الجديد

  const handleGoToDashboard = () => {
    router.push("/dashboard"); // تنقل سريع وسلس بدون إعادة تحميل الصفحة
  };

  const handleGoToLogin = () => {
    router.push("/login"); // تنقل سريع وسلس
  };

  return (
    <div className={styles.cardContainer}>
      {/* شارة النجاح الخضراء العلوية */}
      <div className={styles.successBadgeWrapper}>
        <div className={styles.successBadge}>
          <CheckCircle2 size={32} strokeWidth={2.5} color="#0b9c76" />
        </div>  
      </div>

      {/* العناوين الرئيسية للنجاح */}
      <h2 className={styles.cardTitle}>تم تفعيل البريد بنجاح</h2>
      <p className={styles.cardSubTitle}>
        تم التحقق من البريد الإلكتروني الخاص بالمؤسسة. يمكنك الآن فتح لوحة
        التحكم والبدء بإعداد مساحة العمل.
      </p>

      {/* صف البادجات الصغيرة الملونة (Tags) */}
      <div className={styles.tagsContainer}>
        <div className={`${styles.tag} ${styles.tagBlue}`}>
          <Check size={14} strokeWidth={3} />
          <span>البريد الإلكتروني: تم التحقق</span>
        </div>
        <div className={`${styles.tag} ${styles.tagGreen}`}>
          <Check size={14} strokeWidth={3} />
          <span>مساحة العمل: مفعّلة</span>
        </div>
      </div>

      {/* كرت حالة النظام الداخلي المستدعى ديناميكياً */}
      <StatusCard organizationName={organizationName} />

      {/* منطقة الأزرار السفلية أفقياً */}
      <div className={styles.actionButtonsRow}>
        {/* الزر الرئيسي: الانتقال إلى لوحة التحكم */}
        <button onClick={handleGoToDashboard} className={styles.primaryBtn}>
          <span>الانتقال إلى انشاء مساحة العمل </span>
          <LayoutDashboard size={18} />
        </button>

        {/* الزر الثانوي: تسجيل الدخول (شفاف بإطار) */}
        <button onClick={handleGoToLogin} className={styles.secondaryBtn}>
          <span>تسجيل الدخول</span>
          <LogIn size={18} />
        </button>
      </div>
    </div>
  );
}
