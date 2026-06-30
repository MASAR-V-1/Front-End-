import OnboardingHeader from "./_components/OnboardingHeader";
import ProgressSidebar from "./_components/ProgressSidebar";
import OrganizationForm from "./_components/OrganizationForm";
import styles from "./onboarding-page.module.css";

export default function OnboardingPage() {
  return (
    <div className={styles.container}>
      <OnboardingHeader />

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
