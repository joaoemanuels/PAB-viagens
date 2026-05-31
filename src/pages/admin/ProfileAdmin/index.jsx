import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import styles from "./profileAdmin.module.css";
import DriverProfile from "./sections/DriverProfile";
import DriverSettings from "./sections/DriverSettings";

export default function ProfileAdmin() {
  return (
    <section className={styles.profileAdmin}>
      <HeaderAdmin showSupportIcon={false} />
      <DriverProfile />
      <DriverSettings />
    </section>
  );
}
