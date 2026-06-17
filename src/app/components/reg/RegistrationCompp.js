import Link from "next/link";
import styles from "../reg/RegistrationCompp.module.css";
import { Rocket, ArrowLeft } from "lucide-react";

const Registration = () => {
  return (
    <section className={styles.container}>
      <div className={styles.reg}>
        <Rocket size={40} />
        <h2> ابدا بتنظيم مؤسستك في مَسَار</h2>
        <p className={styles.regT}>
          انشأ مساحة عمل. فعل الوحدات المناسبة وابدا ادارةالعمليات من مكان واحد
        </p>
        <Link href={"/"} className={styles.btn}>
          <ArrowLeft />
          سجل مؤسستك
        </Link>
        <p className={styles.regp}>
          لا حاجة لبطاقة ائتمان.تسجيل في دقائق قليلة{" "}
        </p>
      </div>
    </section>
  );
};

export default Registration;
