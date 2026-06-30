import Navbar from "./_components/Navbar";
import OnboardingHeader from "./_components/OnboardingHeader";
import ProgressSidebar from "./_components/ProgressSidebar";
import OrganizationForm from "./_components/OrganizationForm";
import styles from "./onboarding-page.module.css";

export default function OnboardingPage() {
  return (
    <div className={styles.container}>
      {/* الشعار واسم الحساب في أعلى الصفحة مباشرة */}
      <Navbar />

      {/* هيدر نسبة الإكمال 70% */}
      <OnboardingHeader />

      {/* تقسيم الشاشة السفلي للاستمارة والسايدبار */}
      <div className={styles.contentLayout}>
        {/* الشق الأيمن: الاستمارة الرئيسية */}
        <main className={styles.mainContent}>
          <OrganizationForm />
        </main>

        {/* الشق الأيسر: الخطوات والتنبيهات */}
        <aside className={styles.sidebarContent}>
          <ProgressSidebar />
        </aside>
      </div>
    </div>
  );
}
