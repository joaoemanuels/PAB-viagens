import { CalendarDays, Clock, MoveRight } from "lucide-react";
import styles from "./travelSummary.module.css";

const tripData = {
  title: "Resumo da viagem",
  price: "R$ 45,00",
  origin: "São Paulo",
  destination: "Campinas",
  date: "15 Out, 2023",
  time: "08:30 AM",
};

export default function TravelSummary() {
  return (
    <article className={styles.travelSummary}>
      <div className={styles.travelSummaryContainer}>
        <div className={styles.header}>
          <span className={styles.sectionTitle}>{tripData.title}</span>
          <span className={styles.priceBadge}>{tripData.price}</span>
        </div>

        <h2 className={styles.route}>
          {tripData.origin} <MoveRight />
          {tripData.destination}
        </h2>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <div className={styles.iconWrapper}>
              <CalendarDays />
            </div>
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Data</span>
              <time className={styles.metaValue}>{tripData.date}</time>
            </div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.iconWrapper}>
              <Clock />
            </div>
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Horário</span>
              <time className={styles.metaValue}>{tripData.time}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
