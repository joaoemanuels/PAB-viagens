import Header from "../../components/ui/Header";

import BookingList from "./section/BookingList";
import CapacityTracker from "./section/CapacityTracker";
import NextTripCard from "./section/NextTripCard";
import StatsDashboard from "./section/StatsDashboard";
import TravelControls from "./section/TravelControls";

import styles from "./admin.module.css";

export default function Admin() {
  return (
    <section className={styles.admin}>
      <Header />
      <NextTripCard />
      <CapacityTracker />
      <TravelControls />
      <BookingList />
      <StatsDashboard />
    </section>
  );
}
