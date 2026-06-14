import Image from "next/image";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navWrapper}>
          {/* أقصى اليسار: زر التسجيل */}
          <div className={styles.navAction}>
            <button className={styles.registerBtn}>سجّل مؤسستك</button>
          </div>

          {/* المنتصف: روابط التنقل */}
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={styles.activeLink}>
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/security">الأمان</Link>
            </li>
            <li>
              <Link href="/modules">الوحدات</Link>
            </li>
            <li>
              <Link href="/how-it-works">كيف يعمل</Link>
            </li>
            <li>
              <Link href="/contact">تواصل معنا</Link>
            </li>
          </ul>

          {/* أقصى اليمين: الشعار (اللوجو) من مجلد public */}
          <div className={styles.logoContainer}>
            <Link href={"/"}>
              <Logo width={100} height={100} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
