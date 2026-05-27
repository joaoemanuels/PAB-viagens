import Header from "../../components/ui/Header";
import HeaderSection from "./HeaderSection";
import Tabs from "./Tabs";

import styles from "./reserves.module.css";

export default function Reserves() {
  return (
    <section className={styles.reserves}>
      <Header showSupportIcon={false} />
      <HeaderSection />
      <Tabs />
    </section>
  );
}
