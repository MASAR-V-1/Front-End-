"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_components/Navbar";
import styles from "./waiting.module.css";

export default function WaitingApprovalPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = async () => {
    setChecking(true);
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch("https://api.masar.org/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.user && data.user.onboarding_status === "approved") {
        localStorage.setItem("user_data", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        alert("الطلب لا يزال قيد المراجعة والدراسة من قِبل إدارة منصة مَسَار.");
      }
    } catch (error) {
      alert("حدث خطأ أثناء فحص حالة الحساب.");
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.contentLayout}>
        {/* الشق الأيمن: المحتوى الرئيسي للتأكيد */}
        <main className={styles.mainContent}>
          <div className={styles.cardHeaderRow}>
            <h2 className={styles.pageTitle}>إعداد ملف المنظمة</h2>
            <div className={styles.statusBadge}>⏳ الحالة: قيد المراجعة</div>
          </div>
          <p className={styles.pageSubtitle}>
            أكمل بيانات منظمتك ليتم إرسالها إلى إدارة منصة مسار للمراجعة.
          </p>

          <div className={styles.mainCard}>
            <div className={styles.successIconContainer}>
              <div className={styles.successIcon}>✓</div>
            </div>

            <h1 className={styles.successTitle}>
              تم إرسال بيانات المؤسسة بنجاح
            </h1>
            <p className={styles.successDesc}>
              تم استلام بيانات مؤسستك وإرسالها إلى فريق مسار للمراجعة. سيتم
              إنشاء مساحة العمل الخاصة بالمؤسسة بعد اعتماد البيانات.
            </p>

            <h3 className={styles.timelineTitle}>🗺️ ماذا يحدث الآن؟</h3>
            <div className={styles.divider}></div>

            {/* شبكة المراحل الأربعة */}
            <div className={styles.stepsGrid}>
              <div className={`${styles.gridCard} ${styles.stepDone}`}>
                <div className={styles.gridCardHeader}>
                  <h4>إكمال البيانات</h4>
                  <span className={styles.checkMark}>✓</span>
                </div>
                <p>تم تعبئة بيانات المؤسسة وإرسالها.</p>
              </div>

              <div className={`${styles.gridCard} ${styles.stepActive}`}>
                <div className={styles.gridCardHeader}>
                  <h4>مراجعة البيانات</h4>
                  <span className={styles.stepIcon}>⏳</span>
                </div>
                <p>يقوم فريق مسار بمراجعة المعلومات والوثائق.</p>
              </div>

              <div className={styles.gridCard}>
                <div className={styles.gridCardHeader}>
                  <h4>اعتماد المؤسسة</h4>
                  <span className={styles.stepIcon}>⚙️</span>
                </div>
                <p>سيتم قبول المؤسسة في حال اكتمال وصحة البيانات.</p>
              </div>

              <div className={styles.gridCard}>
                <div className={styles.gridCardHeader}>
                  <h4>إنشاء مساحة العمل</h4>
                  <span className={styles.stepIcon}>🏢</span>
                </div>
                <p>بعد الاعتماد سيتم إنشاء مساحة العمل الخاصة بمؤسستك.</p>
              </div>
            </div>

            {/* زر تسجيل الخروج السفلي */}
            <button onClick={handleLogout} className={styles.btnLogout}>
              ↩ تسجيل الخروج
            </button>
          </div>
        </main>

        {/* الشق الأيسر: السايدبار الجانبي لـ حالة الطلب */}
        <aside className={styles.sidebarContent}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarCardTitle}>📊 حالة الطلب</h3>
            <div className={styles.verticalSteps}>
              <div className={`${styles.vStep} ${styles.vStepDone}`}>
                <div className={styles.vStepCircle}>✓</div>
                <span className={styles.vStepLabel}>تم إرسال البيانات</span>
              </div>
              <div className={`${styles.vStep} ${styles.vStepActive}`}>
                <div className={styles.vStepCircle}>2</div>
                <div className={styles.vStepTextGroup}>
                  <span className={styles.vStepLabel}>مراجعة الإدارة</span>
                  <span className={styles.vStepSubLabel}>
                    قيد المعالجة حالياً
                  </span>
                </div>
              </div>
              <div className={styles.vStep}>
                <div className={styles.vStepCircle}>3</div>
                <span className={styles.vStepLabel}>إنشاء المساحة</span>
              </div>
            </div>
          </div>

          <div className={styles.noteCard}>
            <div className={styles.noteHeader}>
              <span className={styles.noteIcon}>ℹ</span>
              <h4>ملاحظة هامة</h4>
            </div>
            <p>
              لن تتكمن من استخدام وحدات النظام أو دعوة المستخدمين حتى يتم اعتماد
              بيانات المؤسسة وإنشاء مساحة العمل.
            </p>
          </div>

          <div className={styles.supportCard} onClick={handleCheckStatus}>
            <span className={styles.supportIcon}>🎧</span>
            <div>
              <h4>هل تواجه مشكلة؟</h4>
              <span className={styles.supportLink}>تواصل مع الدعم</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
