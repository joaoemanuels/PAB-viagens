import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabase.js";

import styles from "./trips.module.css";

import Header from "../../../components/ui/Header";
import RoutePreview from "./sections/RoutePreview";
import TransportDetails from "./sections/TransportDetails";
import TripStatsGrid from "./sections/TripStatsGrid";
import SeatSelector from "./sections/SeatSelector";
import BookingActions from "./sections/BookingActions";
import Loading from "../../../components/ui/Loading";

export default function Trips() {
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
    arrival_time,
    available_seats,
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
  if (error) return <p>Viagem não encontrada</p>;
  if (!trip) return <p>Viagem não encontrada</p>;

  return (
    <section className={styles.trips}>
      <Header showSupportIcon={false} navigationType="back" />
      <RoutePreview
        origin={trip.routes.origin}
        destination={trip.routes.destination}
      />
      <TripStatsGrid
        arrival={trip.arrival_time}
        departure={trip.departure_time}
        price={trip.routes.price_per_seat}
      />
      <TransportDetails />
      <SeatSelector />
      <BookingActions tripId={trip.id} />
    </section>
  );
}
