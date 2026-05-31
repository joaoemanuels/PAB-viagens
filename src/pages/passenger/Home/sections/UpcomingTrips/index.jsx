import { tripsData } from "../../../../../data/trips";
import UpcomingTripCard from "./UpcomingTripCard";
import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips({ filterType, origin, destination }) {
  const filteredTrips = tripsData.filter((trip) => {
    const matchesOrigin = trip.origin
      ? trip.origin.toLowerCase().includes(origin.toLowerCase().trim())
      : true;

    const matchesDestination = trip.destination
      ? trip.destination
          .toLowerCase()
          .includes(destination.toLowerCase().trim())
      : true;

    let matchesTab = true;

    const today = new Date();

    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (filterType === "hoje") {
      matchesTab = trip.date === todayStr;
    } else if (filterType === "proximas") {
      matchesTab = trip.date > todayStr;
    }

    return matchesOrigin && matchesDestination && matchesTab;
  });

  return (
    <section className={styles.upcomingTrips}>
      <div className={styles.header}>
        <p>{filterType === "hoje" ? "Viagens de Hoje" : "Próximas Viagens"}</p>
      </div>

      {filteredTrips.length > 0 ? (
        filteredTrips.map((trip) => (
          <UpcomingTripCard
            key={trip.id}
            tripId={trip.id}
            category={trip.category}
            route={trip.route}
            price={trip.price}
            departure={trip.departure}
            seatsRemaining={trip.seatsRemaining}
          />
        ))
      ) : (
        <p className={styles.noResults}>
          Nenhuma viagem encontrada para essa rota.
        </p>
      )}
    </section>
  );
}
