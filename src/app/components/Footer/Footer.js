import Link from "next/link";
import styles from "./Footer.module.css";
import { Globe, Mail, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      {/* الجزء العلوي: القوائم والشعار */}
      <div className={styles.topSection}>
        {/* العمود 1: شعار ووصف مسار */}
        <div className={styles.brandColumn}>
          <div className={styles.logoWrapper}>
            {/* يمكنك استبداله بمكون الـ SVG الخاص بشعار مسار المحفوظ عندك */}
            <span className={styles.logoText}>مَسَار</span>
            <div className={styles.logoIcon}></div>
          </div>
          <p className={styles.brandDesc}>
            منصة ذكية لتنظيم العمل المؤسسي، إدارة البيانات، متابعة المهام،
            وتوليد التقارير داخل مساحة عمل آمنة.
          </p>
        </div>

        {/* العمود 2: المنصة */}
        <div className={styles.linksColumn}>
          <h3>المنصة</h3>
          <ul>
            <li>
              <Link href="#hero">الرئيسية</Link>
            </li>
            <li>
              <Link href="#how-it-works">كيف يعمل</Link>
            </li>
            <li>
              <Link href="#modules">الوحدات</Link>
            </li>
            <li>
              <Link href="#security">الأمان</Link>
            </li>
          </ul>
        </div>

        {/* العمود 3: الدعم */}
        <div className={styles.linksColumn}>
          <h3>الدعم</h3>
          <ul>
            <li>
              <Link href="/contact">تواصل معنا</Link>
            </li>
            <li>
              <Link href="/faq">الأسئلة الشائعة</Link>
            </li>
            <li>
              <Link href="/support">الدعم الفني</Link>
            </li>
          </ul>
        </div>

        {/* العمود 4: قانوني */}
        <div className={styles.linksColumn}>
          <h3>قانوني</h3>
          <ul>
            <li>
              <Link href="/privacy">سياسة الخصوصية</Link>
            </li>
            <li>
              <Link href="/terms">الشروط والأحكام</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* الجزء السفلي: الحقوق والأيقونات */}
      <div className={styles.bottomSection}>
        {/* الأيقونات جهة اليسار */}
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Share" className={styles.iconLink}>
            <Share2 size={18} />
          </a>
          <a
            href="mailto:info@masar.com"
            aria-label="Mail"
            className={styles.iconLink}
          >
            <Mail size={18} />
          </a>
          <a href="#" aria-label="Website" className={styles.iconLink}>
            <Globe size={18} />
          </a>
        </div>

        {/* الحقوق جهة اليمين */}
        <div className={styles.copyright}>
          &copy; 2024 مَسَار. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
