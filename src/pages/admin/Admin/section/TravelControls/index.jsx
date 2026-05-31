import { CircleStop, PlayCircle } from "lucide-react";
import styles from "./travelControls.module.css";

export default function TravelControls() {
  return (
    <section className={styles.travelControls}>
      <div className={styles.travelControlsGrid}>
        <div className={`${styles.travelControlLeft} ${styles.travelControl}`}>
          <PlayCircle />
          <p>Iniciar Viagem</p>
        </div>
        <div className={`${styles.travelControlRight} ${styles.travelControl}`}>
          <CircleStop />
          <p>Encerrar Viagem</p>
        </div>
      </div>
    </section>
  );
}
