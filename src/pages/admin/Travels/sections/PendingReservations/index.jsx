import { ClipboardClock } from "lucide-react";
import styles from "./pendingReservations.module.css";

const PENDING_DATA = [
  {
    id: 1,
    name: "Ricardo Silveira",
    flight: "#902",
    type: "Executivo",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: 2,
    name: "Mariana Costa",
    flight: "#902",
    type: "Convencional",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
];

export default function PendingReservations() {
  const handleAction = (id, actionType) => {
    console.log(`Reserva ${id} - Ação: ${actionType}`);
  };

  return (
    <section className={styles.pendingReservations}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <ClipboardClock className={styles.headerIcon} />
            <h2>Reservas Pendentes</h2>
          </div>
          <span className={styles.alertBadge}>2 NOVAS</span>
        </header>

        <div className={styles.list}>
          {PENDING_DATA.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.profileRow}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={styles.avatar}
                />
                <div className={styles.metaData}>
                  <h3>{item.name}</h3>
                  <p>
                    Voo {item.flight} • {item.type}
                  </p>
                </div>
              </div>

              <div className={styles.actionGrid}>
                <button
                  type="button"
                  className={`${styles.btnAction} ${styles.btnApprove}`}
                  onClick={() => handleAction(item.id, "approve")}
                >
                  Aprovar
                </button>
                <button
                  type="button"
                  className={`${styles.btnAction} ${styles.btnWait}`}
                  onClick={() => handleAction(item.id, "wait")}
                >
                  Espera
                </button>
                <button
                  type="button"
                  className={`${styles.btnAction} ${styles.btnReject}`}
                  onClick={() => handleAction(item.id, "reject")}
                >
                  Rejeitar
                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={styles.viewFullQueueButton}
          onClick={() => console.log("Visualizar fila completa")}
        >
          Visualizar Fila Completa
        </button>
      </div>
    </section>
  );
}
