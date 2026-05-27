import styles from "./trips.module.css";

import Header from "../../components/ui/Header";
import RoutePreview from "./sections/RoutePreview";
import TransportDetails from "./sections/TransportDetails";
import TripStatsGrid from "./sections/TripStatsGrid";
import SeatSelector from "./sections/SeatSelector";
import BookingActions from "./sections/BookingActions";

export default function Trips() {
  return (
    <section className={styles.trips}>
      <Header />
      <RoutePreview />
      <TripStatsGrid />
      <TransportDetails />
      <SeatSelector />
      <BookingActions />
    </section>
  );
}
