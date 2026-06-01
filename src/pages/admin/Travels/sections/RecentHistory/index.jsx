import { History } from "lucide-react";
import styles from "./recentHistory.module.css";

const HISTORY_DATA = [
  {
    id: 882,
    title: "Voo Rodoviário",
    status: "Concluída",
    currentPax: 24,
    maxPax: 26,
  },
  {
    id: 714,
    title: "Voo Rodoviário",
    status: "Concluída",
    currentPax: 22,
    maxPax: 26,
  },
];

export default function RecentHistory() {
  return (
    <section className={styles.recentHistory}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <History className={styles.headerIcon} />
            <h2>Histórico Recente</h2>
          </div>
          <button
            className={styles.viewAllButton}
            onClick={() => console.log("Ver todos clicado")}
            type="button"
          >
            Ver todos
          </button>
        </header>

        <div className={styles.list}>
          {HISTORY_DATA.map((trip) => {
            const progressPercentage = (trip.currentPax / trip.maxPax) * 100;

            return (
              <article key={trip.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.tripInfo}>
                    <strong>#{trip.id}</strong> {trip.title}
                  </span>
                  <span className={styles.statusBadge}>{trip.status}</span>
                </div>

                <div className={styles.progressRow}>
                  <div
                    className={styles.progressBarTrack}
                    role="progressbar"
                    aria-valuenow={trip.currentPax}
                    aria-valuemin="0"
                    aria-valuemax={trip.maxPax}
                  >
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  <span className={styles.paxCounter}>
                    {trip.currentPax}/{trip.maxPax} pax
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
