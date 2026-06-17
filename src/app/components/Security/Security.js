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
    <section className={styles.security}>
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
            icon: <LogIn size={30} />,
            name: "تسجيل دخول امن",
            cont: "حماية حسابات المستخدمين بمعايير عالية",
          }}
        />
        <SecurityCard
          content={{
            icon: <ShieldCog size={30} />,
            name: "صلاحيات قابلة للتحكم",
            cont: "ادارة كاملة للوصول للبيانات ",
          }}
        />
        <SecurityCard
          content={{
            icon: <ClipboardMinus size={30} />,
            name: "سجل تدقيق",
            cont: "تتبع كامل لكل الاجراءات و التغييرات في النظام",
          }}
        />
        <SecurityCard
          content={{
            icon: <LockKeyhole size={30} />,
            name: "حماية البيانات الحساسة",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
        <SecurityCard
          content={{
            icon: <MonitorCheck size={30} />,
            name: "تحقق قبل التفعيل",
            cont: "بيئة معزولة تماما لبيانات مؤسستك",
          }}
        />
      </div>
    </section>
  );
};

export default Security;
