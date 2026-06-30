import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* الشق الأيمن: الشعار واسم المنصة */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Image
              src="/logo.png"
              alt="شعار مَسَار"
              width={150}
              height={150}
              priority
            />
          </div>
        </div>

        {/* الشق الأيسر: معلومات حساب المستخدم الحالي */}
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>محمود سالم</span>
            <span className={styles.userRole}>مسؤول النظام</span>
          </div>
          <div className={styles.avatar}>م</div>
        </div>
      </div>
    </nav>
  );
}
