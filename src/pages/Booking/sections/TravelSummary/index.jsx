import { CalendarDays, Clock, MoveRight } from "lucide-react";
import styles from "./travelSummary.module.css";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatDate } from "../../../../utils/formatDate";

export default function TravelSummary({
  price,
  origin,
  destination,
  date,
  departure,
}) {
  return (
    <article className={styles.travelSummary}>
      <div className={styles.travelSummaryContainer}>
        <div className={styles.header}>
          <span className={styles.sectionTitle}>Resumo da viagem</span>
          <span className={styles.priceBadge}>{formatCurrency(price)}</span>
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
              <time className={styles.metaValue}>{formatDate(date)}</time>
            </div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.iconWrapper}>
              <Clock />
            </div>
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Horário</span>
              <time className={styles.metaValue}>{departure}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
