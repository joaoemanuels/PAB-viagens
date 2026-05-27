import { BusFront, CalendarDays, Clock3, MapPinned } from "lucide-react";
import styles from "./quickFilters.module.css";

export default function QuickFilters() {
  return (
    <section className={styles.quickFilters}>
      <button className={`${styles.filter} ${styles.active}`}>
        <CalendarDays size={18} />
        Hoje
      </button>

      <button className={styles.filter}>
        <CalendarDays size={18} />
        Amanhã
      </button>

      <button className={styles.filter}>
        <BusFront size={18} />
        Ônibus
      </button>

      <button className={styles.filter}>
        <Clock3 size={18} />
        Horários
      </button>

      <button className={styles.filter}>
        <MapPinned size={18} />
        Próximos
      </button>
    </section>
  );
}
