import UpcomingTripCard from "./UpcomingTripCard";
import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips() {
  return (
    <section className={styles.upcomingTrips}>
      <div className={styles.header}>
        <p>Próximas Viagens</p>

        <span>Ver todas</span>
      </div>

      <UpcomingTripCard />
      <UpcomingTripCard />
    </section>
  );
}
