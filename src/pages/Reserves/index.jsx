import NotLoggedState from "../../components/common/NotLoggedState";
import Header from "../../components/ui/Header";
import HeaderSection from "./HeaderSection";
import Tabs from "./Tabs";

import styles from "./reserves.module.css";

export default function Reserves() {
  // const { isLogged, user } = useAuth();
  const isLogged = false;

  if (!isLogged) {
    return <NotLoggedState />;
  }
  return (
    <section className={styles.reserves}>
      <Header showSupportIcon={false} />
      <HeaderSection />
      <Tabs />
    </section>
  );
}
