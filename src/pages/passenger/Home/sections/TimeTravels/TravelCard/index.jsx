import { Bus } from "lucide-react";

import Badge from "../../../../../../components/ui/Badge";

import styles from "../timeTravels.module.css";

export default function TravelCard({ travel }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Badge content="Diário" className={styles.conventional} />

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
    </div>
  );
}
