import { useEffect, useState } from "react";
import { supabase } from "../../../../../services/supabase/supabase.js";

import UpcomingTripCard from "./UpcomingTripCard";
import Loading from "../../../../../components/ui/Loading";

import styles from "./upcomingTrips.module.css";

export default function UpcomingTrips({ filterType, origin, destination }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().split("T")[0];

      let query = supabase.from("trips").select(`
          id,
          departure_time,
          available_seats,
          departure_date,
          routes (
            origin,
            destination,
            category,
            type,
            price_per_seat
          )
        `);

      if (filterType === "hoje") {
        query = query.eq("departure_date", today);
      } else if (filterType === "proximas") {
        query = query.gt("departure_date", today);
      }

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
        setTrips(data);
      }

      setLoading(false);
    }

    fetchTrips();
  }, [filterType, origin, destination]);

  return (
    <section className={styles.upcomingTrips}>
      <div className={styles.header}>
        <p>{filterType === "hoje" ? "Viagens de Hoje" : "Próximas Viagens"}</p>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p>Erro ao carregar viagens: {error}</p>
      ) : trips.length > 0 ? (
        trips
          .filter((trip) => trip.routes !== null)
          .map((trip) => (
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
        <p className={styles.noResults}>
          Nenhuma viagem encontrada para essa rota.
        </p>
      )}
    </section>
  );
}
