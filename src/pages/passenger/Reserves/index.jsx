import NotLoggedState from "../../../components/common/NotLoggedState";
import Header from "../../../components/ui/Header";
import Loading from "../../../components/ui/Loading";
import { useAuth } from "../../../hooks/useAuth";
import HeaderSection from "./HeaderSection";
import Tabs from "./Tabs";

import styles from "./reserves.module.css";

export default function Reserves() {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

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
