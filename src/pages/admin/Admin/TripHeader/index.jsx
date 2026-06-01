import TripControls from "./TripControls";
import styles from "./tripHeader.module.css";
import TripOccupancy from "./TripOccupancy";
import TripRoute from "./TripRoute";

export default function TripHeader({ trip }) {
  return (
    <section className={styles.tripHeader}>
      <div className={styles.tripHeaderContainer}>
        <TripRoute trip={trip} />
        <TripOccupancy
          current={trip?.routes?.total_seats - trip?.available_seats}
          total={trip?.routes?.total_seats}
        />
        <TripControls tripId={trip?.id} />
      </div>
    </section>
  );
}
