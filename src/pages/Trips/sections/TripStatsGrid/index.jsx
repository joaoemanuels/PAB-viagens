import { Banknote, Clock, Hourglass } from "lucide-react";
import styles from "./tripStatsGrid.module.css";
import { formatCurrency } from "../../../../utils/formatCurrency";

export default function TripStatsGrid({ price, departure, arrival }) {
  return (
    <section className={styles.tripStatsGrid}>
      <div className={styles.tripStatsGridCard}>
        <Clock />
        <p>Saída</p>
        <span>{departure} </span>
      </div>

      <div className={styles.tripStatsGridCard}>
        <Hourglass />
        <p>Chegada</p>
        <span>{arrival}</span>
      </div>

      <div
        className={styles.tripStatsGridCard}
        style={{ backgroundColor: "#0058BC", color: "#fff" }}
      >
        <Banknote style={{ color: "#fff" }} />
        <p style={{ color: "#D8E2FF" }}>Preço</p>
        <span style={{ color: "#fff" }}>{formatCurrency(price)}</span>
      </div>
    </section>
  );
}
