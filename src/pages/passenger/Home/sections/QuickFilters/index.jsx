import { useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import UpcomingTrips from "../UpcomingTrips";
import TimeTravels from "../TimeTravels";

import styles from "./quickFilters.module.css";

const Filters = {
  TODAS: "todas",
  HORARIOS: "horarios",
};

export default function QuickFilters({ origin, destination }) {
  const [activeFilters, setActiveFilters] = useState(Filters.TODAS);

  return (
    <section className={styles.quickFilters}>
      <div className={styles.filterList} role="filterlist">
        <button
          role="tab"
          aria-selected={activeFilters === Filters.TODAS}
          className={`${styles.filter} ${activeFilters === Filters.TODAS ? styles.active : ""}`}
          onClick={() => setActiveFilters(Filters.TODAS)}
        >
          <CalendarDays size={18} />
          Viagens
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
        {activeFilters === Filters.TODAS && (
          <UpcomingTrips origin={origin} destination={destination} />
        )}

        {activeFilters === Filters.HORARIOS && (
          <TimeTravels origin={origin} destination={destination} />
        )}
      </div>
    </section>
  );
}
