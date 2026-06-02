import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabase/supabase.js";

import PassengerCard from "./PassengerCard";
import styles from "./passengerList.module.css";
import Loading from "../../../../components/ui/Loading/index.jsx";

export default function PassengerList({ tripId }) {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;

    async function fetchPassengers() {
      setLoading(true);

      const { data } = await supabase
        .from("bookings")
        .select(
          `
          id,
          seat_label,
          status,
          users (
            full_name,
            avatar_url
          )
        `,
        )
        .eq("trip_id", tripId);

      setPassengers(data ?? []);
      setLoading(false);
    }

    fetchPassengers();
  }, [tripId]);

  if (loading) return <Loading />
  
  if (passengers.length === 0) {
    return (
      <section className={styles.passengerList}>
        <header className={styles.listHeader}>
          <div className={styles.titleGroup}>
            <h2>Passageiros</h2>
            <span className={styles.totalBadge}>0 TOTAL</span>
          </div>
        </header>
        <p className={styles.noResults}>Nenhum passageiro encontrado.</p>
      </section>
    );
  }

  return (
    <section className={styles.passengerList}>
      <header className={styles.listHeader}>
        <div className={styles.titleGroup}>
          <h2>Passageiros</h2>
          <span className={styles.totalBadge}>{passengers.length} TOTAL</span>
        </div>
      </header>

      <div className={styles.cardsContainer}>
        {passengers.map((booking) => (
          <PassengerCard
            key={booking.id}
            passenger={{
              id: booking.id,
              name: booking.users?.full_name,
              seat: booking.seat_label,
              status: booking.status.toUpperCase(),
              avatar: booking.users?.avatar_url,
            }}
          />
        ))}
      </div>
    </section>
  );
}
