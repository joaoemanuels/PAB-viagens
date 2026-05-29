// components/profile/NotLoggedState.jsx
import { Search, User } from "lucide-react";
import styles from "./notLoggedState.module.css";
import { useNavigate } from "react-router-dom";

export default function NotLoggedState() {
  const navigate = useNavigate();

  function handleBooking() {
    navigate(`/login`);
  }

  return (
    <div className={styles.notLogged}>
      <div className={styles.notLoggedContent}>
        <div className={styles.notLoggedIcon}>
          <User size={40} />
        </div>
        <h2>Faça login</h2>
        <p>
          Entre na sua conta para visualizar reservas, histórico de viagens e
          informações pessoais.
        </p>

        <button className={styles.loginButton} onClick={handleBooking}>
          <Search size={20} />
          <span>Entrar na conta</span>
        </button>

        <p className={styles.signup}>
          Ainda não tem conta? <span>Criar agora</span>
        </p>
      </div>
    </div>
  );
}
