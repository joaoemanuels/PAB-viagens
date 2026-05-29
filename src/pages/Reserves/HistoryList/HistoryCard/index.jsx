import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatDate } from "../../../../utils/formatDate";
import styles from "./historyCard.module.css";

export default function HistoryCard({ data }) {
  const { statusLabel, trip } = data;

  return (
    <article className={styles.historyCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.badgeDone}>{statusLabel}</span>

          <span className={styles.dateText}>
            {formatDate(data.bookingDate)}, {data.bookingTime}
          </span>
        </div>

        <span className={styles.price}>{formatCurrency(trip.price)}</span>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.dotOrigin} />

          <div className={styles.locationInfo}>
            <label>ORIGEM</label>

            <p>{trip.origin}</p>
          </div>
        </div>

        <div className={styles.line} />

        <div className={styles.timelineItem}>
          <div className={styles.dotDest} />

          <div className={styles.locationInfo}>
            <label>DESTINO</label>

            <p>{trip.destination}</p>
          </div>
        </div>
      </div>

      <div className={styles.actionGroup}>
        <button
          className={styles.btnSecondary}
          onClick={() => console.log("Detalhes")}
        >
          Ver Detalhes
        </button>

        <button
          className={styles.btnAction}
          onClick={() => console.log("Repetir")}
        >
          Repetir
        </button>
      </div>
    </article>
  );
}
