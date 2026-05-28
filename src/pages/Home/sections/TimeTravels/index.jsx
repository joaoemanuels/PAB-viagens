import styles from "./timeTravels.module.css";
import TravelCard from "./TravelCard";

const travelsData = [
  {
    id: "310",
    type: "EXECUTIVO 310",
    isExecutive: true,
    origin: "São Paulo",
    destination: "Campinas",
    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Terminal Tietê",
        time: "14:30",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Rodoviária Jundiaí",
        time: "15:15",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Campinas Centro",
        time: "16:00",
      },
    ],
    hasDetails: true,
  },
  {
    id: "102",
    type: "CONVENCIONAL 102",
    isExecutive: false,
    origin: "Campinas",
    destination: "Sorocaba",
    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Terminal Campinas",
        time: "17:00",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Sorocaba Rodoviária",
        time: "18:45",
      },
    ],
    hasDetails: false,
  },
];

export default function TimeTravels() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Próximos Horários</h2>
        <p>Confira as paradas e horários em tempo real.</p>
      </header>

      <div className={styles.cardsList}>
        {travelsData.map((travel) => (
          <TravelCard key={travel.id} travel={travel} />
        ))}
      </div>
    </section>
  );
}
