import React from "react";
import Link from "next/link";
import { Mail, RotateCcw, Info, Lock, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import styles from "./VerifyCard.module.css"; // استيراد الستايل الخاص بالبطاقة فقط

export default function VerifyCard({
  email,
  timer,
  isLoading,
  isVerifying,
  onResend,
  onVerifyClick,
  error,
  message,
  verifyError,
}) {
  // دالة لتسهيل الـ UX وفتح موقع البريد تلقائياً عند الضغط
  const handleOpenEmailProvider = () => {
    const domain = email?.split("@")[1];
    if (domain) {
      window.open(`https://${domain}`, "_blank");
    } else {
      window.open("https://mail.google.com", "_blank");
    }
  };

  return (
    <div className={styles.cardContainer}>
      {/* العناوين الداخلية للبطاقة */}
      <h2 className={styles.cardTitle}>تحقق من بريد المؤسسة</h2>
      <p className={styles.cardSubTitle}>
        أرسلنا رابط تفعيل إلى بريد المؤسسة لإكمال إنشاء مساحة العمل.
      </p>

      {/* صندوق التنبيه البنفسجي اللطيف */}
      <div className={styles.alertBox}>
        تم إنشاء مساحة عمل مؤسستك مبدئياً. أرسلنا رابط تفعيل إلى البريد
        الإلكتروني الخاص بالمؤسسة.
      </div>

      {/* رسائل الخطأ أو النجاح الخاصة بالـ API */}
      {error && <div className={styles.errorText}>⚠️ {error}</div>}
      {message && <div className={styles.successText}>✅ {message}</div>}

      {/* رسالة خطأ التحقق من التفعيل - تظهر بالأحمر عند عدم التفعيل */}
      {verifyError && (
        <div className={styles.verifyErrorBox}>
          <AlertTriangle size={18} className={styles.verifyErrorIcon} />
          <p className={styles.verifyErrorText}>{verifyError}</p>
        </div>
      )}

      {/* حقل البريد الإلكتروني المقفول (Disabled) */}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>البريد الإلكتروني المسجل</label>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            value={email || "contact@organization.org"}
            disabled
            className={styles.disabledInput}
          />
          <Lock className={styles.fieldIcon} size={16} />
        </div>
      </div>

      {/* التنبيه الأزرق لمعلومات الدخول */}
      <div className={styles.infoBox}>
        <Info size={18} className={styles.infoIcon} />
        <p className={styles.infoText}>
          لن تتمكن من الوصول إلى لوحة التحكم أو استكمال إعداد مساحة العمل قبل
          تفعيل البريد الإلكتروني.
        </p>
      </div>

      {/* منطقة أزرار التحكم والعمليات */}
      <div className={styles.actionArea}>
        {/* الزر الجديد: تم التفعيل - للتحقق من حالة التفعيل والانتقال لصفحة النجاح */}
        <button
          onClick={onVerifyClick}
          disabled={isVerifying}
          className={styles.verifyBtn}
        >
          <CheckCircle size={18} />
          <span>{isVerifying ? "جاري التحقق..." : "تم التفعيل"}</span>
        </button>

        {/* الزر الأساسي: فتح البريد الإلكتروني باللون الكحلي الداكن الفاخر */}
        <button onClick={handleOpenEmailProvider} className={styles.primaryBtn}>
          <Mail size={18} />
          <span>فتح البريد الإلكتروني</span>
        </button>

        {/* الزر الثانوي: إعادة الإرسال المحكوم بالعداد التنازلي والـ API */}
        <button
          onClick={onResend}
          disabled={timer > 0 || isLoading}
          className={styles.secondaryBtn}
        >
          <RotateCcw size={16} />
          <span>
            {isLoading ? "جاري الإرسال..." : "إعادة إرسال رابط التفعيل"}
          </span>
          {timer > 0 && (
            <span className={styles.timerText}>
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          )}
        </button>
      </div>

      {/* رابط العودة لتسجيل الدخول في الأسفل */}
      <div className={styles.backToLoginWrapper}>
        <Link href="/register" className={styles.backToLoginLink}>
          <ArrowRight size={16} />
          <span>العودة إلى تسجيل </span>
        </Link>
      </div>
    </div>
  );
}
