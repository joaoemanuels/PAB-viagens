import Header from "../../../components/ui/Header";
import styles from "./liveTrip.module.css";
import TripHeader from "./TripHeader";
import TripMapCard from "./TripMapCard";

export default function LiveTrip() {
  return (
    <section className={styles.liveTrip}>
      <Header />
      <TripHeader />
      <TripMapCard />
    </section>
  );
}
