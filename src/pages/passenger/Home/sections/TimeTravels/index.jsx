import { tripsData } from "../../../../../data/trips";

import TravelCard from "./TravelCard";

import styles from "./timeTravels.module.css";

export default function TimeTravels() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Próximos Horários</h2>
        <p>Confira as paradas e horários em tempo real.</p>
      </header>

      <div className={styles.cardsList}>
        {tripsData.map((travel) => (
          <TravelCard key={travel.id} travel={travel} />
        ))}
      </div>
    </section>
  );
}
