import { TripsData } from "../../../../data/trips";
import UpcomingTripCard from "./UpcomingTripCard";
import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips() {
  return (
    <section className={styles.upcomingTrips}>
      <div className={styles.header}>
        <p>Próximas Viagens</p>

        <span>Ver todas</span>
      </div>

      {TripsData.map((trip) => (
        <UpcomingTripCard
          key={trip.id}
          tripId={trip.id}
          category={trip.category}
          route={trip.route}
          price={trip.price}
          departure={trip.departure}
          seatsRemaining={trip.seatsRemaining}
        />
      ))}
    </section>
  );
}
