import { Bus } from "lucide-react";
import styles from "../timeTravels.module.css";

export default function TravelCard({ travel }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span
          className={`${styles.badge} ${travel.isExecutive ? styles.executive : styles.conventional}`}
        >
          {travel.type}
        </span>
        <span className={styles.busIcon}>
          <Bus />
        </span>
      </div>

      <h3 className={styles.routeTitle}>
        {travel.origin} <span>&rarr;</span> {travel.destination}
      </h3>

      <div className={styles.timeline}>
        {travel.stops.map((stop, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineGraph}>
              <div className={`${styles.dot} ${styles[stop.type]}`} />
              {index < travel.stops.length - 1 && (
                <div className={styles.line} />
              )}
            </div>

            <div className={styles.timelineContent}>
              <span className={styles.stopLabel}>{stop.label}</span>
              <h4 className={styles.stopLocation}>{stop.location}</h4>
              <span
                className={`${styles.stopTime} ${styles[stop.type + "Time"]}`}
              >
                {stop.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {travel.hasDetails && (
        <button className={styles.detailsButton}>Ver detalhes da rota</button>
      )}
    </div>
  );
}
