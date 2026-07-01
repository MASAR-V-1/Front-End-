import styles from "./ProgressSidebar.module.css";

export default function ProgressSidebar() {
  const steps = [
    {
      id: 1,
      label: "إكمال البيانات",
      desc: "تعبئة جميع الحقول الإلزامية.",
      status: "completed",
    },
    {
      id: 2,
      label: "إرسال الطلب",
      desc: "تأكيد الإرسال للإدارة.",
      status: "active",
    },
    {
      id: 3,
      label: "مراجعة الإدارة",
      desc: "يقوم فريق مسار بالتحقق من صحة الوثائق.",
      status: "pending",
    },
    {
      id: 4,
      label: "إنشاء المساحة",
      desc: "بعد الموافقة، سيتم إنشاء مساحة العمل الخاصة بمنظمتك.",
      status: "pending",
    },
  ];

  return (
    <div className={styles.sidebarWrapper}>
      {/* كارد تتبع الخطوات */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>ماذا يحدث بعد الإرسال؟</h3>
        <div className={styles.stepsList}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`${styles.stepItem} ${styles[step.status]}`}
            >
              <div className={styles.stepNumber}>
                {step.status === "completed" ? "✓" : step.id}
              </div>
              <div className={styles.stepInfo}>
                <h4>{step.label}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* كارد الملاحظة المهمة */}
      <div className={styles.noteCard}>
        <div className={styles.noteHeader}>
          <span className={styles.noteIcon}>ℹ</span>
          <h4>ملاحظة مهمة</h4>
        </div>
        <p>
          لن تتمكن من استخدام وحدات النظام أو إضافة مستخدمين إلا بعد اجتياز
          مرحلة المراجعة والموافقة على ملف المنظمة من قبل إدارة المنصة.
        </p>
      </div>

      {/* رابط الدعم الفني */}
      <div className={styles.supportLink}>
        <span>🎧</span> هل تواجه مشكلة؟ تواصل مع الدعم
      </div>
    </div>
  );
}
