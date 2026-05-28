import { useParams } from "react-router-dom";

import styles from "./trips.module.css";

import Header from "../../components/ui/Header";
import RoutePreview from "./sections/RoutePreview";
import TransportDetails from "./sections/TransportDetails";
import TripStatsGrid from "./sections/TripStatsGrid";
import SeatSelector from "./sections/SeatSelector";
import BookingActions from "./sections/BookingActions";
import { tripsData } from "../../data/trips";

export default function Trips() {
  const { tripId } = useParams();

  const trip = tripsData.find((trip) => trip.id === Number(tripId));
  if (!trip) {
    return <p>Viagem não encontrada</p>;
  }
  return (
    <section className={styles.trips}>
      <Header showSupportIcon={false} navigationType="back" />
      <RoutePreview origin={trip.origin} destination={trip.destination} />
      <TripStatsGrid
        arrival={trip.arrival}
        departure={trip.departure}
        price={trip.price}
      />
      <TransportDetails />
      <SeatSelector />
      <BookingActions tripId={trip.id} />
    </section>
  );
}
