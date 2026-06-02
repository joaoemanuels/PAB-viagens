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

  useEffect(() => {
    async function fetchActiveTrip() {
      const profile = await authService.getCurrentUser();
      console.log("profile:", profile);

      if (!profile) return;

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
    routes (
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
        .eq("status", "in_progress")
        .single();

      const driverTrip = data?.routes?.driver_id === profile.id ? data : null;
      setTrip(driverTrip);
      setLoading(false);

      console.log("data:", data);
      console.log("driver_id da rota:", data?.routes?.driver_id);
      console.log("profile.id:", profile?.id);
    }

    fetchActiveTrip();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className={styles.admin}>
      <HeaderAdmin />
      <TripHeader trip={trip} />
      <TripMapCard trip={trip} />
      <QuickIncidents tripId={trip?.id} />
      <PassengerList tripId={trip?.id} />
    </section>
  );
}
