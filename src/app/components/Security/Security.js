import { styles } from "next/dist/client/components/styles/access-error-styles";

const Security = () => {
  return (
    <section className={styles.security}>
      <div className={styles.icon}></div>
      <h1 className={styles.security-h1}>مساحة عمل خاصة وامنة لمؤسستك</h1>
      <p className={styles.security-text}>
        يضع مَسَارالأمان و التحكم في قلب النظام. من تسجيل الدخول الى سجل التدقيق
      </p>
      <div className={styles.security - cards}>
        <Sec-card
          content={{
            "icon" :,
            name: "مساحة عمل خاصة",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
        <Sec-card
          content={{
            name: "تسجيل دخول امن",
            cont: "حماية حسابات المستخدمين بمعايير عالية",
          }}
        />
        <Sec-card
          content={{
            name: "صلاحيات قابلة للتحكم",
            cont: "ادارة كاملة للوصول للبيانات ",
          }}
        />
        <Sec-card
          content={{
            name: "سجل تدقيق",
            cont: "تتبع كامل لكل الاجراءات و التغييرات في النظام",
          }}
        />
        <Sec-card
          content={{
            name: "حماية البيانات الحساسة",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
        <Sec-card
          content={{
            name: "تحقق قبل التفعيل",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
      </div>
    </section>
  );
};

export default Security;
