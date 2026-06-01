import { supabase } from "../../../../../services/supabase/supabase.js";
import { CircleCheck, CircleX, LogOut, UserX } from "lucide-react";

import styles from "./passengerCard.module.css";

const STATUS_CONFIG = {
  CONFIRMED: { label: "CONFIRMADO", class: styles.statusConfirmed },
  PENDING: { label: "AGUARDANDO", class: styles.statusWaiting },
  CHECKED_IN: { label: "EMBARCADO", class: styles.statusBoarded },
  CANCELLED: { label: "CANCELADO", class: styles.statusWaiting },
};

export default function PassengerCard({ passenger }) {
  const { id, name, seat, status, avatar } = passenger;

  const updateStatus = async (newStatus) => {
    await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
  };

  const renderActions = () => {
    if (status === "CHECKED_IN") {
      return (
        <button
          className={styles.btnDisembark}
          type="button"
          onClick={() => updateStatus("confirmed")}
        >
          <LogOut /> Desembarcar
        </button>
      );
    }

    return (
      <div className={styles.actionGrid}>
        <button
          className={`${styles.btnAction} ${styles.btnCheckin}`}
          type="button"
          onClick={() => updateStatus("checked_in")}
        >
          <CircleCheck /> Check-in
        </button>
        <button
          className={`${styles.btnAction} ${styles.btnNoShow}`}
          type="button"
          onClick={() => updateStatus("cancelled")}
        >
          <UserX /> Falta
        </button>
        <button
          className={`${styles.btnAction} ${styles.btnCancel}`}
          type="button"
          onClick={() => updateStatus("cancelled")}
        >
          <CircleX /> Cancelar
        </button>
      </div>
    );
  };

  const statusKey = status in STATUS_CONFIG ? status : "PENDING";

  return (
    <article
      className={`${styles.passengerCard} ${status === "CHECKED_IN" ? styles.cardBoarded : ""}`}
    >
      <div className={styles.infoRow}>
        <div className={styles.profileGroup}>
          <div className={styles.avatarWrapper}>
            <img src={avatar} alt={name} className={styles.avatar} />
          </div>

          <div className={styles.metaData}>
            <h3>{name}</h3>
            <div className={styles.seatGroup}>
              <span className={styles.seatBadge}>POLTRONA {seat}</span>
            </div>
          </div>
        </div>

        <span
          className={`${styles.statusBadge} ${STATUS_CONFIG[statusKey].class}`}
        >
          {STATUS_CONFIG[statusKey].label}
        </span>
      </div>

      <div className={styles.actionsArea}>{renderActions()}</div>
    </article>
  );
}
