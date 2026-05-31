import { useState } from "react";
import styles from "./travelsTabs.module.css";
import TravelsList from "../TravelsList";
import TravelsHistory from "../TravelsHistory";

const TABS = {
  PROXIMAS: "proximas",
  HISTORICO: "historico",
};

export default function TravelsTabs() {
  const [activeTab, setActiveTab] = useState(TABS.PROXIMAS);

  return (
    <section className={styles.travelsTabs}>
      <div className={styles.tabList} role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === TABS.PROXIMAS}
          className={`${styles.tabButton} ${activeTab === TABS.PROXIMAS ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(TABS.PROXIMAS)}
        >
          Próximas
        </button>

        <button
          role="tab"
          aria-selected={activeTab === TABS.HISTORICO}
          className={`${styles.tabButton} ${activeTab === TABS.HISTORICO ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(TABS.HISTORICO)}
        >
          Histórico
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === TABS.PROXIMAS && <TravelsList />}

        {activeTab === TABS.HISTORICO && <TravelsHistory />}
      </div>
    </section>
  );
}
