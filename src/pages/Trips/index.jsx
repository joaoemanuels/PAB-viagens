import Header from "../../components/ui/Header";
import RoutePreview from "./sections/RoutePreview";
import TripStatsGrid from "./sections/TripStatsGrid";
import styles from "./trips.module.css";

export default function Trips() {
  return (
    <section className={styles.trips}>
      <Header />
      <RoutePreview />
      <TripStatsGrid />
    </section>
  );
}
