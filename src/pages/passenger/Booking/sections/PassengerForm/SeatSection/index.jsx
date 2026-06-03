import { Armchair, Minus, Plus } from "lucide-react";

import styles from "./seatSection.module.css";

export default function SeatSection({ seats, onSeatsChange }) {
  return (
    <div className={styles.seatSection}>
      <div className={styles.seatInfo}>
        <div className={styles.seatIconWrapper}>
          <Armchair />
        </div>
        <div className={styles.seatTexts}>
          <span className={styles.seatTitle}>Quantidade de Assentos</span>
          <span className={styles.seatSubtitle}>Máximo de 12</span>
        </div>
      </div>

      <div className={styles.stepper}>
        <button
          type="button"
          onClick={() => seats > 1 && onSeatsChange(seats - 1)}
          disabled={seats <= 1}
          className={styles.stepperButton}
          aria-label="Diminuir assentos"
        >
          <Minus />
        </button>
        <span className={styles.stepperValue}>{seats}</span>
        <button
          type="button"
          onClick={() => seats < 12 && onSeatsChange(seats + 1)}
          disabled={seats >= 12}
          className={`${styles.stepperButton} ${styles.stepperButtonPrimary}`}
          aria-label="Aumentar assentos"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
