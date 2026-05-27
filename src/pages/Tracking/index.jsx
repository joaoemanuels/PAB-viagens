import Header from "../../components/ui/Header";
import MapBackground from "./MapBackground";
import styles from "./tracking.module.css";
import TripDetailsSheet from "./TripDetailsSheet";

export default function Tracking() {
  return (
    <section className={styles.tracking}>
      <Header showSupportIcon={false} />
      <MapBackground />
      <TripDetailsSheet />
    </section>
  );
}
