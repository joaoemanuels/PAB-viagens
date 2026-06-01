import styles from "./travelsHeader.module.css";

export default function TravelsHeader() {
  return (
    <section className={styles.travelsHeader}>
      <h1>Gestão de Reservas e Avisos</h1>
      <p>Controle total sobre a ocupação e comunicações da frota.</p>
    </section>
  );
}
