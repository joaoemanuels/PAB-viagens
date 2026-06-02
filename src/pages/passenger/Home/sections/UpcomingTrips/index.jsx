import { useEffect, useState } from "react";
import { supabase } from "../../../../../services/supabase/supabase.js";

import UpcomingTripCard from "./UpcomingTripCard";
import Loading from "../../../../../components/ui/Loading";

import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips({ origin, destination }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError(null);

      let query = supabase.from("trips").select(`
        id,
        departure_time,
        available_seats,
        routes (
          origin,
          destination,
          category,
          type,
          price_per_seat
        )
      `);

      if (origin.trim()) {
        query = query.ilike("routes.origin", `%${origin.trim()}%`);
      }

      if (destination.trim()) {
        query = query.ilike("routes.destination", `%${destination.trim()}%`);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setTrips(data.filter((t) => t.routes !== null));
      }

      setLoading(false);
    }

    fetchTrips();
  }, [origin, destination]);

  return (
    <section className={styles.upcomingTrips}>
      <div className={styles.header}>
        <p>Viagens Disponíveis</p>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p>Erro ao carregar viagens: {error}</p>
      ) : trips.length > 0 ? (
        trips.map((trip) => (
          <UpcomingTripCard
            key={trip.id}
            tripId={trip.id}
            category={trip.routes.category}
            route={`${trip.routes.origin} → ${trip.routes.destination}`}
            price={trip.routes.price_per_seat}
            departure={trip.departure_time}
            seatsRemaining={trip.available_seats}
          />
        ))
      ) : (
        <p className={styles.noResults}>Nenhuma viagem encontrada.</p>
      )}
    </section>
  );
}
