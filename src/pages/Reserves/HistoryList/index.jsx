import styles from "./historyList.module.css";
import HistoryCard from "./HistoryCard";

export default function HistoryList() {
  const historyData = [
    {
      id: "h1",
      statusLabel: "CONCLUÍDA",
      dateInfo: "10 Out, 09:00",
      price: "R$ 35,00",
      origin: "Terminal Rodoviário Tietê",
      destination: "São José dos Campos",
    },
    {
      id: "h2",
      statusLabel: "CONCLUÍDA",
      dateInfo: "05 Out, 14:30",
      price: "R$ 42,50",
      origin: "Campinas (Rodoviária)",
      destination: "São Paulo (Barra Funda)",
    },
    {
      id: "h3",
      statusLabel: "CONCLUÍDA",
      dateInfo: "05 Out, 14:30",
      price: "R$ 42,50",
      origin: "Campinas (Rodoviária)",
      destination: "São Paulo (Barra Funda)",
    },
  ];

  return (
    <section className={styles.historyList}>
      {historyData.map((item) => (
        <HistoryCard key={item.id} data={item} />
      ))}
    </section>
  );
}
