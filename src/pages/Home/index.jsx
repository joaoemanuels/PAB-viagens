import styles from "./home.module.css";

import Header from "../../components/ui/Header";
import WelcomeSection from "./sections/WelcomeSection";
import TripSelector from "./sections/TripSelector";
import QuickFilters from "./sections/QuickFilters";
import { useState } from "react";

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  
  return (
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
  );
}
