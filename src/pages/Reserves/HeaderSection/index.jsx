import styles from "./headerSection.module.css";

export default function HeaderSection() {
  return (
    <section className={styles.headerSection}>
      <h1>Suas Reservas</h1>
      <p>Gerencie suas viagens e histórico de transporte.</p>
    </section>
  );
}
