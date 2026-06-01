import { BusIcon, ClockIcon, RouteIcon } from "lucide-react";
import styles from "./tripRoute.module.css";

export default function TripRoute({ trip }) {
  const status = trip?.status === "in_progress" ? "EM ANDAMENTO" : "AGENDADA";
  const origin = trip?.routes?.origin ?? "—";
  const destination = trip?.routes?.destination ?? "—";
  const line = trip?.routes?.type ?? "—";
  const vehicle = trip?.routes?.vehicle_plate ?? "—";
  const eta = trip?.arrival_time ?? "—";

  return (
    <section className={styles.tripRoute}>
      <div className={styles.statusBadge}>
        <span className={styles.statusDot}></span>
        <span className={styles.statusText}>{status}</span>
      </div>

      <h2 className={styles.routeTitle}>
        {origin} <span className={styles.arrow}>→</span> {destination}
      </h2>

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <RouteIcon className={styles.icon} />
          <span>{line}</span>
        </div>
        <span className={styles.dotDivider}>•</span>
        <div className={styles.metaItem}>
          <BusIcon className={styles.icon} />
          <span>{vehicle}</span>
        </div>
      </div>

      <div className={styles.etaRow}>
        <ClockIcon className={styles.etaIcon} />
        <p className={styles.etaText}>
          Chegada estimada: <span className={styles.etaTime}>{eta}</span>
        </p>
      </div>
    </section>
  );
}
