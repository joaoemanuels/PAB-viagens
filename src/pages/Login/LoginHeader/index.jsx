import styles from "./loginHeader.module.css";

export default function LoginHeader() {
  return (
    <div className={styles.header}>
      <h1>Bem-vindo de volta</h1>
      <p>Acesse sua conta para gerenciar suas viagens e rotas favoritas.</p>
    </div>
  );
}
