import { Bell, CircleCheck, CircleX, LogOut, UserX } from "lucide-react";
import styles from "./passengerCard.module.css";

const STATUS_CONFIG = {
  CONFIRMADO: { label: "CONFIRMADO", class: styles.statusConfirmed },
  AGUARDANDO: { label: "AGUARDANDO", class: styles.statusWaiting },
  EMBARCADO: { label: "EMBARCADO", class: styles.statusBoarded },
};

export default function PassengerCard({ passenger }) {
  const { name, seat, status, avatar } = passenger;

  const renderActions = () => {
    if (status === "EMBARCADO") {
      return (
        <button className={styles.btnDisembark} type="button">
          <LogOut /> Desembarcar
        </button>
      );
    }

    return (
      <div className={styles.actionGrid}>
        <button
          className={`${styles.btnAction} ${styles.btnCheckin}`}
          type="button"
        >
          <CircleCheck /> Check-in
        </button>
        <button
          className={`${styles.btnAction} ${styles.btnNoShow}`}
          type="button"
        >
          <UserX /> Falta
        </button>
        <button
          className={`${styles.btnAction} ${styles.btnCancel}`}
          type="button"
        >
          <CircleX /> Cancelar
        </button>
      </div>
    );
  };

  const cardClassName = `${styles.passengerCard} ${
    status === "EMBARCADO" ? styles.cardBoarded : ""
  }`;

  return (
    <article className={cardClassName}>
      <div className={styles.infoRow}>
        <div className={styles.profileGroup}>
          <div className={styles.avatarWrapper}>
            <img src={avatar} alt={name} className={styles.avatar} />
            {passenger.id === 1 && (
              <span className={styles.avatarBadge}>🧳</span>
            )}
          </div>

          <div className={styles.metaData}>
            <h3>{name}</h3>
            <div className={styles.seatGroup}>
              <span className={styles.seatBadge}>POLTRONA {seat}</span>
            </div>
          </div>
        </div>

        <span
          className={`${styles.statusBadge} ${STATUS_CONFIG[status].class}`}
        >
          {STATUS_CONFIG[status].label}
        </span>
      </div>

      <div className={styles.actionsArea}>{renderActions()}</div>
    </article>
  );
}
