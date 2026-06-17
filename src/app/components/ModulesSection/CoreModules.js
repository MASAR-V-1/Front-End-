import styles from "./CoreModules.module.css";
import { ShieldCheck, SearchCode, Users, BarChart3 } from "lucide-react";

export default function CoreModules() {
  const coreData = [
    {
      title: "تقنية المعلومات والإدارة",
      desc: "إدارة الدخول، الصلاحيات، وإعدادات المؤسسة.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "العمليات الميدانية",
      desc: "تنظيم السجلات الميدانية، كشف التشابه، ومتابعة التوزيع.",
      icon: <SearchCode size={24} />,
    },
    {
      title: "الموارد البشرية والمتطوعين",
      desc: "إدارة بيانات المتطوعين، الورديات، الحضور، وساعات العمل.",
      icon: <Users size={24} />,
    },
    {
      title: "المتابعة والتقييم والتقارير",
      desc: "متابعة المهام، المؤشرات، وسير التقارير الذكية.",
      icon: <BarChart3 size={24} />,
    },
  ];

  return (
    <>
      <div className={styles.subHeaderDivider}>
        <span>الوحدات الأساسية</span>
      </div>

      <div className={styles.coreGrid}>
        {coreData.map((item, index) => (
          <div key={index} className={styles.coreCard}>
            <span className={styles.badge}>أساسية</span>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
