import styles from "./ModulesSection.module.css";
import SectionHeader from "./SectionHeader";
import CoreModules from "./CoreModules";
import AdditionalModules from "./AdditionalModules";

export default function ModulesSection() {
  return (
    <section id="modules" className={styles.sectionContainer}>
      <div className={styles.container}>
        <SectionHeader />
        <CoreModules />
        <AdditionalModules />
      </div>
    </section>
  );
}
