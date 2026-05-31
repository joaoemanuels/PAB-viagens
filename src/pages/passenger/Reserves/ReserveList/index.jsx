import styles from "./reserveList.module.css";

import ReserveCard from "./ReserveCard";

import { bookingsData } from "../../../../data/bookingsData";
import { tripsData } from "../../../../data/trips";

export default function ReserveList() {
  const reservasComViagem = bookingsData
    .map((booking) => {
      const trip = tripsData.find((trip) => trip.id === booking.tripId);

      return {
        ...booking,
        trip,
      };
    })
    .filter((booking) => booking.trip !== undefined);

  return (
    <section className={styles.reserveList}>
      {reservasComViagem.map((reserva) => (
        <ReserveCard key={reserva.id} data={reserva} />
      ))}
    </section>
  );
}
