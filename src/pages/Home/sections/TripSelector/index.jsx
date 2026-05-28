import { Locate, MapPin, Search } from "lucide-react";
import styles from "./tripSelector.module.css";

// TripSelector.jsx
export default function TripSelector({
  origin,
  setOrigin,
  destination,
  setDestination,
}) {
  return (
    <section className={styles.tripSelector}>
      <div className={styles.tripSelectorContainer}>
        <div className={styles.tripSelectorLocate}>
          <Locate className={styles.iconStart} size={20} />
          <input
            type="text"
            placeholder="De onde você sai?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>

        <div className={styles.tripSelectorLocate}>
          <MapPin className={styles.iconEnd} size={20} />
          <input
            type="text"
            placeholder="Para onde quer ir?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <button className={styles.button}>
          <Search size={20} />
          <span>Buscar Viagens</span>
        </button>
      </div>
    </section>
  );
}
