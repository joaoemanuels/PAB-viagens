import { CalendarDays, Clock, MoveRight } from "lucide-react";
import styles from "./travelSummary.module.css";

export default function TravelSummary({
  price,
  origin,
  destination,
  date,
  time,
}) {
  return (
    <article className={styles.travelSummary}>
      <div className={styles.travelSummaryContainer}>
        <div className={styles.header}>
          <span className={styles.sectionTitle}>Resumo da viagem</span>
          <span className={styles.priceBadge}>
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <h2 className={styles.route}>
          {origin} <MoveRight />
          {destination}
        </h2>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <div className={styles.iconWrapper}>
              <CalendarDays />
            </div>
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Data</span>
              <time className={styles.metaValue}>{date}</time>
            </div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.iconWrapper}>
              <Clock />
            </div>
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Horário</span>
              <time className={styles.metaValue}>{time}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
