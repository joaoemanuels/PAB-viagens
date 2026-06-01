import { Star } from "lucide-react";
import styles from "./driverProfile.module.css";

export default function DriverProfile({
  name = "Motorista",
  rating = 0,
  tripsCount = "0",
  avatarUrl = "",
}) {
  return (
    <section className={styles.profileAdmin}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarUrl}
            alt={`Foto de ${name}`}
            className={styles.avatarImage}
          />
          <span className={styles.proBadge}>PRO</span>
        </div>

        <div className={styles.infoWrapper}>
          <h2 className={styles.driverName}>{name}</h2>

          <div className={styles.metaRow}>
            <div className={styles.ratingBadge}>
              <Star size={12} fill="#059669" stroke="#059669" />
              <span>{rating.toFixed(1)}</span>
            </div>

            <span className={styles.dotDivider}>•</span>

            <span className={styles.tripsCount}>{tripsCount} viagens</span>
          </div>
        </div>
      </div>
    </section>
  );
}
