import {
  AlarmClock,
  Fuel,
  Route,
  TriangleAlert,
} from "lucide-react";
import styles from "./statsDashboard.module.css";

export default function StatsDashboard() {
  return (
    <section className={styles.statsDashboard}>
      <div className={styles.statsDashboardContainer}>
        <div className={styles.statsCard}>
          <Route className={styles.iconRoute} />
          <p>Km total</p>
          <span>142Km</span>
        </div>

        <div className={styles.statsCard}>
          <AlarmClock className={styles.iconClock} />
          <p>Duração</p>
          <span>1h 45min</span>
        </div>

        <div className={styles.statsCard}>
          <Fuel className={styles.iconFuel} />
          <p>Combustível</p>
          <span>85%</span>
        </div>

        <div className={styles.statsCard}>
          <TriangleAlert className={styles.iconAlert} />
          <p>Alertas</p>
          <span>0</span>
        </div>
      </div>
    </section>
  );
}
