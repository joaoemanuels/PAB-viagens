import Header from "../../components/ui/Header";
import styles from "./profileAdmin.module.css";
import DriverProfile from "./sections/DriverProfile";
import DriverSettings from "./sections/DriverSettings";

export default function ProfileAdmin() {
  return (
    <section className={styles.profileAdmin}>
      <Header showSupportIcon={false} />
      <DriverProfile />
      <DriverSettings />
    </section>
  );
}
