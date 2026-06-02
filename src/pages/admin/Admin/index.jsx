import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase/supabase.js";
import { authService } from "../../../services/auth.js";

import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import Loading from "../../../components/ui/Loading";
import PassengerList from "./PassengerList";
import QuickIncidents from "./QuickIncidents";
import TripHeader from "./TripHeader";
import TripMapCard from "./TripMapCard";

import styles from "./admin.module.css";

export default function Admin() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = (nextStatus) => {
    setTrip((prev) => (prev ? { ...prev, status: nextStatus } : null));
  };

  useEffect(() => {
    async function fetchActiveTrip() {
      const profile = await authService.getCurrentUser();
      console.log("profile:", profile);

      if (!profile) return;

      // No useEffect do Admin:
      const { data } = await supabase
        .from("trips")
        .select(
          `
    id,
    status,
    departure_time,
    arrival_time,
    available_seats,
    driver_current_lat,
    driver_current_lng,
    estimated_arrival,
    routes!inner (  origin,
      destination,
      type,
      total_seats,
      vehicle_plate,
      vehicle_model,
      driver_id
    )
  `,
        )
        .in("status", ["in_progress", "scheduled"])
        .eq("routes.driver_id", profile.id)
        .order("departure_time", { ascending: true })
        .maybeSingle();

      setTrip(data);
      setLoading(false);

      console.log("data:", data);
      console.log("driver_id da rota:", data?.routes?.driver_id);
      console.log("profile.id:", profile?.id);
    }

    fetchActiveTrip();
  }, []);

  if (loading) return <Loading />;

  if (!trip) {
    return (
      <section className={styles.admin}>
        <HeaderAdmin />
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          <h3>Nenhuma viagem localizada</h3>
          <p>
            Você não possui viagens agendadas ou em andamento vinculadas ao seu
            perfil.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.admin}>
      <HeaderAdmin />
      <TripHeader trip={trip} onStatusChange={handleStatusChange} />
      <TripMapCard trip={trip} />
      <QuickIncidents tripId={trip?.id} />
      <PassengerList tripId={trip?.id} />
    </section>
  );
}
