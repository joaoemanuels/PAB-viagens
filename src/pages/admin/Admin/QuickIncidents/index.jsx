import { ArrowDownUp, Bell, Lightbulb, Siren } from "lucide-react";
import styles from "./quickIncidents.module.css";
const INCIDENTS_CATEGORIES = [
  { id: "transito", label: "Trânsito", icon: <ArrowDownUp /> },
  { id: "tecnico", label: "Técnico", icon: <Lightbulb /> },
  { id: "policial", label: "Policial", icon: <Siren /> },
];

export default function QuickIncidents() {
  const handleCategoryClick = (id) => {
    console.log(`Categoria selecionada: ${id}`);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Bell className={styles.headerIcon} />
        <h2 className={styles.title}>Ocorrências Rápidas</h2>
      </header>

      <div className={styles.chipGrid}>
        {INCIDENTS_CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={styles.chip}
            onClick={() => handleCategoryClick(category.id)}
            type="button"
          >
            <span className={styles.chipIcon}>{category.icon}</span>
            <span className={styles.chipLabel}>{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
