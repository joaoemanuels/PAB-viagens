import BookingList from "./section/BookingList";
import CapacityTracker from "./section/CapacityTracker";
import NextTripCard from "./section/NextTripCard";
import StatsDashboard from "./section/StatsDashboard";
import TravelControls from "./section/TravelControls";

import styles from "./admin.module.css";
import HeaderAdmin from "../../../components/ui/HeaderAdmin";

export default function Admin() {
  return (
    <section className={styles.admin}>
      <HeaderAdmin/>
      <NextTripCard />
      <CapacityTracker />
      <TravelControls />
      <BookingList />
      <StatsDashboard />
    </section>
  );
}
