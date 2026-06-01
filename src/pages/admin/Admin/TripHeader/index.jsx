import TripControls from "./TripControls";
import styles from "./tripHeader.module.css";
import TripOccupancy from "./TripOccupancy";
import TripRoute from "./TripRoute";

export default function TripHeader() {
  return (
    <section className={styles.tripHeader}>
      <div className={styles.tripHeaderContainer}>
        <TripRoute />
        <TripOccupancy />
        <TripControls />
      </div>
    </section>
  );
}
