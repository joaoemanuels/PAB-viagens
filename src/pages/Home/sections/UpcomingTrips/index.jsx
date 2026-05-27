import UpcomingTripCard from "./UpcomingTripCard";
import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips() {
  const TripsData = [
    {
      id: 1,
      category: "EXECUTIVO",
      route: "São Paulo → Campinas",
      price: 45.9,
      departure: "14:30",
      seatsRemaining: 4,
    },

    {
      id: 2,
      category: "LEITO",
      route: "Recife → João Pessoa",
      price: 79.9,
      departure: "08:15",
      seatsRemaining: 2,
    },

    {
      id: 3,
      category: "CONVENCIONAL",
      route: "Fortaleza → Natal",
      price: 59.9,
      departure: "19:45",
      seatsRemaining: 8,
    },

    {
      id: 4,
      category: "SEMI-LEITO",
      route: "Curitiba → Florianópolis",
      price: 69.9,
      departure: "06:20",
      seatsRemaining: 3,
    },
  ];

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
