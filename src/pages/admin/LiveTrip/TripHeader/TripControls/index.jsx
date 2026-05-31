import { PauseIcon, RadioIcon, StopCircleIcon } from "lucide-react";
import styles from "./tripControls.module.css";

export default function TripControls({ onPause, onEnd, onBroadcast }) {
  return (
    <section className={styles.tripControls}>
      <button type="button" className={styles.btnPause} onClick={onPause}>
        <PauseIcon className={styles.icon} />
        <span>Pausar Viagem</span>
      </button>

      <div className={styles.secondaryRow}>
        <button type="button" className={styles.btnEnd} onClick={onEnd}>
          <StopCircleIcon className={styles.iconSecondary} />
          <span>Encerrar</span>
        </button>

        <button
          type="button"
          className={styles.btnBroadcast}
          onClick={onBroadcast}
        >
          <RadioIcon className={styles.iconSecondary} />
          <span>Broadcast</span>
        </button>
      </div>
    </section>
  );
}
