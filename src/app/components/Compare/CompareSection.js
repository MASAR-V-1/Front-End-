import styles from "./CompareSection.module.css";
import CompareHeader from "./CompareHeader/CompareHeader";
import VisualGraph from "./VisualGraph/VisualGraph";
import ComparisonCards from "./ComparisonCards/ComparisonCards";

export default function CompareSection() {
  return (
    <section id="compare" className={styles.container}>
      <CompareHeader />
      <VisualGraph />
      <ComparisonCards />
    </section>
  );
}
