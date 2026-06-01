import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabase.js";

import Header from "../../../components/ui/Header";
import AlertBox from "./sections/AlertBox";
import CheckoutFooter from "./sections/CheckoutFooter";
import PassengerForm from "./sections/PassengerForm";
import PaymentMethod from "./sections/PaymentMethod";
import TravelSummary from "./sections/TravelSummary";
import Loading from "../../../components/ui/Loading";

import styles from "./booking.module.css";

export default function Booking() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrip() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          departure_time,
          departure_date,
          routes (
            origin,
            destination,
            category,
            type,
            price_per_seat
          )
        `,
        )
        .eq("id", tripId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setTrip(data);
      }

      setLoading(false);
    }

    fetchTrip();
  }, [tripId]);

  if (loading) return <Loading />;
  if (error || !trip) return <p>Viagem não encontrada</p>;

  return (
    <section className={styles.booking}>
      <Header showSupportIcon={false} navigationType="back" />
      <TravelSummary
        route={`${trip.routes.origin} → ${trip.routes.destination}`}
        price={trip.routes.price_per_seat}
        origin={trip.routes.origin}
        destination={trip.routes.destination}
        date={trip.departure_date}
        departure={trip.departure_time}
      />
      <PassengerForm />
      <PaymentMethod />
      <AlertBox />
      <CheckoutFooter price={trip.routes.price_per_seat} />
    </section>
  );
}
