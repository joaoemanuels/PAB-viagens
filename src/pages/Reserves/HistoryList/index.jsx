import styles from "./historyList.module.css";

import HistoryCard from "./HistoryCard";

import { bookingsData } from "../../../data/bookingsData";
import { tripsData } from "../../../data/trips";

export default function HistoryList() {
  const historyBookings = bookingsData
    .filter((booking) => booking.status === "COMPLETED")
    .map((booking) => {
      const trip = tripsData.find((trip) => trip.id === booking.tripId);

      return {
        ...booking,
        trip,
      };
    })
    .filter((booking) => booking.trip !== undefined);

  return (
    <section className={styles.historyList}>
      {historyBookings.map((booking) => (
        <HistoryCard key={booking.id} data={booking} />
      ))}
    </section>
  );
}
