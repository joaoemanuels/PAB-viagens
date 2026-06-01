import PassengerCard from "./PassengerCard";
import styles from "./passengerList.module.css";

const PASSENGERS_DATA = [
  {
    id: 1,
    name: "Ana Oliveira",
    seat: "04A",
    status: "CONFIRMADO",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: 2,
    name: "Marcos Souza",
    seat: "08C",
    status: "AGUARDANDO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: 3,
    name: "Lúcia Helena",
    seat: "01B",
    status: "EMBARCADO",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: 4,
    name: "Lúcia Helena",
    seat: "01B",
    status: "EMBARCADO",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
];

export default function PassengerList() {
  return (
    <section className={styles.passengerList}>
      <header className={styles.listHeader}>
        <div className={styles.titleGroup}>
          <h2>Passageiros</h2>
          <span className={styles.totalBadge}>12 TOTAL</span>
        </div>
      </header>

      <div className={styles.cardsContainer}>
        {PASSENGERS_DATA.map((passenger) => (
          <PassengerCard key={passenger.id} passenger={passenger} />
        ))}
      </div>
    </section>
  );
}
