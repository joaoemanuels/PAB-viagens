import styles from "./metricCard.module.css";

export default function MetricCard({ title, value, icon, badge }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.badgeWrapper}>{badge}</div>
      </div>

      <div className={styles.cardBody}>
        <strong className={styles.value}>{value}</strong>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </article>
  );
}
