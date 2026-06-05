import { useEffect, useState } from "react";
import { supabase } from "../../../../../services/supabase/supabase";

import TravelCard from "./TravelCard";

import styles from "./timeTravels.module.css";

export default function TimeTravels({ origin = "", destination = "" }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError(null);

      let query = supabase.from("routes").select(`
        id,
        category,
        type,
        origin,
        destination,
        price_per_seat,
        is_executive,
        stops
      `);

      if (origin?.trim()) {
        query = query.ilike("origin", `%${origin.trim()}%`);
      }

      if (destination?.trim()) {
        query = query.ilike("destination", `%${destination.trim()}%`);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        const formattedTrips = data.map((item) => {
          const departureStop = Array.isArray(item.stops)
            ? item.stops.find((stop) => stop.type === "departure")
            : null;

          const formattedTime = departureStop?.time || "--:--";

          return {
            id: item.id,
            category: item.category || "CONVENCIONAL",
            type: item.type || "CONVENCIONAL",
            isExecutive: item.is_executive || false,
            route: `${item.origin} → ${item.destination}`,
            origin: item.origin,
            destination: item.destination,
            date: "2026-10-15",
            departure: formattedTime,
            arrival: "",
            duration: "",
            price: Number(item.price_per_seat) || 0,
            seatsRemaining: 12,
            hasDetails: true,
            stops: Array.isArray(item.stops) ? item.stops : [],
          };
        });

        setTrips(formattedTrips);
      }

      setLoading(false);
    }

    fetchTrips();
  }, [origin, destination]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Próximos Horários</h2>
        <p>Horários aproximados, podendo variar conforme a rota.</p>
      </header>

      <div className={styles.cardsList}>
        {loading && <p>Carregando horários...</p>}

        {error && (
          <p className={styles.errorMessage}>Erro ao carregar: {error}</p>
        )}

        {!loading && !error && trips.length === 0 && (
          <p>Nenhuma viagem encontrada para este trajeto.</p>
        )}

        {!loading &&
          !error &&
          trips.map((travel) => <TravelCard key={travel.id} travel={travel} />)}
      </div>
    </section>
  );
}
