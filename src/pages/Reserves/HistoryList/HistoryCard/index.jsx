// HistoryCard.jsx

import styles from "./historyCard.module.css";

export default function HistoryCard({ data }) {
  const { statusLabel, trip } = data;

  const date = new Date(data.bookingDate);

  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className={styles.historyCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.badgeDone}>{statusLabel}</span>

          <span className={styles.dateText}>
            {formattedDate}, {formattedTime}
          </span>
        </div>

        <span className={styles.price}>R$ {trip.price.toFixed(2)}</span>
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
