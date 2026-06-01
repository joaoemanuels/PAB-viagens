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
            vehicle_model
          )
        `,
        )
        .eq("status", "in_progress")
        .eq("routes.driver_id", profile.id)
        .single();

      setTrip(data);
      setLoading(false);
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
