import styles from "./dateGroup.module.css";

const DAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function getNextDays(count = 7) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : DAYS_SHORT[d.getDay()],
      sub: `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`,
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    };
  });
}

export default function DateGroup({ selectedDate, onDateChange }) {
  const days = getNextDays(7);

  return (
    <div className={`${styles.inputGroup} ${styles.dateGroup}`}>
      <span className={styles.label}>Data da Viagem</span>
      <div className={styles.datePicker}>
        {days.map((day) => (
          <button
            key={day.value}
            type="button"
            onClick={() => onDateChange(day.value)}
            className={`${styles.dayChip} ${selectedDate === day.value ? styles.dayChipActive : ""}`}
          >
            <span className={styles.dayLabel}>{day.label}</span>
            <span className={styles.dayDate}>{day.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
