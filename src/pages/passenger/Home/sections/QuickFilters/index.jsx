import { useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import UpcomingTrips from "../UpcomingTrips";
import TimeTravels from "../TimeTravels";

import styles from "./quickFilters.module.css";

const Filters = {
  AMANHA: "Amanhã",
  PROXIMAS: "proximas",
  HORARIOS: "horarios",
};

export default function QuickFilters({ origin, destination }) {
  const [activeFilters, setActiveFilters] = useState(Filters.AMANHA);
  return (
    <section className={styles.quickFilters}>
      <div className={styles.filterList} role="filterlist">
        <button
          role="tab"
          aria-selected={activeFilters === Filters.AMANHA}
          className={`${styles.filter} ${activeFilters === Filters.AMANHA ? styles.active : ""}`}
          onClick={() => setActiveFilters(Filters.AMANHA)}
        >
          <CalendarDays size={18} />
          Amanhã
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
        {activeFilters === Filters.AMANHA && (
          <UpcomingTrips
            filterType="amanha"
            origin={origin}
            destination={destination}
          />
        )}

        {activeFilters === Filters.PROXIMAS && (
          <UpcomingTrips
            filterType="proximas"
            origin={origin}
            destination={destination}
          />
        )}

        {activeFilters === Filters.HORARIOS && (
          <TimeTravels origin={origin} destination={destination} />
        )}
      </div>
    </section>
  );
}
