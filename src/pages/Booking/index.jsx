import { useParams } from "react-router-dom";

import Header from "../../components/ui/Header";
import styles from "./booking.module.css";
import AlertBox from "./sections/AlertBox";
import CheckoutFooter from "./sections/CheckoutFooter";
import PassengerForm from "./sections/PassengerForm";
import PaymentMethod from "./sections/PaymentMethod";
import TravelSummary from "./sections/TravelSummary";
import { tripsData } from "../../data/trips";

export default function Booking() {
  const { tripId } = useParams();

  const trip = tripsData.find((t) => t.id === Number(tripId));
  if (!trip) {
    return <p>Viagem não encontrada</p>;
  }
  return (
    <section className={styles.booking}>
      <Header showSupportIcon={false} navigationType="back" />
      <TravelSummary
        route={trip.route}
        price={trip.price}
        origin={trip.origin}
        destination={trip.destination}
        date={trip.date}
        departure={trip.departure}
      />
      <PassengerForm />
      <PaymentMethod />
      <AlertBox />
      <CheckoutFooter price={trip.price} />
    </section>
  );
}
