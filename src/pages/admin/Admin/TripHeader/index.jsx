import { useState } from "react";
import TripControls from "./TripControls";
import styles from "./tripHeader.module.css";
import TripOccupancy from "./TripOccupancy";
import TripRoute from "./TripRoute";

export default function TripHeader({ trip }) {
  const [tripStatus, setTripStatus] = useState("scheduled");
  
  return (
    <section className={styles.tripHeader}>
      <div className={styles.tripHeaderContainer}>
        <TripRoute trip={trip} />
        <TripOccupancy
          current={trip?.routes?.total_seats - trip?.available_seats}
          total={trip?.routes?.total_seats}
        />
        <TripControls
          tripId={trip?.id}
          currentStatus={tripStatus}
          onStatusChange={(newStatus) => setTripStatus(newStatus)}
        />
      </div>
    </section>
  );
}
