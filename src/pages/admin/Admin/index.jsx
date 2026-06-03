import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase/supabase.js";
import { useAuth } from "../../../hooks/useAuth";

import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import { Loading } from "../../../components/common/Loading";
import PassengerList from "./PassengerList";
import QuickIncidents from "./QuickIncidents";
import TripHeader from "./TripHeader";
import TripMapCard from "./TripMapCard";

import styles from "./admin.module.css";

export default function Admin() {
  const { user: profile, loading: authLoading } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = (nextStatus) => {
    setTrip((prev) => (prev ? { ...prev, status: nextStatus } : null));
  };

  useEffect(() => {
    if (authLoading) return;

    if (!profile) {
      setLoading(false);
      return;
    }

    async function fetchActiveTrip() {
      try {
        console.log("Buscando viagens para o perfil do motorista:", profile.id);

        const { data, error } = await supabase
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
    routes!inner (
      origin,
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
          .order("departure_time", { ascending: true }) // Traz a mais antiga/próxima primeiro
          .limit(1) // <--- GARANTE que a API só traga 1 linha antes de tentar converter para objeto
          .maybeSingle();

        if (error) throw error;

        setTrip(data);
      } catch (err) {
        console.error("Erro ao buscar viagem ativa:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveTrip();
  }, [profile, authLoading]);

  if (authLoading || loading) {
    return <Loading />;
  }

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
