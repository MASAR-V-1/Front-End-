import {
  ShieldCheck,
  UserRoundKey,
  LogIn,
  ShieldCog,
  ClipboardMinus,
  LockKeyhole,
  MonitorCheck,
} from "lucide-react";
import styles from "./Security.module.css";
import SecurityCard from "./SecurityCard";

const Security = () => {
  return (
    <section id="security" className={styles.security}>
      <div className={styles.icon}>
        <ShieldCheck />
      </div>
      <h1 className={styles.securityHead}>مساحة عمل خاصة وامنة لمؤسستك</h1>
      <p className={styles.securityText}>
        يضع مَسَارالأمان و التحكم في قلب النظام. من تسجيل الدخول الى سجل التدقيق
      </p>
      <div className={styles.securityCards}>
        <SecurityCard
          content={{
            icon: <UserRoundKey />,
            name: "مساحة عمل خاصة",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
        <SecurityCard
          content={{
            icon: <LogIn />,
            name: "تسجيل دخول امن",
            cont: "حماية حسابات المستخدمين بمعايير عالية",
          }}
        />
        <SecurityCard
          content={{
            icon: <ShieldCog />,
            name: "صلاحيات قابلة للتحكم",
            cont: "ادارة كاملة للوصول للبيانات ",
          }}
        />
        <SecurityCard
          content={{
            icon: <ClipboardMinus />,
            name: "سجل تدقيق",
            cont: "تتبع كامل لكل الاجراءات و التغييرات في النظام",
          }}
        />
        <SecurityCard
          content={{
            icon: <LockKeyhole />,
            name: "حماية البيانات الحساسة",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
        <SecurityCard
          content={{
            icon: <MonitorCheck />,
            name: "تحقق قبل التفعيل",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
      </div>
    </section>
  );
};

export default Security;
