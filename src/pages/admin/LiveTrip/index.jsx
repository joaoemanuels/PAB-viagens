import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import styles from "./liveTrip.module.css";
import TripHeader from "./TripHeader";
import TripMapCard from "./TripMapCard";

export default function LiveTrip() {
  return (
    <section className={styles.liveTrip}>
      <HeaderAdmin/>
      <TripHeader />
      <TripMapCard />
    </section>
  );
}
