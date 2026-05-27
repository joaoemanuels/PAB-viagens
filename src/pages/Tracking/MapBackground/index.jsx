import styles from "./mapBackground.module.css";
import StatusBarOverlay from "./StatusBarOverlay";

export default function MapBackground() {
  return (
    <section className={styles.mapBackground}>
      <StatusBarOverlay />
      <h1>teste</h1>
    </section>
  );
}
