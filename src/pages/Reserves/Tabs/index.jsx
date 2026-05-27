import { useState } from "react";
import styles from "./tabs.module.css";
import ReserveList from "../ReserveList";
import HistoryList from "../HistoryList";

const TABS = {
  PROXIMAS: "proximas",
  HISTORICO: "historico",
};

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(TABS.PROXIMAS);

  return (
    <section className={styles.tabsContainer}>
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
        {activeTab === TABS.PROXIMAS && <ReserveList />}

        {activeTab === TABS.HISTORICO && <HistoryList />}
      </div>
    </section>
  );
}
