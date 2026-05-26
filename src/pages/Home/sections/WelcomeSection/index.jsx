import styles from "./welcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <section className={styles.welcomeSection}>
      <h1>
        Olá <span>Viajante</span>
      </h1>
      <p>Para onde vamos hoje?</p>
    </section>
  );
}
