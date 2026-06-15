import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import React from "react";
import { ArrowLeft, Dot, CircleCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.blurBlob1}></div>
      <div className={styles.blurBlob2}></div>
      <div className={styles.blurBlobCenter}></div>
      <div className="container">
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              <span className={styles.bdg}>
                <Dot size={50} color={"#006A63"} />
                <p>مساحة عمل رقمية متكاملة</p>
              </span>
            </span>

            <h1 className={styles.title}>كل عمليات مؤسستك في مَسَار واحد</h1>

            <p className={styles.description}>
              مساحة عمل رقمية متكاملة تمكنك من تنظيم مهام فريقك، تتبع البيانات،
              وإدارة أصول مؤسستك في مكان واحد وبأعلى كفاءة مستندة إلى الذكاء
              الاصطناعي.
            </p>
            <div className={styles.heroActions}>
              <Link href="/register" className={styles.primaryBtn}>
                <div className={styles.rgbtn}>
                  سجل مؤسستك
                  <ArrowLeft />
                </div>
              </Link>
            </div>
            <div className={styles.check}></div>
          </div>
          {/* الشق الأيسر: لوحة التحكم المصنوعة يدوياً مع كتابات حقيقية */}
          <div className={styles.heroVisual}>
            <div className={styles.mockupDashboard}>
              {/* 1. الشريط الجانبي (Sidebar) */}
              <div className={styles.mockupSidebar}>
                <div className={styles.sidebarCircle}>م</div>{" "}
                {/* أول حرف من مسار كشعار مصغر */}
                <div className={styles.sidebarItemActive}>الرئيسية</div>
                <div className={styles.sidebarItem}>المشاريع</div>
                <div className={styles.sidebarItem}>التقارير</div>
                <div className={styles.sidebarItem}>الإعدادات</div>
              </div>

              {/* 2. المحتوى الرئيسي (Main Content) */}
              <div className={styles.mockupMain}>
                {/* البار العلوي للوحة التحكم */}
                <div className={styles.mockupHeader}>
                  <div className={styles.headerInfo}>
                    <span className={styles.welcomeText}>أهلاً بك مجدداً</span>
                    <h4 className={styles.dashboardUser}>
                      لوحة الإدارة للشركة
                    </h4>
                  </div>
                  <div className={styles.headerAvatar}>م س</div>
                </div>

                {/* الكروت الإحصائية بالأرقام والكتابات */}
                <div className={styles.mockupCards}>
                  <div className={styles.mockupCard}>
                    <span className={styles.cardTitle}>المشاريع النشطة</span>
                    <div className={styles.cardFlex}>
                      <span className={styles.cardNumber}>12</span>
                      <span className={styles.cardBadge}>+4 هذا الشهر</span>
                    </div>
                  </div>

                  <div className={styles.mockupCard}>
                    <span className={styles.cardTitle}>إجمالي الإنجاز</span>
                    <div className={styles.cardFlex}>
                      <span className={styles.cardNumber}>84%</span>
                      <div className={styles.miniProgressBar}>
                        <div className={styles.miniProgressFill}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* منطقة الرسم البياني والتقارير الحية */}
                <div className={styles.mockupChart}>
                  <div className={styles.chartHeader}>
                    <span className={styles.chartTitle}>معدل نمو العمليات</span>
                    <span className={styles.chartPeriod}>آخر 6 أشهر</span>
                  </div>

                  {/* تمثيل الأعمدة البيانية (Bar Chart) بالكتابات */}
                  <div className={styles.chartBars}>
                    <div className={styles.chartBarCol}>
                      <div className={styles.barFill1}></div>
                      <span>يناير</span>
                    </div>
                    <div className={styles.chartBarCol}>
                      <div className={styles.barFill2}></div>
                      <span>فبراير</span>
                    </div>
                    <div className={styles.chartBarCol}>
                      <div className={styles.barFill3}></div>
                      <span>مارس</span>
                    </div>
                    <div className={styles.chartBarCol}>
                      <div className={styles.barFill4}></div>
                      <span>أبريل</span>
                    </div>
                    <div className={styles.chartBarCol}>
                      <div className={styles.barFill5}></div>
                      <span>مايو</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
