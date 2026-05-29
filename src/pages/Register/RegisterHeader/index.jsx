import styles from "./registerHeader.module.css";

export default function RegisterHeader() {
  return (
    <div className={styles.header}>
      <h1>Criar conta</h1>
      <p>
        Junte-se à nossa comunidade para facilitar sua mobilidade urbana diária.
      </p>
    </div>
  );
}
