import { CircleCheck, RouteIcon, TrendingUp, Users } from "lucide-react";
import MetricCard from "./MetricCard";
import styles from "./metricGrid.module.css";

export default function MetricGrid() {
  return (
    <section className={styles.metricGrid}>
      <MetricCard
        title="PASSAGEIROS ATIVOS"
        value="1.284"
        icon={<Users className={styles.iconBlue} />}
        badge={
          <span className={styles.badgeTrend}>
            <TrendingUp /> 12%
          </span>
        }
      />

      <MetricCard
        title="ROTAS EM OPERAÇÃO"
        value="42"
        icon={<RouteIcon className={styles.iconBlue} />}
        badge={
          <span className={styles.badgeStatus}>
            <CircleCheck /> Estável
          </span>
        }
      />
    </section>
  );
}
