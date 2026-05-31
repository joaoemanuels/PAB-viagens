import { Clock } from "lucide-react";
import styles from "./nextTripCard.module.css";

export default function NextTripCard() {
  return (
    <section className={styles.nextTripCard}>
      <div className={styles.nextTripContainer}>
        <div className={styles.nextTripGrid}>
          <div className={styles.nextTripLeft}>
            <h2>PRÓXIMA VIAGEM</h2>
            <p>
              14:30 para <br /> Campinas
            </p>
          </div>

          <div className={styles.nextTripRight}>
            <p>PLACA: ABC-1234</p>
          </div>
        </div>

        <div className={styles.tripImage}>
          <Clock />
          <span>Saída em 24 minutos</span>
        </div>
      </div>
    </section>
  );
}
