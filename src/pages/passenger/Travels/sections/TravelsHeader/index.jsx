import styles from "./travelsHeader.module.css";

export default function TravelsHeader({ nome }) {
  return (
    <section className={styles.travelsHeader}>
      <h1>Olá, {nome}</h1>
      <p>Confira suas viagens atribuídas para hoje.</p>
    </section>
  );
}
