import { ListFilter } from "lucide-react";
import { PassengerCard } from "./PassengerCard";

import styles from "./bookingList.module.css";

export default function BookingList() {
  const passengersData = [
    {
      id: 1,
      name: "Ricardo Almeida",
      details: "Assentos: 02 • Local: Plataforma 4",
      checked: true,
    },
    {
      id: 2,
      name: "Mariana Costa",
      details: "Assentos: 01 • Local: Plataforma 4",
      checked: false,
    },
    {
      id: 3,
      name: "Joaquim Silva",
      details: "Assentos: 03 • Local: Plataforma 4",
      checked: false,
    },
    {
      id: 4,
      name: "Beatriz Ramos",
      details: "Assentos: 01 • Local: Plataforma 4",
      checked: false,
    },
  ];
  return (
    <section className={styles.bookingList}>
      <div className={styles.header}>
        <h2>Lista de Reservas</h2>

        <div className={styles.filter}>
          <ListFilter className={styles.filterIcon} />
          <span>Filtrar</span>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {passengersData.map((passenger) => (
          <PassengerCard
            key={passenger.id}
            name={passenger.name}
            details={passenger.details}
            avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg"
            defaultChecked={passenger.checked}
          />
        ))}
      </div>
    </section>
  );
}
