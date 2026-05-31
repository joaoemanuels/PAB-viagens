import { Calendar, Clock, Rocket } from "lucide-react";

import styles from "./reserveCard.module.css";
import { formatCurrency } from "../../../../../utils/formatCurrency";

export default function ReserveCard({ data }) {
  const { status, statusLabel, trip } = data;

  const isProgress = status === "IN_PROGRESS";

  const badgeClass = isProgress ? styles.badgeProgress : styles.badgeConfirmed;

  const buttonClass = isProgress ? styles.btnPrimary : styles.btnOutline;

  const buttonText = isProgress ? "Rastrear" : "Ver Ticket";

  return (
    <article className={styles.reserveCard}>
      <div className={styles.cardHeader}>
        <span className={`${styles.badge} ${badgeClass}`}>
          {isProgress ? "⏳ " : "✓ "}
          {statusLabel}
        </span>

        <span className={styles.price}>{formatCurrency(trip.price)}</span>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div
            className={`${styles.dot} ${
              isProgress ? styles.dotBlue : styles.dotGray
            }`}
          />

          <div className={styles.locationInfo}>
            <label>ORIGEM</label>
            <p>{trip.origin}</p>
          </div>
        </div>

        <div className={styles.line} />

        <div className={styles.timelineItem}>
          <div className={`${styles.dot} ${styles.dotDest}`} />

          <div className={styles.locationInfo}>
            <label>DESTINO</label>
            <p>{trip.destination}</p>
          </div>
        </div>
      </div>

      <div className={styles.footerInfo}>
        <div className={styles.infoGroup}>
          <span>
            <Calendar size={18} />
          </span>

          <p>{trip.date}</p>
        </div>

        <div className={styles.infoGroup}>
          <span>
            <Clock size={18} />
          </span>

          <p>{trip.departure}</p>
        </div>
      </div>

      <button className={`${styles.btnAction} ${buttonClass}`}>
        {isProgress && (
          <span style={{ marginRight: 8 }}>
            <Rocket size={18} />
          </span>
        )}

        {buttonText}
      </button>
    </article>
  );
}
