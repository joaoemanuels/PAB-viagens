import { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../../components/ui/Header";
import MapBackground from "./MapBackground";
import TripDetailsSheet from "./TripDetailsSheet";

import styles from "./tracking.module.css";

export default function Tracking() {
  const [isMinimised, setIsMinimised] = useState(false);
  const { tripId } = useParams();

  return (
    <section className={styles.tracking}>
      <Header showSupportIcon={false} />
      <MapBackground
        isMinimised={isMinimised}
        isMinimised={isMinimised}
        role="passenger"
        tripId={tripId}
      />
      <TripDetailsSheet
        isMinimised={isMinimised}
        setIsMinimised={setIsMinimised}
      />
    </section>
  );
}
