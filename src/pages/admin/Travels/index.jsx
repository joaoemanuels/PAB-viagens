import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import BroadcastPanel from "./sections/BroadcastPanel";
import MetricCard from "./sections/MetricGrid";
import PendingReservations from "./sections/PendingReservations";
import RecentHistory from "./sections/RecentHistory";
import TravelsHeader from "./sections/TravelsHeader";
import styles from "./travels.module.css";

export default function Travels() {
  return (
    <section className={styles.travels}>
      <HeaderAdmin />
      <TravelsHeader />
      <MetricCard />
      <BroadcastPanel />
      <RecentHistory />
      <PendingReservations />
    </section>
  );
}
