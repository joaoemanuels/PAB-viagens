import { Banknote, Clock, Hourglass } from "lucide-react";
import styles from "./tripStatsGrid.module.css";

export default function TripStatsGrid() {
  return (
    <section className={styles.tripStatsGrid}>
      <div className={styles.tripStatsGridCard}>
        <Clock />
        <p>Departure</p>
        <span>10:00</span>
      </div>

      <div className={styles.tripStatsGridCard}>
        <Hourglass />
        <p>ETA</p>
        <span>10:15</span>
      </div>

      <div
        className={styles.tripStatsGridCard}
        style={{ backgroundColor: "#0058BC", color: "#fff" }}
      >
        <Banknote style={{ color: "#fff" }} />
        <p style={{ color: "#D8E2FF" }}>Preço</p>
        <span style={{ color: "#fff" }}>R$ 10,00</span>
      </div>
    </section>
  );
}
