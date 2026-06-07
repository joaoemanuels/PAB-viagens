import { useEffect, useState } from "react";

import styles from "./home.module.css";

import Header from "../../../components/ui/Header";
import WelcomeSection from "./sections/WelcomeSection";
import TripSelector from "./sections/TripSelector";
import QuickFilters from "./sections/QuickFilters";
import { useLocation } from "react-router-dom";
import Toast from "../../../components/ui/Toast";

export default function Home() {
  const location = useLocation();
  const [toast, setToast] = useState(false);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (location.state?.accountDeleted) {
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    }
  }, []);
  return (
    <>
      {toast && <Toast message="Conta excluída com sucesso." />}
      <section className={styles.home}>
        <Header />
        <WelcomeSection />
        <div>
          <TripSelector
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
          />

          <QuickFilters origin={origin} destination={destination} />
        </div>
      </section>
    </>
  );
}
