import Header from "../../components/ui/Header";
import TravelsHeader from "./sections/TravelsHeader";
import TravelsTabs from "./sections/TravelsTabs";

import styles from "./travels.module.css";

export default function Travels() {
  return (
    <section className={styles.travels}>
      <Header showSupportIcon={false} />
      <TravelsHeader nome={"João"} />
      <TravelsTabs />
    </section>
  );
}
