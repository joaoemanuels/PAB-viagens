import styles from "./tripOccupancy.module.css";

export default function TripOccupancy({ current = 0, total = 0 }) {
  const percentage =
    total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0;

  return (
    <section className={styles.tripOccupancy}>
      <div className={styles.info}>
        <span className={styles.label}>OCUPAÇÃO</span>
        <span className={styles.count}>
          {current} / {total} Vagas
        </span>
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={total}
        />
      </div>
    </section>
  );
}
