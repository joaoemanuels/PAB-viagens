import styles from "./home.module.css";

import Header from "../../components/ui/Header";
import WelcomeSection from "./sections/WelcomeSection";
import TripSelector from "./sections/TripSelector";

export default function Home() {
  return (
    <section className={styles.home}>
      <Header />
      <WelcomeSection />
      <TripSelector />
    </section>
  );
}
