import styles from "./upcomingTripCard.module.css";

import { BusFront, Clock3 } from "lucide-react";

export default function UpcomingTripCard() {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.tripInfo}>
          <div className={styles.category}>
            <BusFront size={14} />

            <span>EXECUTIVO</span>
          </div>

          <h3>São Paulo → Campinas</h3>
        </div>

        <div className={styles.price}>
          <span>R$</span>

          <strong>45,90</strong>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.time}>
          <Clock3 size={16} />

          <span>Partida: 14:30</span>
        </div>

        <div className={styles.seats}>4 lugares restantes</div>
      </div>

      <button className={styles.button}>Reservar</button>
    </div>
  );
}
