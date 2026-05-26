import styles from "./capacityTracker.module.css";

export default function CapacityTracker() {
  const totalSeats = 15;
  const occupiedSeats = 12;

  const percentage = (occupiedSeats / totalSeats) * 100;
  const freeSeats = totalSeats - occupiedSeats;

  return (
    <section className={styles.capacityTracker}>
      <div className={styles.capacityTrackerContainer}>
        <div className={styles.capacityTrackerHeader}>
          <h2>Ocupação de Assentos</h2>
          <p>
            {occupiedSeats}/{totalSeats}
          </p>
        </div>

        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className={styles.capacityTrackerFooter}>
          <p>{percentage}% preenchido</p>
          <p>{freeSeats} assentos livres</p>
        </div>
      </div>
    </section>
  );
}
