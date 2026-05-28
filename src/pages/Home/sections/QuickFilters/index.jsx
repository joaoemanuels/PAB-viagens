import { useState } from "react";

import { CalendarDays, Clock3 } from "lucide-react";
import styles from "./quickFilters.module.css";
import UpcomingTrips from "../UpcomingTrips";
import TimeTravels from "../TimeTravels";

const Filters = {
  HOJE: "hoje",
  PROXIMAS: "proximas",
  HORARIOS: "horarios",
};

export default function QuickFilters() {
  const [activeFilters, setActiveFilters] = useState(Filters.HOJE);

  return (
    <section>
      <div className={styles.filterList} role="filterlist">
        <button
          role="tab"
          aria-selected={activeFilters === Filters.HOJE}
          className={`${styles.filter} ${activeFilters === Filters.HOJE ? styles.active : ""}`}
          onClick={() => setActiveFilters(Filters.HOJE)}
        >
          <CalendarDays size={18} />
          Hoje
        </button>

        <button
          role="tab"
          aria-selected={activeFilters === Filters.PROXIMAS}
          className={`${styles.filter} ${activeFilters === Filters.PROXIMAS ? styles.active : ""}`}
          onClick={() => setActiveFilters(Filters.PROXIMAS)}
        >
          <CalendarDays size={18} />
          Próximas
        </button>

        <button
          role="tab"
          aria-selected={activeFilters === Filters.HORARIOS}
          className={`${styles.filter} ${activeFilters === Filters.HORARIOS ? styles.active : ""}`}
          onClick={() => setActiveFilters(Filters.HORARIOS)}
        >
          <Clock3 size={18} />
          Horários
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeFilters === Filters.HOJE && <UpcomingTrips />}

        {activeFilters === Filters.PROXIMAS && <UpcomingTrips />}

        {activeFilters === Filters.HORARIOS && <TimeTravels />}
      </div>
    </section>
  );
}
