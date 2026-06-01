import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import styles from "./admin.module.css";
import PassengerList from "./PassengerList";
import QuickIncidents from "./QuickIncidents";
import TripHeader from "./TripHeader";
import TripMapCard from "./TripMapCard";

export default function Admin() {
  return (
    <section className={styles.admin}>
      <HeaderAdmin />
      <TripHeader />
      <TripMapCard />
      <QuickIncidents />
      <PassengerList />
    </section>
  );
}
