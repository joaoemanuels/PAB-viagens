import styles from "./seatSelector.module.css";
import TripsImage from "@/assets/images/trips.webp";

export default function SeatSelector() {
  return (
    <section className={styles.seatSelector}>
      <img src={TripsImage} alt="" srcset="" />
    </section>
  );
}
