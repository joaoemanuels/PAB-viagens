import ActiveTravels from "./ActiveTravels";
import styles from "./travelsList.module.css";
import UpcomingTravels from "./UpcomingTravels";

export default function TravelsList() {
  return (
    <section className={styles.travelsList}>
      <ActiveTravels />
      <UpcomingTravels />
    </section>
  );
}
