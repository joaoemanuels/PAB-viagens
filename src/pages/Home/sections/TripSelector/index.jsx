import { Locate, MapPin, Search } from "lucide-react";
import styles from "./tripSelector.module.css";

export default function TripSelector() {
  return (
    <section className={styles.tripSelector}>
      <div className={styles.tripSelectorContainer}>
        <div className={styles.tripSelectorLocate}>
          <Locate className={styles.iconStart} size={20} />

          <input type="text" placeholder="De onde você sai?" />
        </div>

        <div className={styles.tripSelectorLocate}>
          <MapPin className={styles.iconEnd} size={20} />

          <input type="text" placeholder="Para onde quer ir?" />
        </div>

        <button className={styles.button}>
          <Search size={20} />

          <span>Buscar Viagens</span>
        </button>
      </div>
    </section>
  );
}
