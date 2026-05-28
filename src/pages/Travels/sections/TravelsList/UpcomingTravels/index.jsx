import { Bus, User, ChevronRight } from "lucide-react";
import styles from "./upcomingTravels.module.css";

// Dados mockados simulando uma resposta de API
const MOCK_TRAVELS = [
  {
    id: 1,
    origin: "São Paulo",
    destination: "Santos",
    plate: "BRA-2J24",
    time: "18:00",
    date: "Amanhã",
    passengersConfirmed: 8,
    passengersTotal: 15,
    isFull: false,
  },
  {
    id: 2,
    origin: "São Paulo",
    destination: "Jundiaí",
    plate: "PAB-8I90",
    time: "07:15",
    date: "15 Out",
    passengersConfirmed: 15,
    passengersTotal: 15,
    isFull: true,
  },
];

export default function UpcomingTravels() {
  return (
    <section className={styles.upcomingTravels}>
      <h2 className={styles.sectionTitle}>PRÓXIMAS VIAGENS</h2>

      <div className={styles.listContainer}>
        {MOCK_TRAVELS.map((travel) => (
          <div key={travel.id} className={styles.tripCard}>
            {/* Linha Superior: Ícone, Rota, Placa e Horário */}
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.iconContainer}>
                  <Bus size={20} />
                </div>
                <div className={styles.routeInfo}>
                  <h3 className={styles.routeName}>
                    {travel.origin} <span>➔</span> {travel.destination}
                  </h3>
                  <p className={styles.plateText}>Placa: {travel.plate}</p>
                </div>
              </div>

              <div className={styles.dateTimeInfo}>
                <span className={styles.timeText}>{travel.time}</span>
                <span className={styles.dateText}>{travel.date}</span>
              </div>
            </div>

            {/* Linha Separadora Discreta */}
            <hr className={styles.divider} />

            {/* Linha Inferior: Badge de Passageiros e Link de Detalhes */}
            <div className={styles.cardFooter}>
              <div
                className={`${styles.passengerBadge} ${
                  travel.isFull ? styles.badgeFull : styles.badgeNormal
                }`}
              >
                <User size={14} />
                <span>
                  {travel.passengersConfirmed}/{travel.passengersTotal}{" "}
                  {travel.isFull ? "lotado" : "confirmados"}
                </span>
              </div>

              <button className={styles.detailsButton}>
                <span>Ver Detalhes</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
