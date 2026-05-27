import styles from "./reserveList.module.css";
import ReserveCard from "./ReserveCard";

export default function ReserveList() {
  const mockReservas = [
    {
      id: "1",
      status: "IN_PROGRESS", 
      statusLabel: "EM ANDAMENTO",
      price: "R$ 42,50",
      origin: "Terminal Rodoviário Tietê",
      destination: "Aeroporto de Congonhas",
      date: "Hoje, 14 Out",
      time: "15:30",
    },
    {
      id: "2",
      status: "CONFIRMED", 
      statusLabel: "CONFIRMADA",
      price: "R$ 28,90",
      origin: "Av. Paulista, 1000",
      destination: "Vila Madalena",
      date: "Amanhã, 15 Out",
      time: "08:00",
    },
  ];

  return (
    <section className={styles.reserveList}>
      {mockReservas.map((reserva) => (
        <ReserveCard key={reserva.id} data={reserva} />
      ))}
    </section>
  );
}
